import { Stack } from "expo-router";

export default function OnboardLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Create password" }} />
      <Stack.Screen
        name="newAccount"
        options={{ title: "Add your first account" }}
      />
    </Stack>
  );
}
