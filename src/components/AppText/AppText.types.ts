import type { ReactNode } from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";

export interface AppTextProps extends TextProps {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}
