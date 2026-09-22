import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface AppPanelProps extends PropsWithChildren {
  tone?: "blue" | "gold" | "selected" | "correct" | "wrong";
  hasRails?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}
