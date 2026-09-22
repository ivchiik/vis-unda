import { Image, ScrollView, View } from "react-native";

import { AppButton, AppModal, AppPanel, AppText, Screen } from "@/components";
import {
  ALL_LIFELINES,
  ANSWER_TIME_MS,
  MONEY_LADDER,
  SAFE_HAVEN_LEVELS,
  TOTAL_LEVELS,
} from "@/game";
import { useTheme } from "@/theme";
import { formatAmount } from "@/utils";

import { useHome } from "./container/useHome";
import { _styles } from "./HomeScreen.styles";

export const HomeScreen = () => {
  const { styles } = useTheme(_styles);
  const {
    t,
    isSignedIn,
    isRulesVisible,
    handleAccount,
    handleStart,
    handleOpenRules,
    handleCloseRules,
  } = useHome();

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText style={styles.brandName}>home.subtitle</AppText>
          <AppText style={styles.guest}>{isSignedIn ? "auth.signedInBadge" : "home.guest"}</AppText>
        </View>
        <View style={styles.hero}>
          <View style={styles.emblemOrbit}>
            <View style={styles.emblemRim}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.icon}
                accessible={false}
              />
            </View>
          </View>
          <AppText accessibilityRole="header" style={styles.heading}>
            home.title
          </AppText>
          <AppText style={styles.description}>home.eyebrow</AppText>
        </View>
        <AppPanel tone="gold" hasRails contentStyle={styles.prizeCard}>
          <AppText style={styles.eyebrow}>home.topPrize</AppText>
          <AppText style={styles.prize}>{formatAmount(MONEY_LADDER[TOTAL_LEVELS - 1])}</AppText>
        </AppPanel>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <AppText style={styles.statValue}>{TOTAL_LEVELS}</AppText>
            <AppText style={styles.statLabel}>home.questions</AppText>
          </View>
          <View style={styles.stat}>
            <AppText style={styles.statValue}>{ANSWER_TIME_MS / 1_000}</AppText>
            <AppText style={styles.statLabel}>home.seconds</AppText>
          </View>
          <View style={styles.stat}>
            <AppText style={styles.statValue}>{ALL_LIFELINES.length}</AppText>
            <AppText style={styles.statLabel}>home.lifelines</AppText>
          </View>
        </View>
        <View style={styles.actions}>
          <AppButton title="home.play" onPress={handleStart} />
          <AppButton title="home.rules" variant="secondary" onPress={handleOpenRules} />
          <AppButton
            title={isSignedIn ? "auth.title" : "auth.signIn"}
            variant="secondary"
            onPress={handleAccount}
          />
        </View>
        <View style={styles.footer}>
          <AppText style={styles.note}>auth.practiceNote</AppText>
          <AppText style={styles.legal}>home.fictionalPrize</AppText>
        </View>
      </ScrollView>
      <AppModal isVisible={isRulesVisible} title="home.rules" onClose={handleCloseRules}>
        <AppText>home.ruleQuestions</AppText>
        <AppText>home.ruleTimer</AppText>
        <AppText>
          {t("home.ruleSafety", {
            first: formatAmount(MONEY_LADDER[SAFE_HAVEN_LEVELS[0] - 1]),
            second: formatAmount(MONEY_LADDER[SAFE_HAVEN_LEVELS[1] - 1]),
          })}
        </AppText>
        <AppText>home.ruleLifelines</AppText>
        <AppText>home.ruleExit</AppText>
        <AppText style={styles.note}>home.fictionalPrize</AppText>
      </AppModal>
    </Screen>
  );
};
