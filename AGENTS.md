# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# ვის უნდა 20 001? — project notes

Georgian-language quiz game in the "Who Wants to Be a Millionaire" format. Expo SDK 57, Expo Router, TypeScript, React Native 0.86. Georgian is the default language, English is a secondary locale. i18n mirrors the dgheoba app: `src/i18n/locales/ka.ts` is the base shape, `en.ts` is typed against it, the saved language is read from storage before `i18n.init` (no wrong-language flash), and `changeLanguage()` persists the choice. Every user-facing string is a key rendered through `AppText` (`<AppText>home.title</AppText>`): string children are translated, other nodes render as-is. AppText children can't be typed as `TranslationKey` because TypeScript widens JSX child literals; attribute props such as AppButton's `title` are typed `TranslationKey`.

## Game rules (source of truth: `src/game/constants.ts`)

- 15 questions, one per rung of `MONEY_LADDER`, fictional top prize 20 001 ₾. No real-money payouts.
- 40 seconds per question, including time spent using lifelines, viewing the ladder, or backgrounding the app. Players select and then confirm an answer.
- Safe havens at levels 5 and 10: a wrong answer keeps the last cleared safe-haven prize.
- Three lifelines, each usable once: 50:50, phone a friend, ask the audience. Phone and audience advice is explicitly simulated and can be wrong.
- Player may walk away after any correct answer and keep the current prize.
- Game state lives in the Zustand store `src/game/useGameStore.ts`.

## Layout

- `src/app/` — Expo Router route files only; each re-exports a screen from `src/screens`.
- `src/screens/<name>/` — `NameScreen.tsx`, `NameScreen.styles.ts`, logic in `container/useName.ts`.
- `src/components/` — App-prefixed primitives (`AppText`, `AppButton`, `Screen`).
- `src/theme/` — TV-show styling: dark blue/violet stage lighting, cyan-edged angular panels, metallic gold prize banners, and the `useTheme(_styles)` style factory. The user found the first minimal card design too plain; favor a recognizable show atmosphere.
- `src/game/` — domain types, constants, store, and a 15-question Georgian practice bank (`questions.ka.ts`). Each question includes a fact-check source and explanation; difficulty needs playtesting.
- `src/auth/` — Firebase session observation, a small account store, provider sign-in/sign-out, and localized error mapping. Firebase native persistence owns the session; never copy tokens into KV storage. `src/screens/account/` contains the account UI and its container hook.
- `src/storage/` — never-throw synchronous key-value wrapper over `expo-sqlite/kv-store`; keys in `STORAGE_KEYS`.
- Path alias: `@/` -> `src/`.

## Style formatting and palette conventions

- Apply these conventions to every existing and future `ComponentName.styles.ts` file. Keep `_styles(theme)` and `StyleSheet.create`.
- Expand every style object, including single-property styles: opening brace, each property, and closing brace on separate lines. Leave one blank line between named style blocks. Use the existing two-space indentation, double quotes, semicolons, and trailing commas. ESLint enforces expanded objects and one property per line in style files; Prettier preserves the multiline objects and blank lines.
- Define all app color values in `src/theme/colors.ts`. Name opaque tokens by hue and numeric shade (`blue100`, `blue200`, `gray100`, `gray200`, `yellow100`, etc.), with `white` for pure white. Within each hue, lower numbers are lighter and higher numbers are darker. Reuse existing shades before adding a new one; do not invent unused shades just to fill a scale.
- Consume palette tokens directly through `theme.color.blue800`, for example. Do not introduce purpose aliases such as `background`, `textPrimary`, or `buttonBackground` into the palette. Keep the color shape in `theme.types.ts` synchronized. For translucent colors use explicit alpha names (`blueAlpha30`, `blueAlpha82`); the suffix is opacity percent. Keep raw hex/RGB values out of components and style files.
- Formatting and token renames must preserve existing color values and styling unless a visual change is explicitly requested.

## Firebase and remaining work

