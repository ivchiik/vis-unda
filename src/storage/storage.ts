import Storage from "expo-sqlite/kv-store";

import type { StorageKey } from "./storageKeys";

export const storage = {
  setValue: (key: StorageKey, value: string | number | boolean): void => {
    try {
      Storage.setItemSync(key, String(value));
    } catch (error) {
      console.warn("[storage] setValue failed", key, error);
    }
  },

  getStringValue: (key: StorageKey): string | null => {
    try {
      return Storage.getItemSync(key);
    } catch (error) {
      console.warn("[storage] getStringValue failed", key, error);
      return null;
    }
  },

  getNumberValue: (key: StorageKey): number | null => {
    const raw = storage.getStringValue(key);
    if (raw === null) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  },

  getBooleanValue: (key: StorageKey): boolean | null => {
    const raw = storage.getStringValue(key);
    if (raw === null) return null;
    return raw === "true";
  },

  setJson: <T>(key: StorageKey, value: T): void => {
    try {
      Storage.setItemSync(key, JSON.stringify(value));
    } catch (error) {
      console.warn("[storage] setJson failed", key, error);
    }
  },

  getJson: <T>(key: StorageKey): T | null => {
    const raw = storage.getStringValue(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      console.warn("[storage] getJson failed", key, error);
      return null;
    }
  },

  removeValue: (key: StorageKey): void => {
    try {
      Storage.removeItemSync(key);
    } catch (error) {
      console.warn("[storage] removeValue failed", key, error);
    }
  },
};
