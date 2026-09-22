import { Image, View } from "react-native";
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
    <View style={styles.root}>
      <Image
        source={require("@/assets/images/show/stage-backdrop.png")}
        style={styles.backdrop}
        resizeMode="cover"
        accessible={false}
      />
      <SafeAreaView edges={edges} style={styles.safeArea}>
        <View style={[styles.content, style]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};
