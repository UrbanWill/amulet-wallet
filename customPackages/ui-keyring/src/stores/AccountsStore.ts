// Modified version of the original Account.ts file from package @polkadot/extension-base/stores
import type { KeyringJson, KeyringStore } from "../types";
import BaseStore from "./BaseStore"; // Converted BaseStore

export default class AccountsStore
  extends BaseStore<KeyringJson>
  implements KeyringStore
{
  constructor() {
    super("account"); // Using 'account' as the prefix
  }

  // Override get method to ensure no 'null' is passed to the callback
  public async get(
    key: string,
    cb: (value: KeyringJson) => void
  ): Promise<void> {
    super.get(key, (value: KeyringJson | null) => {
      if (value !== null) {
        cb(value); // Only call the callback if the value is not null
      } else {
        console.error(`AccountStore.get: No value found for key ${key}`);
      }
    });
  }

  // Override set method to include additional functionality
  public async set(
    key: string,
    value: KeyringJson,
    update?: () => void
  ): Promise<void> {
    await super.set(key, value, update); // Call BaseStore set method
  }
}
