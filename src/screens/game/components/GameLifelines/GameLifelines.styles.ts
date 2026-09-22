import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    lifelines: {
      flexDirection: "row",
      gap: 14,
      paddingHorizontal: 8,
    },

    lifeline: {
      flex: 1,
      minHeight: 66,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 6,
      paddingVertical: 6,
      borderRadius: 40,
      borderColor: theme.color.blue100,
      borderWidth: 1.5,
      backgroundColor: theme.color.blue600,
    },

    lifelineSymbol: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "700",
      color: theme.color.gray100,
    },

    lifelineTitle: {
      fontSize: 10,
      lineHeight: 16,
      fontWeight: "600",
      color: theme.color.gray100,
    },

    lifelineBadge: {
      position: "absolute",
      top: -4,
      right: 6,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: theme.color.yellow200,
      alignItems: "center",
      justifyContent: "center",
    },

    lifelineCount: {
      fontSize: 10,
      lineHeight: 14,
      color: theme.color.brown100,
      fontWeight: "700",
    },

    audienceSymbol: {
      height: 28,
      flexDirection: "row",
      gap: 2,
      alignItems: "flex-end",
    },

    person: {
      alignItems: "center",
      gap: 2,
      paddingBottom: 2,
    },

    centerPerson: {
      paddingBottom: 6,
    },

    personHead: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.color.gray100,
    },

    personBody: {
      width: 13,
      height: 10,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      backgroundColor: theme.color.gray100,
    },

    used: {
      textDecorationLine: "line-through",
    },

    disabled: {
      opacity: 0.4,
    },

    pressed: {
      opacity: 0.7,
    },
  });
