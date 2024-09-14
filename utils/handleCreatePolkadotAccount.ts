import AsyncStorage from "@react-native-async-storage/async-storage";

// import keyring from "keyring-ui-rn";
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
  // console.log({ password, mnemonic, derivationPath });
  const suri = formatSuri(mnemonic, derivationPath);

  console.log({ suri });

  const { pair } = keyring.addUri(
    suri,
    password,
    {
      name,
      origin: "AMULET",
      // derivedMnemonicId,
      derivationPath,
    },
    type
  );

  console.log({ pair });
}
