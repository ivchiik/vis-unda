import type { Href } from "expo-router";

export const ROUTES = {
  HOME: "/",
} as const satisfies Record<string, Href>;
