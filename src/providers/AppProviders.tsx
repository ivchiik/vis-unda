import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, ThemeProvider } from "expo-router";

import "@/i18n/i18n";
import { theme, useTheme } from "@/theme";

import { _styles } from "./AppProviders.styles";

const NAVIGATION_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.background,
    card: theme.color.background,
    text: theme.color.textPrimary,
    primary: theme.color.textPrimary,
  },
};

export const AppProviders = ({ children }: PropsWithChildren) => {
  const { styles } = useTheme(_styles);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={NAVIGATION_THEME}>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};
