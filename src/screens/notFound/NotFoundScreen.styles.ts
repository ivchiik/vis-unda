import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },

    title: {
      fontSize: 24,
      lineHeight: 36,
      textAlign: "center",
    },

    description: {
      color: theme.color.textSecondary,
      textAlign: "center",
    },
  });
