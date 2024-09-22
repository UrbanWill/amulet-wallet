import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";

export default function OnboardLayout() {
  const checkAuth = async () => {
    const isAuth = await AsyncStorage.getItem("isAuthenticated");
    if (isAuth) {
      console.log("Authenticated", { isAuth });
      router.navigate("/(authenticated)");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Create password" }} />
      <Stack.Screen
        name="newAccount"
        options={{ title: "Add your first account" }}
      />
      <Stack.Screen
        name="newPolkadotAccount"
        options={{ title: "Create new Polkadot account" }}
      />
      <Stack.Screen
        name="newRecoveryPhrase"
        options={{ title: "New recovery phrase" }}
      />
      <Stack.Screen
        name="signIn"
        options={{ title: "Sign in to your account" }}
      />
    </Stack>
  );
}
