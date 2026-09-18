import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { storage, STORAGE_KEYS } from "@/storage";

import { en } from "./locales/en";
import { ka } from "./locales/ka";

export const SUPPORTED_LANGUAGES = ["ka", "en"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const FALLBACK_LANGUAGE: Language = "ka";

export const resources = {
  ka: { translation: ka },
  en: { translation: en },
};

const isSupported = (value: string | null | undefined): value is Language =>
  SUPPORTED_LANGUAGES.includes(value as Language);

const resolveInitialLanguage = (): Language => {
  const saved = storage.getStringValue(STORAGE_KEYS.LANGUAGE);
  return isSupported(saved) ? saved : FALLBACK_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  resources,
  lng: resolveInitialLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  defaultNS: "translation",
  initAsync: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
