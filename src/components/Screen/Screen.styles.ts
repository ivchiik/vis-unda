import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.color.blue800,
      overflow: "hidden",
    },

    safeArea: {
      flex: 1,
    },

    backdrop: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },

    content: {
      flex: 1,
      padding: 24,
    },
  });
