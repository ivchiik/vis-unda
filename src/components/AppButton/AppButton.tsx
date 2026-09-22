import { Pressable } from "react-native";

import { useTheme } from "@/theme";

import { AppText } from "../AppText/AppText";
import { AppPanel } from "../AppPanel/AppPanel";
import { _styles } from "./AppButton.styles";
import type { AppButtonProps } from "./AppButton.types";

export const AppButton = ({
  title,
  disabled,
  style,
  accessibilityState,
  variant = "primary",
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
      <AppPanel
        tone={variant === "primary" ? "gold" : "blue"}
        hasRails={variant === "primary"}
        contentStyle={styles.content}
      >
        <AppText style={[styles.label, variant === "primary" && styles.primaryLabel]}>
          {title}
        </AppText>
      </AppPanel>
    </Pressable>
  );
};
