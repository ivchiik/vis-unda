import { useEffect, useRef, useState } from "react";
import { BackHandler, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as AppleAuthentication from "expo-apple-authentication";
import { useTranslation } from "react-i18next";

import { authService, getAuthErrorKey, useAuthStore } from "@/auth";
import type { AuthAction } from "@/auth";
import type { TranslationKey } from "@/i18n";
import { ROUTES } from "@/navigation";

export const useAccount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, isInitializing, isUnavailable } = useAuthStore();
  const [isAppleAvailable, setIsAppleAvailable] = useState(Platform.OS === "android");
  const [pendingAction, setPendingAction] = useState<AuthAction | null>(null);
  const [errorKey, setErrorKey] = useState<TranslationKey | null>(null);
  const isBusyRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => isBusyRef.current);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    if (Platform.OS === "ios") {
      AppleAuthentication.isAvailableAsync()
        .then((isAvailable) => {
          if (isMountedRef.current) setIsAppleAvailable(isAvailable);
        })
        .catch(() => {});
    }
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleAuth = async (action: AuthAction) => {
    if (isBusyRef.current || isInitializing || isUnavailable) return;
    isBusyRef.current = true;
    setPendingAction(action);
    setErrorKey(null);
    try {
      if (action === "signOut") await authService.signOut();
      else if (action === "google") await authService.signInWithGoogle();
      else await authService.signInWithApple();
    } catch (error) {
      if (isMountedRef.current) setErrorKey(getAuthErrorKey(error));
    } finally {
      isBusyRef.current = false;
      if (isMountedRef.current) setPendingAction(null);
    }
  };

  return {
    t,
    user,
    isInitializing,
    isUnavailable,
    isAppleAvailable,
    isNativeApple: Platform.OS === "ios",
    isBusy: pendingAction !== null,
    isDisabled: isInitializing || isUnavailable || pendingAction !== null,
    errorKey,
    handleGoogle: () => void handleAuth("google"),
    handleApple: () => void handleAuth("apple"),
    handleSignOut: () => void handleAuth("signOut"),
    handleHome: () => router.replace(ROUTES.HOME),
  };
};
