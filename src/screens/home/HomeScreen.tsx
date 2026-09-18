import { AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./HomeScreen.styles";

export const HomeScreen = () => {
  const { styles } = useTheme(_styles);

  return (
    <Screen style={styles.content}>
      <AppText accessibilityRole="header" style={styles.title}>
        home.title
      </AppText>
      <AppText style={styles.subtitle}>home.subtitle</AppText>
    </Screen>
  );
};
