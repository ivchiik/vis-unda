# Vis Unda

Georgian-first quiz app built with Expo SDK 57 and Expo Router for iOS and Android.

## Development builds

```bash
npm install
npm run build:ios
npm run build:android
```

The `development` profile in `eas.json` creates an internal build with Expo Dev Client.
EAS uses the `ivchiik/vis-unda` project and the iOS bundle identifier `com.visunda.app`.
The first build needs Apple signing credentials and your iPhone registered for ad hoc distribution.
If the phone is not registered yet, run `npx --yes eas-cli@24.7.0 device:create` and follow its registration link on the phone before building.

Install the finished build using the EAS build link on your iPhone. Enable Developer Mode in
Settings > Privacy & Security if iOS requests it.

## Daily development

```bash
npm start
```

Keep the iPhone and Mac on the same Wi-Fi network, then scan the terminal QR code with the
Camera app to open Vis Unda's development client. If LAN access is unavailable, use
`npm start -- --tunnel` (Expo may prompt to install its tunnel helper).

JavaScript and TypeScript changes reload through Metro. Rebuild after changing native
dependencies, app icons, or native app configuration.

## Project

- Routes: `src/app/`
- Screens and screen hooks: `src/screens/`
- Shared UI: `src/components/`
- Georgian and English strings: `src/i18n/locales/`
- Game state and sourced Georgian practice questions: `src/game/`

Generated `ios/` and `android/` folders stay gitignored. Native settings live in `app.json`;
`app.config.js` reads the public Google web OAuth client ID from `google-services.json`.

```bash
npm run check
npm test
```

Runs TypeScript, ESLint, and Prettier checks.

## Current playable stage

The home screen and guest round use a blue/violet TV-show stage, gold prize banners,
angular answer panels, a countdown dial, and oval lifelines. A round has
15 Georgian questions, 40 seconds per question, answer confirmation and explanations, a prize
ladder, three one-use lifelines, walking away, and a result screen. The fictional top prize is
20 001 ₾, with guarantees after questions 5 and 10. No real money is awarded.

The timer continues during lifelines, the ladder, and app backgrounding. Phone-a-friend and
audience advice are simulations and can be wrong. Restarting the app starts a fresh session;
unfinished practice games are not persisted.

`src/game/questions.ka.ts` contains the 15 starter questions, explanations, and primary-source
URLs, reviewed on 2026-09-20. Answer positions are shuffled each round. There is only one question
per level so far; expand and playtest difficulty before launch. Do not use this publicly bundled
bank for ranked play.

All current games are practice, including when signed in, and their results are not ranked.
Google and Apple sign-in are implemented. Weekly/all-time leaderboards still need server-validated
scores, with answers kept private on the backend.

The original stage and panel artwork is bundled in `assets/images/show/`. Shared `AppPanel`
frames stretch to accommodate longer Georgian text; interactive labels remain native text.

Suggested device checks: complete a correct answer, use each lifeline, let a timer expire while
the app is backgrounded, open the prize ladder, walk away, and restart from the result screen.
Check long Georgian answers on a small screen. `npm test` covers payouts, timeout boundaries,
shuffling, invalid question sets, repeated taps, and lifelines.

## Firebase setup in progress

Both platform apps are registered in Firebase project `vis-unda` with identifier `com.visunda.app`.
React Native Firebase App, Auth, and Firestore are installed. `app.json` configures native
initialization through Expo plugins; iOS uses the SDK's default Swift Package Manager integration
with dynamic frameworks. Native generation passed for iOS and Android. The signed iPhone build succeeded, and the user
confirmed iPhone sign-in functionality on 2026-09-21. The Android development build also succeeded; Android device sign-in remains unverified.
Install the rebuilt development client before using Firebase features.

The root `google-services.json` and `GoogleService-Info.plist` files are local and gitignored.
`.easignore` includes both in builds submitted from this checkout. For a fresh checkout, download
them from Firebase Project settings > General and put them at the project root before building.
Keep `.easignore` aligned with `.gitignore`, retaining the two Firebase exceptions at the end.

Google is enabled in Firebase Authentication, and both configuration files have been refreshed
with matching iOS and web OAuth client details. The user also confirmed saving the Apple provider
with Services ID `com.visunda.auth`. Its callback is
`https://vis-unda.firebaseapp.com/__/auth/handler`, associated with primary app `com.visunda.app`.
The Apple private key is configured only in Firebase, never in the app or repository.

The default Firestore database has been created in the console. Its rules and data integration
are still pending. Practice continues to use the bundled bank.

### Account flow

Open **Sign in** on the home screen. Google uses the native Google SDK on both platforms. Apple
uses the native Apple sheet on iOS and Firebase's browser OAuth flow on Android. The native
Firebase Auth SDK restores the session on restart; application storage never stores tokens.
The account screen shows the private account name/email and provides sign-out. Guest practice
does not create a Firebase anonymous account or require a connection.

Apple's first-consent name is passed with its credential, and a SHA-256 nonce ties the native
Apple response to the Firebase exchange. Provider cancellation leaves the user as a guest.
The configured Apple `.p8` key remains in Firebase only.

Verification: TypeScript, ESLint, Prettier, all 17 automated tests, iOS/Android JavaScript exports,
and native generation passed. EAS Expo Doctor passed all 21 checks on both platforms. Native
compilation succeeded on both platforms, and the user confirmed iPhone sign-in functionality.
Android device testing remains pending.
The auth tests mock native providers; they do not prove the console/provider configuration works.

Development build links (2026-09-21):

- [iPhone — finished](https://expo.dev/accounts/ivchiik/projects/vis-unda/builds/c8d98195-019a-4357-b88e-1d7a28bcaa6b). The Apple provisioning profile was refreshed for Sign in with Apple.
- [Android — finished](https://expo.dev/accounts/ivchiik/projects/vis-unda/builds/c13153d5-8390-46c7-bb36-2ce474b007f3). Uses the existing Firebase-registered EAS keystore.

Device regression checks after installing the rebuilt client:

1. Cancel each provider flow and confirm guest practice still works.
2. Sign in with Google, restart the app, verify the account is restored, then sign out.
3. Sign in with Apple (test Hide My Email), restart, and sign out.
4. On Android, also verify Apple's browser returns to the app and Google Play Services is available.
5. Confirm all practice results remain unranked in both account states.

Before public release, complete account deletion (including Apple revocation), privacy/terms
links, and device verification. Firebase Auth contains account identity; Firestore profile
documents and public leaderboard names are not implemented yet.

EAS now holds the default Android keystore named `Vis Unda Android` for `com.visunda.app`.
The following public certificate fingerprints were verified through the development profile:

```text
SHA-1:   22:E1:A4:C9:97:49:56:B9:73:C3:5D:35:A7:B3:39:D7:86:37:D0:36
SHA-256: C3:0E:5F:EA:5B:84:0B:40:23:78:A0:CE:C5:51:A3:4D:2D:FB:32:75:2B:EF:76:E1:1E:EC:C9:BC:49:10:2C:29
```

The refreshed `google-services.json` now includes an Android OAuth client whose package and SHA-1
match these EAS credentials. Android prebuild verified that the file is copied into the native
project correctly. The JSON does not expose SHA-256 registration, so that setting must be checked
in Firebase Project settings > General > Android app > SHA certificate fingerprints.
Android sign-in remains untested. Future Google Play releases
also need the fingerprints of the Play app signing certificate registered in Firebase.

The project remains on Spark. Deploying the planned server-validated ranked game through Cloud
Functions requires a decision about Blaze billing; billing has not been enabled.
