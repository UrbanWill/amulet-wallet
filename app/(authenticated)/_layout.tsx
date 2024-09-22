import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { TabBarIcon } from "~/components/TabBarIcon";

export default function AuthenticatedLayout() {
  const checkAuth = async () => {
    const isAuth = await AsyncStorage.getItem("isAuthenticated");
    if (!isAuth) {
      console.log("Not authenticated", { isAuth });
      router.navigate("/(onboard)");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="balances"
        options={{
          title: "Balances",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "folder" : "folder-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "cog" : "cog-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
