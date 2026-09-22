import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { QUESTIONS_KA, useGameStore } from "@/game";
import { useAuthStore } from "@/auth";
import { ROUTES } from "@/navigation";

export const useHome = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isStartingRef = useRef(false);
  const [isRulesVisible, setIsRulesVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      isStartingRef.current = false;
    }, [])
  );

  const handleStart = () => {
    if (isStartingRef.current) return;
    if (!useGameStore.getState().startGame(QUESTIONS_KA)) {
      Alert.alert(t("common.error"), t("common.questionsUnavailable"));
      return;
    }
    isStartingRef.current = true;
    router.push(ROUTES.GAME);
  };

  return {
    t,
    isSignedIn: !!user,
    handleAccount: () => router.push(ROUTES.ACCOUNT),
    isRulesVisible,
    handleStart,
    handleOpenRules: () => setIsRulesVisible(true),
    handleCloseRules: () => setIsRulesVisible(false),
  };
};
