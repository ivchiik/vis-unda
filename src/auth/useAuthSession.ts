import { useEffect } from "react";

import { authService } from "./authService";
import { useAuthStore } from "./useAuthStore";

export const useAuthSession = () => {
  useEffect(() => {
    try {
      return authService.observe(useAuthStore.getState().setUser);
    } catch {
      useAuthStore.getState().setUnavailable();
    }
  }, []);
};
