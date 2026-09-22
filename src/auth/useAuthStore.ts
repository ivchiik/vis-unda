import { create } from "zustand";

import type { AuthUser } from "./types";

interface AuthState {
  user: AuthUser | null;
  isInitializing: boolean;
  isUnavailable: boolean;
  setUser: (user: AuthUser | null) => void;
  setUnavailable: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitializing: true,
  isUnavailable: false,
  setUser: (user) => set({ user, isInitializing: false, isUnavailable: false }),
  setUnavailable: () => set({ isInitializing: false, isUnavailable: true }),
}));
