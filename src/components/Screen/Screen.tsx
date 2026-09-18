import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

import { _styles } from "./Screen.styles";
import type { ScreenProps } from "./Screen.types";

export const Screen = ({
  edges = ["top", "bottom", "left", "right"],
  style,
  children,
}: ScreenProps) => {
  const { styles } = useTheme(_styles);

  return (
    <SafeAreaView edges={edges} style={styles.root}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
};
