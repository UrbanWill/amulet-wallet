import AsyncStorage from "@react-native-async-storage/async-storage";
// import keyring from "@polkadot/ui-keyring";
import { Keyring } from "@polkadot/keyring";

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
    console.log({ name, password });
    // throw new Error("Password or name not found");
    console.log("Password or name not found");
    return null;
  }
  const derivationPath = "//0";
  // console.log({ password, mnemonic, derivationPath });
  const suri = formatSuri(mnemonic, derivationPath);

  console.log({ suri });

  const keyring = new Keyring({ type });

  const account = keyring.addFromUri(suri, {
    name,
    origin: "AMULET",
    // derivedMnemonicId,
    derivationPath,
  });
  console.log({ account });
  // const { pair } = keyring.addUri(
  //   suri,
  //   password,
  //   {
  //     name,
  //     origin: "AMULET",
  //     // derivedMnemonicId,
  //     derivationPath,
  //   },
  //   type
  // );

  // console.log({ pair });
}
