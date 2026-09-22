import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, BackHandler } from "react-native";
import type { ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import {
  ANSWER_REVEAL_DELAY_MS,
  ANSWER_TIME_MS,
  getGuaranteedAmount,
  Lifeline,
  QUESTIONS_KA,
  SAFE_HAVEN_LEVELS,
  TOTAL_LEVELS,
  useGameStore,
} from "@/game";
import { ROUTES } from "@/navigation";
import type { TranslationKey } from "@/i18n";

const CLOCK_INTERVAL_MS = 250;

export const useGame = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const game = useGameStore();

  const scrollRef = useRef<ScrollView>(null);
  const shouldScrollToAdviceRef = useRef(false);

  const [selection, setSelection] = useState<{ questionId: string; index: number } | null>(null);
  const [isLadderVisible, setIsLadderVisible] = useState(false);
  const [isExitVisible, setIsExitVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(ANSWER_TIME_MS / 1_000);
  const [isRevealReady, setIsRevealReady] = useState(false);

  const question = game.questions[game.currentIndex];
  const isRevealed = game.status === "revealed";
  const isCorrect = !!question && game.submittedAnswerIndex === question.correctIndex;
  const isFinished = ["won", "lost", "walked_away"].includes(game.status);
  const isSelectionAvailable =
    selection !== null &&
    selection.questionId === question?.id &&
    !game.hiddenAnswerIndexes.includes(selection.index);
  const selectedIndex = isSelectionAvailable ? selection.index : null;
  const currentLevel = game.currentIndex + 1;
  const isExitDisabled = isRevealed && !isCorrect;
  const isAdviceVisible =
    !isRevealed && (game.phoneFriendIndex !== null || game.audiencePercentages !== null);
  const isSafeHavenReached =
    isRevealed && isCorrect && SAFE_HAVEN_LEVELS.some((level) => level === currentLevel);
  const guaranteedAmount = getGuaranteedAmount(
    game.currentIndex + (isRevealed && isCorrect ? 1 : 0)
  );

  useEffect(() => {
    const updateClock = () => {
      const state = useGameStore.getState();
      state.expire();

      const remainingSeconds = Math.ceil((state.deadlineAt - Date.now()) / 1_000);
      setSecondsLeft(Math.max(0, remainingSeconds));
      setIsRevealReady(
        state.status === "revealed" && Date.now() - state.revealedAt >= ANSWER_REVEAL_DELAY_MS
      );
    };

    updateClock();

    const isRoundActive = game.status === "playing" || game.status === "revealed";
    if (!isRoundActive) return;

    const timer = setInterval(updateClock, CLOCK_INTERVAL_MS);
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        updateClock();
      }
    });

    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, [game.status, game.deadlineAt]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
        const state = useGameStore.getState();
        const isRoundActive = state.status === "playing" || state.status === "revealed";
        if (!isRoundActive) return false;

        const isIncorrectReveal =
          state.status === "revealed" &&
          state.submittedAnswerIndex !== state.questions[state.currentIndex].correctIndex;

        if (isIncorrectReveal) {
          state.advance();
        } else {
          setIsExitVisible(true);
        }

        return true;
      });

      return () => subscription.remove();
    }, [])
  );

  const handleSelectAnswer = (index: number) => {
    if (game.status === "playing" && !game.hiddenAnswerIndexes.includes(index)) {
      setSelection({ questionId: question.id, index });
    }
  };

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      game.answer(selectedIndex);
    }
  };

  const handleContinue = () => {
    setSelection(null);
    setIsExitVisible(false);
    setIsLadderVisible(false);
    game.advance();
  };

  const handleLifeline = (lifeline: Lifeline) => {
    if (!game.useLifeline(lifeline)) return;

    if (lifeline === Lifeline.FiftyFifty) {
      setSelection(null);
    } else {
      shouldScrollToAdviceRef.current = true;
    }
  };

  const handleContentSizeChange = () => {
    if (!shouldScrollToAdviceRef.current) return;

    shouldScrollToAdviceRef.current = false;
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleWalkAway = () => {
    setIsExitVisible(false);
    game.walkAway();
  };

  const handleGoHome = () => {
    game.reset();
    router.replace(ROUTES.HOME);
  };

  const handlePlayAgain = () => {
    setSelection(null);
    setIsExitVisible(false);
    setIsLadderVisible(false);

    if (!game.startGame(QUESTIONS_KA)) {
      Alert.alert(t("common.error"), t("common.questionsUnavailable"));
    }
  };

  let hostKey: TranslationKey = "game.hostWrong";
  let revealKey: TranslationKey = "game.wrong";

  if (game.isTimedOut) {
    hostKey = "game.hostTimeout";
    revealKey = "game.timeout";
  } else if (isCorrect) {
    hostKey = "game.hostCorrect";
    revealKey = "game.correct";
  }

  if (!isRevealed) {
    hostKey = "game.hostPrompt";
  }

  let resultKey: TranslationKey = "result.lost";

  if (game.status === "won") {
    resultKey = "result.won";
  } else if (game.status === "walked_away") {
    resultKey = "result.walkedAway";
  }

  const continueKey: TranslationKey =
    isCorrect && game.currentIndex < TOTAL_LEVELS - 1 ? "game.next" : "game.result";

  return {
    ...game,
    scrollRef,
    handleContentSizeChange,
    t,
    question,
    selectedIndex,
    currentLevel,
    isExitDisabled,
    isAdviceVisible,
    isSafeHavenReached,
    guaranteedAmount,
    secondsLeft,
    isRevealed,
    isCorrect,
    isFinished,
    isRevealReady,
    isLadderVisible,
    isExitVisible,
    hostKey,
    resultKey,
    revealKey,
    continueKey,
    correctCount: game.currentIndex + (isCorrect ? 1 : 0),
    handleSelectAnswer,
    handleConfirm,
    handleContinue,
    handleLifeline,
    handleWalkAway,
    handleGoHome,
    handlePlayAgain,
    handleOpenLadder: () => setIsLadderVisible(true),
    handleCloseLadder: () => setIsLadderVisible(false),
    handleOpenExit: () => setIsExitVisible(true),
    handleCloseExit: () => setIsExitVisible(false),
  };
};
