import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      minHeight: 56,
      paddingHorizontal: 28,
      paddingVertical: 14,
      justifyContent: "center",
    },

    rail: {
      position: "absolute",
      top: "50%",
      height: 1,
      left: -30,
      right: -30,
      backgroundColor: theme.color.blue200,
    },
  });
