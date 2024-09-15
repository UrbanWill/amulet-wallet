import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountsStore from "~/customPackages/ui-keyring/src/stores/AccountsStore";

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
  const suri = formatSuri(mnemonic, derivationPath);

  console.log({ suri });

  try {
    keyring.loadAll({
      store: new AccountsStore(),
      type: "sr25519",
      filter: (json) => {
        return typeof json?.address === "string";
      },
    });
  } catch (error) {
    console.error("Error loading accounts:", error);
  }

  try {
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
  } catch (error) {
    console.error("Error adding account:", error);
  }
}
