import AsyncStorage from "@react-native-async-storage/async-storage";
import keyring from "../customPackages/ui-keyring/src/index";

const type = "sr25519";
export const formatSuri = (mnemonic: string, derivationPath: string) =>
  derivationPath && !derivationPath.startsWith("/")
    ? `${mnemonic}/${derivationPath}`
    : `${mnemonic}${derivationPath}`;

export default async function handleCreatePolkadotAccount({
  mnemonic,
}: {
  mnemonic: string;
}) {
  const password = await AsyncStorage.getItem("password");
  const name = await AsyncStorage.getItem("polkadotAccountName");
  if (!password || !name) {
    throw new Error("Password or name not found");
  }
  const derivationPath = "//0";
  const suri = formatSuri(mnemonic, derivationPath);

  try {
    const { pair } = keyring.addUri(
      suri,
      password,
      {
        name,
        origin: "AMULET",

        derivationPath,
      },
      type
    );

    return pair;
  } catch (error) {
    console.error("Error adding account:", error);
  }
}
