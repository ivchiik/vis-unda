import { ImageBackground, View } from "react-native";

import { useTheme } from "@/theme";

import { _styles } from "./AppPanel.styles";
import type { AppPanelProps } from "./AppPanel.types";

const PANEL_IMAGES = {
  blue: require("@/assets/images/show/panel-blue.png"),
  gold: require("@/assets/images/show/panel-gold.png"),
  selected: require("@/assets/images/show/panel-selected.png"),
  correct: require("@/assets/images/show/panel-correct.png"),
  wrong: require("@/assets/images/show/panel-wrong.png"),
};

export const AppPanel = ({
  tone = "blue",
  hasRails = false,
  style,
  contentStyle,
  children,
}: AppPanelProps) => {
  const { styles } = useTheme(_styles);

  return (
    <View style={style}>
      {hasRails && <View pointerEvents="none" style={styles.rail} />}
      <ImageBackground
        source={PANEL_IMAGES[tone]}
        resizeMode="stretch"
        accessible={false}
        style={[styles.content, contentStyle]}
      >
        {children}
      </ImageBackground>
    </View>
  );
};
