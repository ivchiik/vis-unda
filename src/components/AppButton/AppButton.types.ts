import type { PressableProps, StyleProp, ViewStyle } from "react-native";

import type { TranslationKey } from "@/i18n";

export interface AppButtonProps extends Omit<PressableProps, "children" | "style"> {
  title: TranslationKey;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary";
}
