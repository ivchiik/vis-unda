import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    answers: {
      gap: 10,
      paddingVertical: 4,
    },

    answer: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 27,
      paddingVertical: 14,
    },

    answerHidden: {
      opacity: 0.3,
    },

    letter: {
      color: theme.color.yellow200,
      fontWeight: "700",
      width: 20,
    },

    answerText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 24,
    },

    goldText: {
      color: theme.color.brown100,
    },

    pressed: {
      opacity: 0.7,
    },

    success: {
      color: theme.color.green100,
    },

    danger: {
      color: theme.color.red100,
    },
  });
