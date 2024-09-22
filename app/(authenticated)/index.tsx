import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import keyring from "~/customPackages/ui-keyring/src";
import { Button } from "~/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { KeyringAddress } from "~/customPackages/ui-keyring/src/types";

function formatPolkadotAddress(address: string): string {
  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-5);

  return `${firstPart}...${lastPart}`;
}

export default function Home() {
  const [allAccounts, setAllAccounts] = useState<KeyringAddress[]>([]);
  console.log({ allAccounts });
  const getAllAccounts = async () => {
    const accounts = await keyring.getAccounts();
    setAllAccounts(accounts);
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  const handleSignOut = async () => {
    AsyncStorage.removeItem("isAuthenticated");
    router.navigate("/(onboard)");
  };

  return (
    <View className="p-6">
      <View className="flex space-around">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={handleSignOut}
        >
          <Text>Sign out</Text>
        </Button>
        <Text>All accounts</Text>
      </View>
      <View className="flex-col gap-3">
        {allAccounts.map((account) => (
          <View
            key={account.address}
            className="bg-gray-300 flex flex-row gap-2 p-2 rounded-md"
          >
            <Text>{account.meta.name}</Text>
            <Text>{formatPolkadotAddress(account.address)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
