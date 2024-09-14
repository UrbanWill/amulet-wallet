import { View } from "react-native";
import { Text } from "~/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";

export default function NewAccount() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm py-6 px-2 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">
            New Polkadot account
          </CardTitle>
        </CardHeader>
        <CardContent className="items-center">
          <Text>Create new Polkadot account</Text>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
            onPress={() => router.navigate("/newPolkadotAccount")}
          >
            <Text>Next</Text>
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm py-6 px-2 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">
            New Ethereum account
          </CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Coming soon
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent className="items-center">
          <Text>Create new Ethereum account</Text>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
            onPress={() => console.log("Implement Ethereum")}
            disabled
          >
            <Text>Next</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
