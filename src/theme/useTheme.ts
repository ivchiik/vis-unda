import { theme } from "./theme";
import type { StyleFactory, Theme } from "./theme.types";

export function useTheme(): Theme;
export function useTheme<T>(factory: StyleFactory<T>): { styles: T; theme: Theme };
export function useTheme<T>(factory?: StyleFactory<T>): Theme | { styles: T; theme: Theme } {
  if (!factory) return theme;

  return { styles: factory(theme), theme };
}
