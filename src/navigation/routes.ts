import type { Href } from "expo-router";

export const ROUTES = {
  HOME: "/",
  ACCOUNT: "/account",
  GAME: "/game",
} as const satisfies Record<string, Href>;
