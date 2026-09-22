import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const _styles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      padding: 0,
    },

    content: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 14,
      width: "100%",
      maxWidth: 560,
      alignSelf: "center",
    },

    empty: {
      justifyContent: "center",
      gap: 20,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      paddingHorizontal: 20,
      paddingBottom: 12,
      width: "100%",
      maxWidth: 560,
      alignSelf: "center",
      minHeight: 84,
    },

    controls: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 8,
      gap: 12,
      width: "100%",
      maxWidth: 560,
      alignSelf: "center",
      borderTopWidth: 1,
      borderTopColor: theme.color.blue300,
      backgroundColor: theme.color.blue800,
    },

    textButton: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: 4,
    },

    progress: {
      fontSize: 11,
      lineHeight: 18,
      color: theme.color.yellow200,
      flexShrink: 1,
    },

    secondary: {
      color: theme.color.gray200,
      fontSize: 13,
      textAlign: "center",
    },

    accent: {
      color: theme.color.blue100,
      fontSize: 13,
    },

    host: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 12,
    },

    hostPortrait: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.color.yellow200,
      backgroundColor: theme.color.blue700,
      alignItems: "center",
      overflow: "hidden",
    },

    hostHead: {
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: theme.color.gray200,
      marginTop: 5,
    },

    hostBody: {
      width: 24,
      height: 20,
      borderRadius: 12,
      backgroundColor: theme.color.gray200,
      marginTop: 3,
    },

    hostCopy: {
      flex: 1,
      gap: 1,
    },

    hostLabel: {
      fontSize: 10,
      lineHeight: 16,
      color: theme.color.yellow200,
      fontWeight: "600",
    },

    hostPrompt: {
      fontSize: 12,
      lineHeight: 20,
      color: theme.color.gray200,
    },

    prizeBanner: {
      width: "84%",
      alignSelf: "center",
      marginTop: 2,
    },

    prizeContent: {
      alignItems: "center",
      paddingVertical: 6,
      minHeight: 60,
    },

    prizeCaption: {
      fontSize: 10,
      lineHeight: 16,
      color: theme.color.brown100,
      textAlign: "center",
    },

    prize: {
      fontSize: 28,
      lineHeight: 36,
      color: theme.color.brown100,
      fontWeight: "700",
    },

    questionCard: {
      minHeight: 116,
      paddingVertical: 20,
      paddingHorizontal: 30,
      gap: 8,
      alignItems: "center",
    },

    caption: {
      fontSize: 11,
      lineHeight: 18,
      color: theme.color.gray200,
    },

    category: {
      color: theme.color.blue100,
      fontSize: 10,
      lineHeight: 16,
      textAlign: "center",
    },

    question: {
      fontSize: 19,
      lineHeight: 29,
      fontWeight: "600",
      textAlign: "center",
    },

    goldText: {
      color: theme.color.brown100,
    },

    disabled: {
      opacity: 0.4,
    },

    advice: {
      gap: 10,
      backgroundColor: theme.color.blue700,
      borderWidth: 1,
      borderColor: theme.color.blue300,
      borderRadius: 8,
      padding: 16,
    },

    votes: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },

    vote: {
      padding: 8,
      borderRadius: 4,
      backgroundColor: theme.color.blue600,
    },

    voteLabel: {
      fontSize: 13,
      fontVariant: ["tabular-nums"],
    },

    reveal: {
      gap: 12,
      padding: 16,
      backgroundColor: theme.color.blue700,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.color.blue300,
    },

    revealTitle: {
      fontWeight: "600",
    },

    explanation: {
      fontSize: 14,
      lineHeight: 24,
      color: theme.color.gray200,
    },

    success: {
      color: theme.color.green100,
    },

    danger: {
      color: theme.color.red100,
    },

    violet: {
      color: theme.color.yellow200,
    },

    guaranteed: {
      fontSize: 11,
      lineHeight: 18,
      textAlign: "center",
      color: theme.color.yellow200,
    },

    ladderList: {
      gap: 5,
    },

    ladderRow: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 32,
      paddingHorizontal: 20,
      paddingVertical: 5,
      gap: 8,
    },

    ladderNumber: {
      color: theme.color.gray200,
      fontSize: 11,
      lineHeight: 20,
      width: 18,
    },

    ladderAmount: {
      flex: 1,
      fontSize: 13,
      lineHeight: 20,
      fontWeight: "600",
      fontVariant: ["tabular-nums"],
    },

    safeLabel: {
      color: theme.color.yellow200,
      fontSize: 9,
      lineHeight: 16,
    },

    resultContent: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
      gap: 22,
      maxWidth: 520,
      width: "100%",
      alignSelf: "center",
    },

    resultEmblem: {
      width: 154,
      height: 154,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 49,
      borderWidth: 2,
      borderColor: theme.color.yellow200,
      backgroundColor: theme.color.blue700,
      boxShadow: `0 0 36px 6px ${theme.color.blueAlpha30}`,
    },

    resultIcon: {
      width: 132,
      height: 132,
      borderRadius: 38,
    },

    eyebrow: {
      color: theme.color.yellow200,
      fontSize: 13,
      textAlign: "center",
    },

    resultTitle: {
      fontSize: 28,
      lineHeight: 40,
      fontWeight: "700",
      textAlign: "center",
    },

    resultCard: {
      alignItems: "center",
      paddingVertical: 14,
      gap: 2,
    },

    resultAmount: {
      fontSize: 40,
      lineHeight: 54,
      fontWeight: "700",
      color: theme.color.brown100,
    },

    resultSummary: {
      textAlign: "center",
      color: theme.color.blue100,
    },

    resultActions: {
      gap: 12,
    },
  });
