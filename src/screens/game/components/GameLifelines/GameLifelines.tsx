import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import { AppText } from "@/components";
import { Lifeline } from "@/game";
import { useTheme } from "@/theme";

import { _styles } from "./GameLifelines.styles";
import type { GameLifelinesProps } from "./GameLifelines.types";

const LIFELINES = [
  {
    value: Lifeline.FiftyFifty,
    title: "game.fiftyFifty",
    caption: "game.fiftyFiftyHint",
    symbol: "game.fiftyFifty",
  },
  {
    value: Lifeline.PhoneFriend,
    title: "game.phoneFriend",
    caption: "game.phoneFriend",
    symbol: "game.phoneSymbol",
  },
  {
    value: Lifeline.AskAudience,
    title: "game.audience",
    caption: "game.audience",
    symbol: null,
  },
] as const;

export const GameLifelines = ({ usedLifelines, onUseLifeline }: GameLifelinesProps) => {
  const { styles } = useTheme(_styles);
  const { t } = useTranslation();

  return (
    <View style={styles.lifelines}>
      {LIFELINES.map(({ value, title, caption, symbol }) => {
        const isUsed = usedLifelines.includes(value);
        const labelKey = isUsed ? "game.lifelineUsed" : "game.lifelineAvailable";

        return (
          <Pressable
            key={value}
            accessibilityRole="button"
            disabled={isUsed}
            accessibilityLabel={t(labelKey, { name: t(title) })}
            accessibilityState={{ disabled: isUsed }}
            onPress={() => onUseLifeline(value)}
            style={({ pressed }) => [
              styles.lifeline,
              isUsed && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            {symbol === null ? (
              <View style={styles.audienceSymbol} accessible={false}>
                {[0, 1, 2].map((person) => (
                  <View key={person} style={[styles.person, person === 1 && styles.centerPerson]}>
                    <View style={styles.personHead} />
                    <View style={styles.personBody} />
                  </View>
                ))}
              </View>
            ) : (
              <AppText style={styles.lifelineSymbol}>{symbol}</AppText>
            )}
            <AppText style={[styles.lifelineTitle, isUsed && styles.used]}>{caption}</AppText>
            {!isUsed && (
              <View style={styles.lifelineBadge}>
                <AppText style={styles.lifelineCount}>{1}</AppText>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};
