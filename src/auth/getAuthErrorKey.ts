import type { TranslationKey } from "@/i18n";

export const getAuthErrorKey = (error: unknown): TranslationKey | null => {
  const code =
    typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";

  switch (code) {
    case "ERR_REQUEST_CANCELED":
    case "SIGN_IN_CANCELLED":
    case "12501":
    case "auth/web-context-cancelled":
    case "auth/popup-closed-by-user":
      return null;
    case "auth/network-request-failed":
    case "NETWORK_ERROR":
    case "7":
      return "auth.errorNetwork";
    case "PLAY_SERVICES_NOT_AVAILABLE":
      return "auth.errorPlayServices";
    case "auth/account-exists-with-different-credential":
    case "auth/credential-already-in-use":
      return "auth.errorExistingAccount";
    case "auth/user-disabled":
      return "auth.errorDisabled";
    case "auth/too-many-requests":
      return "auth.errorTooManyRequests";
    default:
      return "auth.errorGeneral";
  }
};
