import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { screenOptions } from "@/navigation";
import { AppProviders } from "@/providers";

export const RootLayout = () => (
  <AppProviders>
    <StatusBar style="dark" />
    <Stack screenOptions={screenOptions} />
  </AppProviders>
);

export default RootLayout;
