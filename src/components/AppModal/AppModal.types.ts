import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import type { TranslationKey } from "@/i18n";

export interface AppModalProps extends PropsWithChildren {
  isVisible: boolean;
  title: TranslationKey;
  onClose: () => void;
  contentStyle?: StyleProp<ViewStyle>;
}
