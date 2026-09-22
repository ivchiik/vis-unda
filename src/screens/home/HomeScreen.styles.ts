import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      padding: 0,
    },

    content: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingVertical: 18,
      gap: 22,
      maxWidth: 520,
      width: "100%",
      alignSelf: "center",
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
    },

    brandName: {
      fontSize: 11,
      lineHeight: 18,
      color: theme.color.gray200,
      flex: 1,
    },

    guest: {
      fontSize: 11,
      lineHeight: 18,
      color: theme.color.blue100,
      borderWidth: 1,
      borderColor: theme.color.blue300,
      backgroundColor: theme.color.blue700,
      paddingHorizontal: 14,
      paddingVertical: 5,
      borderRadius: 16,
    },

    hero: {
      alignItems: "center",
      gap: 10,
      paddingVertical: 8,
    },

    emblemOrbit: {
      width: 218,
      height: 218,
      borderRadius: 71,
      borderWidth: 1,
      borderColor: theme.color.blue300,
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 44px 8px ${theme.color.blueAlpha30}`,
    },

    emblemRim: {
      width: 200,
      height: 200,
      borderRadius: 62,
      borderWidth: 2,
      borderColor: theme.color.yellow200,
      backgroundColor: theme.color.blue700,
      alignItems: "center",
      justifyContent: "center",
    },

    icon: {
      width: 172,
      height: 172,
      borderRadius: 48,
    },

    heading: {
      color: theme.color.yellow200,
      fontSize: 27,
      lineHeight: 38,
      fontWeight: "700",
      textAlign: "center",
      paddingTop: 8,
    },

    description: {
      color: theme.color.gray200,
      fontSize: 12,
      lineHeight: 20,
      textAlign: "center",
    },

    prizeCard: {
      alignItems: "center",
      paddingVertical: 10,
      gap: 0,
    },

    eyebrow: {
      color: theme.color.brown100,
      fontSize: 11,
      lineHeight: 18,
      fontWeight: "600",
    },

    prize: {
      fontSize: 34,
      lineHeight: 44,
      fontWeight: "700",
      color: theme.color.brown100,
      fontVariant: ["tabular-nums"],
    },

    stats: {
      flexDirection: "row",
      gap: 12,
      paddingVertical: 2,
    },

    stat: {
      flex: 1,
      alignItems: "center",
      gap: 2,
    },

    statValue: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "700",
      color: theme.color.yellow200,
    },

    statLabel: {
      color: theme.color.gray200,
      fontSize: 11,
      lineHeight: 18,
    },

    actions: {
      gap: 12,
    },

    footer: {
      gap: 6,
      paddingBottom: 8,
    },

    note: {
      color: theme.color.gray200,
      fontSize: 11,
      lineHeight: 18,
      textAlign: "center",
    },

    legal: {
      color: theme.color.gray200,
      fontSize: 10,
      lineHeight: 17,
      textAlign: "center",
    },
  });
