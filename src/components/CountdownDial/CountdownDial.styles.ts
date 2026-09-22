import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    dial: {
      width: 72,
      height: 72,
    },

    tick: {
      position: "absolute",
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.color.yellow200,
    },

    elapsed: {
      backgroundColor: theme.color.blue300,
      opacity: 0.35,
    },

    urgentTick: {
      backgroundColor: theme.color.red100,
    },

    face: {
      position: "absolute",
      top: 8,
      left: 8,
      bottom: 8,
      right: 8,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: theme.color.blue100,
      backgroundColor: theme.color.blue700,
      alignItems: "center",
      justifyContent: "center",
    },

    number: {
      fontSize: 26,
      lineHeight: 30,
      color: theme.color.gray100,
      fontWeight: "700",
      fontVariant: ["tabular-nums"],
    },

    unit: {
      fontSize: 9,
      lineHeight: 12,
      color: theme.color.gray200,
    },

    urgent: {
      color: theme.color.red100,
    },
  });
