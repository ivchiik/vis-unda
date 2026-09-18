import { storage, STORAGE_KEYS } from "@/storage";

import i18n, { type Language } from "./i18n";

export const changeLanguage = async (language: Language) => {
  if (i18n.language === language) return;

  storage.setValue(STORAGE_KEYS.LANGUAGE, language);
  await i18n.changeLanguage(language);
};