- Firebase project `vis-unda` is on Spark. Both platform apps are registered with identifier `com.visunda.app`. React Native Firebase App/Auth/Firestore and Expo plugins are installed; iOS uses default SPM integration with dynamic frameworks. Both platforms passed native generation. Both signed development builds succeeded on 2026-09-21. The user confirmed iPhone sign-in functionality; Android device sign-in remains unverified. The current playable round is still local practice using `src/game/questions.ka.ts`.
- Root `google-services.json` and `GoogleService-Info.plist` are gitignored and explicitly included by `.easignore` for builds from this checkout. Restore them from Firebase Project settings for fresh checkouts. Keep `.easignore` aligned with `.gitignore`. Google Authentication was enabled and both files refreshed; matching iOS and web OAuth client configuration is verified. The latest Android JSON includes a certificate-bound OAuth client matching the EAS keystore SHA-1 listed in README.md; Android prebuild verified that the updated file is copied correctly. SHA-256 registration cannot be verified from this JSON. Native compilation passed on both platforms, and the user confirmed iPhone sign-in; Android device testing remains pending.
- EAS Android credentials `Vis Unda Android` were created and verified as the default for `com.visunda.app` under the development profile. Android development build `c13153d5-8390-46c7-bb36-2ce474b007f3` finished successfully on 2026-09-21. The signed iPhone build is `c8d98195-019a-4357-b88e-1d7a28bcaa6b`; its provisioning profile was refreshed for Apple sign-in. Use that key for EAS development builds; never regenerate it just to look up its fingerprints.
- The default Firestore database was created in the console; its rules and app integration are still pending verification. The user enabled Sign in with Apple on the primary app, configured Services ID `com.visunda.auth` with domain `vis-unda.firebaseapp.com` and return URL `https://vis-unda.firebaseapp.com/__/auth/handler`, and confirmed saving the Apple provider in Firebase. The private key belongs only in Firebase's provider configuration, never the mobile app or repository. Apple/Google sign-in UI is implemented; the user confirmed iPhone functionality, and Android device verification remains pending. Questions and leaderboards will also use Firebase, replacing the earlier Supabase plan.
- Google sign-in uses `@react-native-google-signin/google-signin` on both platforms; `app.config.js` derives only its public web client ID from the local Android JSON. Apple uses `expo-apple-authentication` with a hashed nonce on iOS and Firebase's native `signInWithPopup` OAuth bridge on Android. iOS `usesAppleSignIn` and both provider plugins are configured. The account route restores native Firebase sessions and supports sign-out. All games remain unranked practice even when signed in. Before public release, add account deletion/Apple revocation and privacy/terms links.
- Guests can play. Planned leaderboards will let signed-in players enter weekly and all-time leaderboards ranked by their best single-game result. Ties, weekly timezone, and profile display names still need to be settled.
- Ranked games must validate answers, deadlines, lifelines, and winnings on the server. Do not upload client-calculated scores or expose the private ranked answer bank to clients. The bundled practice set is not suitable for ranked play.
- Cloud Functions deployment requires Firebase's billing-enabled Blaze plan. Do not enable billing without the user's decision. Billing/emulator setup is pending.
- Use the supplied screenshots as visual guidance for the quiz stage, timer, answer panels, lifelines, and ladder. Keep questions readable and our own icon/branding. Fonts, sounds, and the final host identity are still to be supplied or decided.
- Uses an Expo development client for iPhone testing. Additional libraries with custom native code still require approval; rebuild the client when native dependencies or app configuration change.
- Keep `expo.name` as `Vis Unda` so the generated Xcode target has an ASCII name. The iPhone display name is `ვის უნდა 20 001?` in `ios.infoPlist.CFBundleDisplayName`; a Georgian-only name followed by digits produces a numeric Xcode target and breaks signing.

## Product scope and workflow

- Single-player TV-show experience. The host presents the game; there is no human or simulated multiplayer opponent. The user will supply the host's name and picture later.
- No coins, diamonds, mystery boxes, loot rewards, or associated shop and inventory flows.
- Plan before implementing, work through one stage at a time, and clarify uncertain product decisions with the user. Do not use parallel agents or develop multiple stages simultaneously.
- The user confirmed the iPhone sign-in functionality on 2026-09-21 and deferred design discussion; do not redesign the account screen without further direction.
- Keep comments limited to important behavior, purpose, and non-obvious decisions.
- Shared `AppPanel` renders the original framed panel textures under `assets/images/show/`; `Screen` supplies the stage backdrop. These bundled images work in the existing development client without extra native packages.

## Commands

`npm start` starts Metro for the development client. `npm run build:ios` creates an internal iPhone development build with EAS; `npm run build:android` builds the Android development APK. `npm run typecheck`, `npm run lint`, `npm run check` (typecheck + lint + prettier). Husky runs lint-staged on commit.

`npm test` runs game-domain checks with Node's test runner and the existing TypeScript dependency. The user starts Metro in their own terminal; do not leave an agent-started server running after verification.
