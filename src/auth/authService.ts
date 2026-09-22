import { Platform } from "react-native";
import Constants from "expo-constants";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "@react-native-firebase/auth";
import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin";

import type { AuthUser } from "./types";

export const authService = {
  observe: (onChange: (user: AuthUser | null) => void) =>
    onAuthStateChanged(getAuth(), (user) =>
      onChange(user ? { uid: user.uid, displayName: user.displayName, email: user.email } : null)
    ),

  signInWithGoogle: async (): Promise<boolean> => {
    const webClientId = Constants.expoConfig?.extra?.googleWebClientId;
    if (typeof webClientId !== "string" || !webClientId) {
      throw new Error("Google OAuth configuration is missing.");
    }

    GoogleSignin.configure({ webClientId });

    if (Platform.OS === "android") {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    }

    const result = await GoogleSignin.signIn();
    if (!isSuccessResponse(result)) return false;
    if (!result.data.idToken) throw new Error("Google did not return an identity token.");

    await signInWithCredential(getAuth(), GoogleAuthProvider.credential(result.data.idToken));
    return true;
  },

  signInWithApple: async (): Promise<boolean> => {
    const provider = new OAuthProvider("apple.com");

    if (Platform.OS === "android") {
      provider.addScope("email").addScope("name");

      const nativeProvider = {
        providerId: provider.PROVIDER_ID,
        toObject: () => provider.toObject(),
      };

      await signInWithPopup(getAuth(), nativeProvider);
      return true;
    }

    const rawNonce = Crypto.randomUUID();
    const nonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, rawNonce);
    const result = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      nonce,
    });
    if (!result.identityToken) throw new Error("Apple did not return an identity token.");

    await signInWithCredential(
      getAuth(),
      provider.credential({
        idToken: result.identityToken,
        rawNonce,
        fullName: result.fullName ?? undefined,
      })
    );
    return true;
  },

  signOut: async (): Promise<void> => {
    await signOut(getAuth());
    try {
      await GoogleSignin.signOut();
    } catch {
      console.warn("Google sign-out failed; user may have been signed out already.");
    }
  },
};
