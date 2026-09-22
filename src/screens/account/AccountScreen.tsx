import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { AppButton, AppPanel, AppText, Screen } from "@/components";
import { useTheme } from "@/theme";

import { useAccount } from "./container/useAccount";
import { _styles } from "./AccountScreen.styles";

export const AccountScreen = () => {
  const { styles, theme } = useTheme(_styles);
  const {
    t,
    user,
    isInitializing,
    isUnavailable,
    isAppleAvailable,
    isNativeApple,
    isBusy,
    isDisabled,
    errorKey,
    handleGoogle,
    handleApple,
    handleSignOut,
    handleHome,
  } = useAccount();

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.icon}
            accessible={false}
          />
          <AppText accessibilityRole="header" style={styles.title}>
            auth.title
          </AppText>
          <AppText style={styles.description}>
            {user ? "auth.signedIn" : "auth.description"}
          </AppText>
        </View>

        {user ? (
          <>
            <AppPanel tone="blue" contentStyle={styles.profile}>
              <AppText style={styles.name}>{user.displayName || t("auth.player")}</AppText>
              {!!user.email && <AppText style={styles.email}>{user.email}</AppText>}
            </AppPanel>
            <AppButton
              title="auth.signOut"
              variant="secondary"
              disabled={isDisabled}
              onPress={handleSignOut}
            />
          </>
        ) : (
          <View style={styles.providers}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              style={styles.providerButton}
              accessibilityLabel={t("auth.google")}
              disabled={isDisabled}
              onPress={handleGoogle}
            />
            {isAppleAvailable &&
              (isNativeApple ? (
                <View
                  pointerEvents={isDisabled ? "none" : "auto"}
                  accessibilityState={{ disabled: isDisabled }}
                >
                  <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                    cornerRadius={6}
                    style={styles.providerButton}
                    accessibilityLabel={t("auth.apple")}
                    onPress={handleApple}
                  />
                </View>
              ) : (
                <AppButton
                  title="auth.apple"
                  variant="secondary"
                  disabled={isDisabled}
                  onPress={handleApple}
                />
              ))}
          </View>
        )}

        {(isInitializing || isBusy) && (
          <View style={styles.status} accessibilityLiveRegion="polite">
            <ActivityIndicator color={theme.color.blue100} />
            <AppText style={styles.description}>
              {isInitializing ? "auth.restoring" : "auth.working"}
            </AppText>
          </View>
        )}
        {(errorKey || isUnavailable) && (
          <AppText
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
            style={styles.error}
          >
            {isUnavailable ? "auth.errorUnavailable" : errorKey}
          </AppText>
        )}
        <AppText style={styles.note}>auth.practiceNote</AppText>
        <AppButton
          title={user ? "common.backHome" : "auth.guest"}
          disabled={isBusy}
          onPress={handleHome}
        />
      </ScrollView>
    </Screen>
  );
};
