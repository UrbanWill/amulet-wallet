import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import handleCreatePolkadotAccount from "~/utils/handleCreatePolkadotAccount";

export default function NewRecoveryPhrase() {
  const [isLoading, setIsLoading] = useState(false);
  const mnemonic = mnemonicGenerate(12);

  const handleCreate = async () => {
    setIsLoading(true);
    const pair = await handleCreatePolkadotAccount({ mnemonic });
    setIsLoading(false);
    console.log("Account created", { pair });
    await AsyncStorage.setItem("isAuthenticated", "true");
    router.navigate("/(authenticated)");
  };

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm py-6 px-2 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">
            New recovery phrase
          </CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Your recovery phrase gives you access to your wallet and funds.
              Write it down and store it in a secure location.
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <Text>{mnemonic}</Text>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
            onPress={handleCreate}
            disabled={isLoading}
          >
            <Text>Create</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
