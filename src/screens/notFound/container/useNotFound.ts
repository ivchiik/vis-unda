import { useRouter } from "expo-router";

import { ROUTES } from "@/navigation";

export const useNotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace(ROUTES.HOME);
  };

  return { handleGoHome };
};
