import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { encrypt, decrypt } from "~/utils/keyring";
import { useState } from "react";
import { Input } from "~/components/ui/input";

export default function Settings() {
  const [textValue, setTextValue] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");

  const handleSignOut = async () => {
    AsyncStorage.removeItem("isAuthenticated");
    router.replace("/");
  };

  const handleEncrypt = async () => {
    try {
      const encrypted = await encrypt(
        new TextEncoder().encode(textValue),
        "password"
      );
      setEncryptedText(encrypted);
    } catch (error) {
      console.log("Error encrypting", error);
    }
  };

  const handleDecrypt = async () => {
    const decrypted = await decrypt(encryptedText, "password");
    setDecryptedText(new TextDecoder().decode(decrypted));
  };

  return (
    <View className="p-6 flex flex-col gap-5">
      <Text>Settings</Text>
      <View className="flex space-around">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={() => handleSignOut()}
        >
          <Text>Home</Text>
        </Button>
      </View>
      <View>
        <Text>Enter text to encrypt:</Text>
        <View className="flex-row justify-around gap-3">
          <Input
            className="w-full"
            placeholder="Enter text to encrypt"
            value={textValue}
            onChangeText={(text) => setTextValue(text)}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View className="space-y-5">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={() => handleEncrypt()}
          disabled={!textValue}
        >
          <Text>Encrypt text</Text>
        </Button>
        <View>{encryptedText}</View>
      </View>
      <View className="space-y-5">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={() => handleDecrypt()}
          disabled={!encryptedText}
        >
          <Text>Decrypt text</Text>
        </Button>
        <View>{decryptedText}</View>
      </View>
    </View>
  );
}
