import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

export interface ScreenProps extends PropsWithChildren {
  edges?: readonly Edge[];
  style?: StyleProp<ViewStyle>;
}
