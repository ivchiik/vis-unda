import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DarkTheme, ThemeProvider } from "expo-router";

import "@/i18n/i18n";
import { useAuthSession } from "@/auth";
import { theme, useTheme } from "@/theme";

import { _styles } from "./AppProviders.styles";

const NAVIGATION_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.color.blue800,
    card: theme.color.blue800,
    text: theme.color.gray100,
    primary: theme.color.blue100,
    border: theme.color.blue300,
  },
};

export const AppProviders = ({ children }: PropsWithChildren) => {
  useAuthSession();
  const { styles } = useTheme(_styles);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={NAVIGATION_THEME}>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};
