import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.color.gray100,
      fontSize: 16,
      lineHeight: 24,
    },
  });
