import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      alignSelf: "stretch",
    },

    content: {
      minHeight: 54,
      alignItems: "center",
      paddingVertical: 12,
    },

    label: {
      color: theme.color.white,
      textAlign: "center",
      fontWeight: "700",
    },

    primaryLabel: {
      color: theme.color.brown100,
    },

    pressed: {
      opacity: 0.7,
    },

    disabled: {
      opacity: 0.4,
    },
  });
