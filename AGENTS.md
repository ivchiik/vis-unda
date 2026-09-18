# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# ვის უნდა 20000? — project notes

Georgian-language quiz game in the "Who Wants to Be a Millionaire" format. Expo SDK 57, Expo Router, TypeScript, React Native 0.86. Georgian is the default language, English is a secondary locale. i18n mirrors the dgheoba app: `src/i18n/locales/ka.ts` is the base shape, `en.ts` is typed against it, the saved language is read from storage before `i18n.init` (no wrong-language flash), and `changeLanguage()` persists the choice. Every user-facing string is a key rendered through `AppText` (`<AppText>home.title</AppText>`): string children are translated, other nodes render as-is. AppText children can't be typed as `TranslationKey` because TypeScript widens JSX child literals; attribute props such as AppButton's `title` are typed `TranslationKey`.

## Game rules (source of truth: `src/game/constants.ts`)

- 15 questions, one per rung of `MONEY_LADDER`, top prize 20 000. Ladder values are placeholders.
- Safe havens at levels 5 and 10: a wrong answer keeps the last cleared safe-haven prize.
- Three lifelines, each usable once: 50:50, phone a friend, ask the audience.
- Player may walk away after any correct answer and keep the current prize.
- Game state lives in the Zustand store `src/game/useGameStore.ts`.

## Layout

- `src/app/` — Expo Router route files only; each re-exports a screen from `src/screens`.
- `src/screens/<name>/` — `NameScreen.tsx`, `NameScreen.styles.ts`, logic in `container/useName.ts`.
- `src/components/` — App-prefixed primitives (`AppText`, `AppButton`, `Screen`).
- `src/theme/` — colours and the `useTheme(_styles)` style factory. Colours are placeholders until the design arrives.
- `src/game/` — domain types, constants, store, and local placeholder questions (`questions.ka.ts`).
- `src/storage/` — never-throw synchronous key-value wrapper over `expo-sqlite/kv-store`; keys in `STORAGE_KEYS`.
- Path alias: `@/` -> `src/`.

## Not yet decided or built

- Backend (planned: Supabase for questions, leaderboard, accounts). Until then questions come from `src/game/questions.ka.ts`.
- Visual design, fonts, sounds. Do not invent a design; wait for screenshots.
- Stays on Expo Go: do not add libraries with custom native code without asking.

## Commands

`npm start`, `npm run typecheck`, `npm run lint`, `npm run check` (typecheck + lint + prettier). Husky runs lint-staged on commit.
