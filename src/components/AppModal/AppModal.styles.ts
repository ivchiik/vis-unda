import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.color.blueAlpha82,
      padding: 20,
    },

    panel: {
      maxHeight: "95%",
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      padding: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.color.blue300,
      backgroundColor: theme.color.blue700,
      boxShadow: `0 0 30px 4px ${theme.color.blueAlpha30}`,
      gap: 16,
    },

    title: {
      fontSize: 22,
      lineHeight: 32,
      fontWeight: "700",
      color: theme.color.yellow200,
      textAlign: "center",
    },

    content: {
      gap: 12,
      paddingBottom: 4,
    },
  });
