import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppPanel, AppText } from "@/components";
import type { AppPanelProps } from "@/components";
import type { TranslationKey } from "@/i18n";
import { useTheme } from "@/theme";

import { ANSWER_LETTERS } from "@/screens/game/GameScreen.constants";
import { _styles } from "./GameAnswers.styles";
import type { GameAnswersProps } from "./GameAnswers.types";

export const GameAnswers = ({
  question,
  selectedIndex,
  submittedAnswerIndex,
  hiddenAnswerIndexes,
  isRevealed,
  onSelectAnswer,
}: GameAnswersProps) => {
  const { styles } = useTheme(_styles);
  const { t } = useTranslation();

  return (
    <View style={styles.answers}>
      {question.answers.map((answer, index) => {
        const isHidden = hiddenAnswerIndexes.includes(index);
        const isSelected = selectedIndex === index;
        const isSubmitted = submittedAnswerIndex === index;
        const isCorrect = isRevealed && question.correctIndex === index;
        const isWrong = isRevealed && isSubmitted && !isCorrect;
        const isHighlighted = isSelected && !isRevealed;
        const isDisabled = isHidden || isRevealed;

        let tone: AppPanelProps["tone"] = "blue";
        let labelKey: TranslationKey = "game.answerLabel";

        if (isCorrect) {
          tone = "correct";
          labelKey = "game.correctAnswerLabel";
        } else if (isWrong) {
          tone = "wrong";
          labelKey = "game.wrongAnswerLabel";
        } else if (isHighlighted) {
          tone = "selected";
        }

        if (isHidden) {
          labelKey = "game.removedAnswer";
        }

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityLabel={t(labelKey, { letter: ANSWER_LETTERS[index], answer })}
            accessibilityState={{
              selected: isRevealed ? isSubmitted : isSelected,
              disabled: isDisabled,
            }}
            disabled={isDisabled}
            onPress={() => onSelectAnswer(index)}
            style={({ pressed }) => [isHidden && styles.answerHidden, pressed && styles.pressed]}
          >
            <AppPanel hasRails tone={tone} contentStyle={styles.answer}>
              <AppText style={[styles.letter, isHighlighted && styles.goldText]}>
                {ANSWER_LETTERS[index]}
              </AppText>
              <AppText style={[styles.answerText, isHighlighted && styles.goldText]}>
                {isHidden ? "—" : answer}
              </AppText>
              {isCorrect && <AppText style={styles.success}>game.correctMark</AppText>}
              {isWrong && <AppText style={styles.danger}>game.wrongMark</AppText>}
            </AppPanel>
          </Pressable>
        );
      })}
    </View>
  );
};
