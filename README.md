# Vis Unda

Georgian-first quiz app built with Expo SDK 57 and Expo Router for iOS and Android.

## iPhone development build

```bash
npm install
npm run build:ios
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
- Game state and placeholder questions: `src/game/`

Generated `ios/` and `android/` folders stay gitignored; app configuration lives in `app.json`.

```bash
npm run check
```

Runs TypeScript, ESLint, and Prettier checks.
