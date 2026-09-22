import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { screenOptions } from "@/navigation";
import { AppProviders } from "@/providers";

export const RootLayout = () => (
  <AppProviders>
    <StatusBar style="light" />
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="account" options={{ gestureEnabled: false }} />
      <Stack.Screen name="game" options={{ gestureEnabled: false }} />
    </Stack>
  </AppProviders>
);

export default RootLayout;
