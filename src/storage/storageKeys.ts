export const STORAGE_KEYS = {
  LANGUAGE: "i18n.language",
  PLAYER_NAME: "player_name",
  BEST_AMOUNT: "best_amount",
  IS_SOUND_ENABLED: "is_sound_enabled",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
