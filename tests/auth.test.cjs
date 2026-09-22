const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { createHash } = require("node:crypto");
const { test } = require("node:test");
const ts = require("typescript");

// Exercise provider-to-Firebase handoffs without native SDKs or real credentials.
const loadService = ({ platform = "ios", googleResult, appleError, googleSignOutError } = {}) => {
  const calls = [];
  const auth = {};
  const { outputText } = ts.transpileModule(fs.readFileSync("src/auth/authService.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const modules = {
    "react-native": { Platform: { OS: platform } },
    "expo-constants": {
      __esModule: true,
      default: { expoConfig: { extra: { googleWebClientId: "test-web-client" } } },
    },
    "expo-crypto": {
      randomUUID: () => "test-random-nonce",
      CryptoDigestAlgorithm: { SHA256: "sha256" },
      digestStringAsync: async (algorithm, input) =>
        createHash(algorithm).update(input).digest("hex"),
    },
    "expo-apple-authentication": {
      AppleAuthenticationScope: { FULL_NAME: 0, EMAIL: 1 },
      signInAsync: async (options) => {
        calls.push(["apple", options]);
        if (appleError) throw appleError;
        return { identityToken: "test-apple-token", fullName: { givenName: "Test" } };
      },
    },
    "@react-native-google-signin/google-signin": {
      isSuccessResponse: (result) => result.type === "success",
      GoogleSignin: {
        configure: (options) => calls.push(["configure", options]),
        hasPlayServices: async () => calls.push(["play-services"]),
        signIn: async () =>
          googleResult ?? { type: "success", data: { idToken: "test-google-token" } },
        signOut: async () => {
          calls.push(["google-sign-out"]);
          if (googleSignOutError) throw googleSignOutError;
        },
      },
    },
    "@react-native-firebase/auth": {
      getAuth: () => auth,
      GoogleAuthProvider: { credential: (idToken) => ({ providerId: "google.com", idToken }) },
      OAuthProvider: class {
        constructor(providerId) {
          this.PROVIDER_ID = providerId;
          this.scopes = [];
        }
        addScope(scope) {
          this.scopes.push(scope);
          return this;
        }
        toObject() {
          return { providerId: this.PROVIDER_ID, scopes: this.scopes };
        }
        credential(options) {
          return { providerId: this.PROVIDER_ID, ...options };
        }
      },
      signInWithCredential: async (instance, credential) => {
        assert.equal(instance, auth);
        calls.push(["credential", credential]);
      },
      signInWithPopup: async (instance, provider) => {
        assert.equal(instance, auth);
        calls.push(["popup", provider.toObject()]);
      },
      signOut: async () => calls.push(["firebase-sign-out"]),
    },
  };
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require: (name) => {
      assert.ok(name in modules, `Unexpected dependency: ${name}`);
      return modules[name];
    },
  });
  return { service: exports.authService, calls };
};

test("Google cancellation and a missing identity token never reach Firebase", async () => {
  const cancelled = loadService({ googleResult: { type: "cancelled", data: null } });
  assert.equal(await cancelled.service.signInWithGoogle(), false);
  assert.equal(
    cancelled.calls.some(([name]) => name === "credential"),
    false
  );
  const missingToken = loadService({ googleResult: { type: "success", data: { idToken: null } } });
  await assert.rejects(missingToken.service.signInWithGoogle(), /identity token/);
  assert.equal(
    missingToken.calls.some(([name]) => name === "credential"),
    false
  );
});

test("Android Google checks Play Services and exchanges the identity token with Firebase", async () => {
  const { service, calls } = loadService({ platform: "android" });
  assert.equal(await service.signInWithGoogle(), true);
  assert.equal(calls[0][1].webClientId, "test-web-client");
  assert.equal(calls[1][0], "play-services");
  assert.equal(calls[2][1].providerId, "google.com");
  assert.equal(calls[2][1].idToken, "test-google-token");
});

test("Apple gets the nonce hash while Firebase gets the raw nonce and first-consent name", async () => {
  const { service, calls } = loadService();
  await service.signInWithApple();
  const request = calls.find(([name]) => name === "apple")[1];
  const credential = calls.find(([name]) => name === "credential")[1];
  assert.equal(credential.providerId, "apple.com");
  assert.equal(credential.rawNonce, "test-random-nonce");
  assert.equal(request.nonce, createHash("sha256").update(credential.rawNonce).digest("hex"));
  assert.notEqual(request.nonce, credential.rawNonce);
  assert.equal(credential.fullName.givenName, "Test");
  assert.equal(credential.idToken, "test-apple-token");
});

test("cancelled Apple consent does not authenticate with Firebase", async () => {
  const error = Object.assign(new Error("Cancelled"), { code: "ERR_REQUEST_CANCELED" });
  const { service, calls } = loadService({ appleError: error });
  await assert.rejects(service.signInWithApple(), (actual) => actual === error);
  assert.equal(
    calls.some(([name]) => name === "credential"),
    false
  );
});

test("Android Apple uses Firebase's browser provider flow with email and name scopes", async () => {
  const { service, calls } = loadService({ platform: "android" });
  await service.signInWithApple();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "popup");
  assert.equal(calls[0][1].providerId, "apple.com");
  assert.equal(calls[0][1].scopes.join(","), "email,name");
});

test("Firebase sign-out succeeds even when Google cleanup fails", async () => {
  const { service, calls } = loadService({
    googleSignOutError: new Error("Play services unavailable"),
  });
  await service.signOut();
  assert.equal(calls[0][0], "firebase-sign-out");
  assert.equal(calls[1][0], "google-sign-out");
});
