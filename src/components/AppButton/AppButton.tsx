import { Pressable } from "react-native";

import { useTheme } from "@/theme";

import { AppText } from "../AppText/AppText";
import { _styles } from "./AppButton.styles";
import type { AppButtonProps } from "./AppButton.types";

export const AppButton = ({
  title,
  disabled,
  style,
  accessibilityState,
  ...rest
}: AppButtonProps) => {
  const { styles } = useTheme(_styles);

  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <AppText style={styles.label}>{title}</AppText>
    </Pressable>
  );
};
