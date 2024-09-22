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
import { cn } from "~/lib/utils";

export default function SignIn() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const onChangeText = (text: string) => {
    if (error) setError(false);
    setValue(text);
  };

  const handleSubmit = async () => {
    const password = await AsyncStorage.getItem("password");
    if (password === value) {
      await AsyncStorage.setItem("isAuthenticated", "true");
      router.navigate("/(authenticated)");
    } else {
      setError(true);
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm py-6 px-2 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">Sign in</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Enter your password to access your account.
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <Input
              // className="border-2 border-rose-500"
              className={cn("w-full", {
                "border-red-500": error,
              })}
              placeholder="Enter password..."
              value={value}
              onChangeText={onChangeText}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              secureTextEntry={true}
            />
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
            onPress={handleSubmit}
            disabled={!value}
          >
            <Text>Sign in</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
