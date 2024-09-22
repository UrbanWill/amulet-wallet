import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";

export default function Settings() {
  const handleSignOut = async () => {
    AsyncStorage.removeItem("isAuthenticated");
    router.replace("/(onboard)/signIn");
  };

  return (
    <View className="p-6">
      <Text>Settings</Text>
      <View className="flex space-around">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={() => handleSignOut()}
        >
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}
