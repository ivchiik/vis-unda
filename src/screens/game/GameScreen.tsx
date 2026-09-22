import { Image, Pressable, ScrollView, View } from "react-native";

import { AppButton, AppModal, AppPanel, AppText, CountdownDial, Screen } from "@/components";
import { ANSWER_TIME_MS, MONEY_LADDER, TOTAL_LEVELS } from "@/game";
import { useTheme } from "@/theme";
import { formatAmount } from "@/utils";

import { GameAnswers, GameLifelines } from "./components";
import { useGame } from "./container/useGame";
import { ANSWER_LETTERS, LADDER_STEPS } from "./GameScreen.constants";
import { _styles } from "./GameScreen.styles";

export const GameScreen = () => {
  const { styles } = useTheme(_styles);
  const {
    t,
    scrollRef,
    handleContentSizeChange,
    question,
    status,
    currentIndex,
    currentLevel,
    selectedIndex,
    submittedAnswerIndex,
    hiddenAnswerIndexes,
    secondsLeft,
    isRevealed,
    isCorrect,
    isFinished,
    isRevealReady,
    isLadderVisible,
    isExitVisible,
    isExitDisabled,
    isAdviceVisible,
    isSafeHavenReached,
    guaranteedAmount,
    hostKey,
    resultKey,
    revealKey,
    continueKey,
    correctCount,
    wonAmount,
    usedLifelines,
    phoneFriendIndex,
    audiencePercentages,
    handleSelectAnswer,
    handleConfirm,
    handleContinue,
    handleLifeline,
    handleWalkAway,
    handleGoHome,
    handlePlayAgain,
    handleOpenLadder,
    handleCloseLadder,
    handleOpenExit,
    handleCloseExit,
  } = useGame();

  if (status === "idle" || !question) {
    return (
      <Screen style={styles.empty}>
        <AppText>home.subtitle</AppText>
        <AppButton title="home.play" onPress={handlePlayAgain} />
        <AppButton title="common.backHome" variant="secondary" onPress={handleGoHome} />
      </Screen>
    );
  }

  if (isFinished) {
    return (
      <Screen style={styles.screen}>
        <ScrollView contentContainerStyle={styles.resultContent}>
          <View style={styles.resultEmblem}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.resultIcon}
              accessible={false}
            />
          </View>
          <AppText style={styles.eyebrow}>home.title</AppText>
          <AppText accessibilityRole="header" style={styles.resultTitle}>
            {resultKey}
          </AppText>
          <AppPanel tone="gold" hasRails contentStyle={styles.resultCard}>
            <AppText style={styles.prizeCaption}>result.prize</AppText>
            <AppText style={styles.resultAmount}>{formatAmount(wonAmount)}</AppText>
          </AppPanel>
          <AppText style={styles.resultSummary}>
            {t("result.correctCount", { count: correctCount, total: TOTAL_LEVELS })}
          </AppText>
          <AppText style={styles.secondary}>result.guestNote</AppText>
          <View style={styles.resultActions}>
            <AppButton title="result.playAgain" onPress={handlePlayAgain} />
            <AppButton title="common.backHome" variant="secondary" onPress={handleGoHome} />
          </View>
          <AppText style={styles.caption}>home.fictionalPrize</AppText>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          onPress={handleOpenExit}
          disabled={isExitDisabled}
          accessibilityState={{ disabled: isExitDisabled }}
          style={[styles.textButton, isExitDisabled && styles.disabled]}
        >
          <AppText style={styles.secondary}>game.exit</AppText>
        </Pressable>
        <AppText style={styles.progress}>
          {t("game.progress", { current: currentLevel, total: TOTAL_LEVELS })}
        </AppText>
        {!isRevealed && (
          <CountdownDial secondsLeft={secondsLeft} durationSeconds={ANSWER_TIME_MS / 1_000} />
        )}
        <Pressable accessibilityRole="button" onPress={handleOpenLadder} style={styles.textButton}>
          <AppText style={styles.accent}>game.ladder</AppText>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={handleContentSizeChange}
        key={question.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.host}>
          <View style={styles.hostPortrait} accessible={false}>
            <View style={styles.hostHead} />
            <View style={styles.hostBody} />
          </View>
          <View style={styles.hostCopy}>
            <AppText style={styles.hostLabel}>game.host</AppText>
            <AppText style={styles.hostPrompt}>{hostKey}</AppText>
          </View>
        </View>

        <AppPanel
          tone="gold"
          hasRails
          style={styles.prizeBanner}
          contentStyle={styles.prizeContent}
        >
          <AppText style={styles.prizeCaption}>game.currentPrize</AppText>
          <AppText style={styles.prize}>{formatAmount(MONEY_LADDER[currentIndex])}</AppText>
        </AppPanel>
        <AppPanel hasRails contentStyle={styles.questionCard}>
          <AppText style={styles.category}>{question.category}</AppText>
          <AppText accessibilityRole="header" style={styles.question}>
            {question.text}
          </AppText>
        </AppPanel>

        <GameAnswers
          question={question}
          selectedIndex={selectedIndex}
          submittedAnswerIndex={submittedAnswerIndex}
          hiddenAnswerIndexes={hiddenAnswerIndexes}
          isRevealed={isRevealed}
          onSelectAnswer={handleSelectAnswer}
        />

        {isRevealed && (
          <View style={styles.reveal} accessibilityLiveRegion="polite">
            <AppText style={[styles.revealTitle, isCorrect ? styles.success : styles.danger]}>
              {revealKey}
            </AppText>
            <AppText style={styles.explanation}>{question.explanation}</AppText>
            {isSafeHavenReached && (
              <AppText style={styles.success}>
                {t("game.safeReached", { amount: formatAmount(wonAmount) })}
              </AppText>
            )}
          </View>
        )}

        {isAdviceVisible && (
          <View style={styles.advice} accessibilityLiveRegion="polite">
            <AppText style={styles.caption}>game.simulation</AppText>
            {phoneFriendIndex !== null && (
              <AppText>
                {t("game.phoneAdvice", {
                  letter: ANSWER_LETTERS[phoneFriendIndex],
                  answer: question.answers[phoneFriendIndex],
                })}
              </AppText>
            )}
            {audiencePercentages && (
              <>
                <AppText style={styles.hostLabel}>game.audienceAdvice</AppText>
                <View style={styles.votes}>
                  {audiencePercentages.map((percent, index) => (
                    <View key={index} style={styles.vote}>
                      <AppText style={styles.voteLabel}>
                        {t("game.vote", { letter: ANSWER_LETTERS[index], percent })}
                      </AppText>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        <AppText style={styles.guaranteed}>
          {t("game.guaranteed", {
            amount: formatAmount(guaranteedAmount),
          })}
        </AppText>
      </ScrollView>

      <View style={styles.controls}>
        {isRevealed ? (
          <AppButton title={continueKey} disabled={!isRevealReady} onPress={handleContinue} />
        ) : (
          <>
            <AppButton
              title={selectedIndex === null ? "game.selectAnswer" : "game.confirm"}
              disabled={selectedIndex === null}
              onPress={handleConfirm}
            />
            <GameLifelines usedLifelines={usedLifelines} onUseLifeline={handleLifeline} />
          </>
        )}
      </View>
      <AppModal
        isVisible={isLadderVisible}
        title="game.ladderTitle"
        onClose={handleCloseLadder}
        contentStyle={styles.ladderList}
      >
        {!isRevealed && (
          <AppText style={styles.accent}>{t("game.timer", { seconds: secondsLeft })}</AppText>
        )}
        <AppText style={styles.caption}>home.fictionalPrize</AppText>
        {LADDER_STEPS.map(({ amount, level, isSafeHaven }) => {
          const isCurrentLevel = level === currentLevel;

          return (
            <AppPanel
              key={level}
              tone={isCurrentLevel ? "gold" : "blue"}
              contentStyle={styles.ladderRow}
            >
              <AppText style={[styles.ladderNumber, isCurrentLevel && styles.goldText]}>
                {level}
              </AppText>
              <AppText
                style={[
                  styles.ladderAmount,
                  isSafeHaven && styles.violet,
                  isCurrentLevel && styles.goldText,
                ]}
              >
                {formatAmount(amount)}
              </AppText>
              {isSafeHaven && (
                <AppText style={[styles.safeLabel, isCurrentLevel && styles.goldText]}>
                  game.safeHaven
                </AppText>
              )}
            </AppPanel>
          );
        })}
      </AppModal>
      <AppModal
        isVisible={isExitVisible && !isExitDisabled}
        title="game.exitTitle"
        onClose={handleCloseExit}
      >
        <AppText>{t("game.exitDescription", { amount: formatAmount(wonAmount) })}</AppText>
        <AppButton title="game.exitConfirm" onPress={handleWalkAway} />
        <AppButton title="common.cancel" variant="secondary" onPress={handleCloseExit} />
      </AppModal>
    </Screen>
  );
};
