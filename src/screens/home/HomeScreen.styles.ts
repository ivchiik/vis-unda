import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },

    title: {
      fontSize: 28,
      lineHeight: 40,
      textAlign: "center",
    },

    subtitle: {
      color: theme.color.textSecondary,
      textAlign: "center",
    },
  });
