import { AppButton, AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { _styles } from "./NotFoundScreen.styles";
import { useNotFound } from "./container/useNotFound";

export const NotFoundScreen = () => {
  const { styles } = useTheme(_styles);
  const { handleGoHome } = useNotFound();

  return (
    <Screen style={styles.content}>
      <AppText accessibilityRole="header" style={styles.title}>
        notFound.title
      </AppText>
      <AppText style={styles.description}>notFound.description</AppText>
      <AppButton title="common.backHome" onPress={handleGoHome} />
    </Screen>
  );
};
