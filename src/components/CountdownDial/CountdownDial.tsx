import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";

import { AppText } from "../AppText/AppText";
import { _styles } from "./CountdownDial.styles";
import type { CountdownDialProps } from "./CountdownDial.types";

const TICK_COUNT = 20;
const TICKS = Array.from({ length: TICK_COUNT }, (_, index) => {
  const angle = (index / TICK_COUNT) * Math.PI * 2 - Math.PI / 2;
  return { left: 34 + Math.cos(angle) * 33, top: 34 + Math.sin(angle) * 33 };
});

export const CountdownDial = ({ secondsLeft, durationSeconds }: CountdownDialProps) => {
  const { styles } = useTheme(_styles);
  const { t } = useTranslation();
  const activeTicks = Math.ceil((secondsLeft / durationSeconds) * TICK_COUNT);

  return (
    <View
      style={styles.dial}
      accessible
      accessibilityLabel={t("game.timer", { seconds: secondsLeft })}
    >
      {TICKS.map((position, index) => (
        <View
          key={index}
          style={[
            styles.tick,
            position,
            index >= activeTicks && styles.elapsed,
            secondsLeft <= 10 && index < activeTicks && styles.urgentTick,
          ]}
        />
      ))}
      <View style={styles.face}>
        <AppText style={[styles.number, secondsLeft <= 10 && styles.urgent]}>{secondsLeft}</AppText>
        <AppText style={styles.unit}>game.secondsShort</AppText>
      </View>
    </View>
  );
};
