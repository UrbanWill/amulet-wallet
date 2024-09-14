import { useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { Input } from "~/components/ui/input";

export default function NewPolkadotAccount() {
  const [value, setValue] = useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const handleNext = async () => {
    await AsyncStorage.setItem("polkadotAccountName", value);
    router.navigate("/newRecoveryPhrase");
  };

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm py-6 px-2 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">Account Name</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Polkadot, Kusama & Parachains
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <Input
              className="w-full"
              placeholder="Choose a name"
              value={value}
              onChangeText={onChangeText}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
            onPress={handleNext}
            disabled={!value}
          >
            <Text>Next</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
