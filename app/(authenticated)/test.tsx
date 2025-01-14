import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { encrypt, decrypt } from "~/utils/keyring";
import { useState, useCallback } from "react";
import { Input } from "~/components/ui/input";

export default function Settings() {
  const [textValue, setTextValue] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");
  const [isEncryptLoading, setIsEncryptLoading] = useState<boolean>(false);
  const [isDecryptLoading, setIsDecryptLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    AsyncStorage.removeItem("isAuthenticated");
    router.replace("/");
  };

  const handleEncrypt = useCallback(async () => {
    setIsEncryptLoading(true);
    try {
      const encrypted = await encrypt(textValue, "password");
      console.log({ encrypted });
      setEncryptedText(encrypted);
    } catch (error) {
      console.log("Error encrypting", error);
    } finally {
      setIsEncryptLoading(false);
    }
  }, [encrypt, textValue, setIsEncryptLoading]);

  const handleDecrypt = useCallback(async () => {
    try {
      setIsDecryptLoading(true);
      const decrypted = await decrypt(encryptedText, "password");
      console.log({ decrypted });
      setDecryptedText(decrypted);
    } catch (error) {
      console.log("Error decrypting", error);
    } finally {
      setIsDecryptLoading(false);
    }
  }, [decrypt, encryptedText, setIsDecryptLoading]);

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
          />
        </View>
      </View>
      <View className="space-y-5">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={() => handleEncrypt()}
          disabled={!textValue || isEncryptLoading}
        >
          <Text>Encrypt text</Text>
        </Button>
        <Text>{`Encrypted text: ${
          isEncryptLoading ? "Loading..." : encryptedText
        }`}</Text>
      </View>
      <View className="space-y-5">
        <Button
          variant="outline"
          className="shadow shadow-foreground/5"
          onPress={() => handleDecrypt()}
          disabled={!encryptedText || isDecryptLoading}
        >
          <Text>Decrypt text</Text>
        </Button>
        <Text>{`Decrypted text: ${
          isDecryptLoading ? "Loading..." : decryptedText
        }`}</Text>
      </View>
    </View>
  );
}
