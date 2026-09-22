import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      padding: 0,
    },

    content: {
      flexGrow: 1,
      justifyContent: "center",
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      paddingHorizontal: 24,
      paddingVertical: 32,
      gap: 24,
    },

    hero: {
      alignItems: "center",
      gap: 16,
    },

    icon: {
      width: 136,
      height: 136,
      borderRadius: 38,
    },

    title: {
      color: theme.color.yellow200,
      fontSize: 28,
      lineHeight: 40,
      fontWeight: "700",
    },

    description: {
      color: theme.color.gray200,
      textAlign: "center",
      fontSize: 14,
      lineHeight: 22,
    },

    providers: {
      gap: 14,
    },

    providerButton: {
      width: "100%",
      height: 52,
    },

    profile: {
      paddingVertical: 20,
      alignItems: "center",
      gap: 6,
    },

    name: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "600",
      textAlign: "center",
    },

    email: {
      fontSize: 13,
      lineHeight: 20,
      color: theme.color.gray200,
      textAlign: "center",
    },

    status: {
      alignItems: "center",
      gap: 10,
    },

    error: {
      color: theme.color.red100,
      textAlign: "center",
      fontSize: 13,
      lineHeight: 21,
    },

    note: {
      color: theme.color.gray200,
      textAlign: "center",
      fontSize: 12,
      lineHeight: 20,
    },
  });
