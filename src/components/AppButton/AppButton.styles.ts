import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      minHeight: 48,
      paddingHorizontal: 20,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: theme.color.buttonBackground,
    },

    label: {
      color: theme.color.buttonText,
      textAlign: "center",
    },

    pressed: {
      opacity: 0.7,
    },

    disabled: {
      opacity: 0.4,
    },
  });
