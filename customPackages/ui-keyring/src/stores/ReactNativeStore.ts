import AsyncStorage from "@react-native-async-storage/async-storage";
import type { KeyringJson, KeyringStore } from "../types.js";

export class ReactNativeStore implements KeyringStore {
  // Get all keys and iterate over them to call the provided callback
  public async all(
    fn: (key: string, value: KeyringJson) => void
  ): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);

      stores.forEach(([key, value]) => {
        if (value !== null) {
          fn(key, JSON.parse(value) as KeyringJson);
        }
      });
    } catch (error) {
      console.error("Error getting all keys from AsyncStorage", error);
    }
  }

  // Get a single key's value
  public async get(
    key: string,
    fn: (value: KeyringJson) => void
  ): Promise<void> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        fn(JSON.parse(value) as KeyringJson);
      }
    } catch (error) {
      console.error(
        `Error getting value for key "${key}" from AsyncStorage`,
        error
      );
    }
  }

  // Remove a key and optionally call a callback after removal
  public async remove(key: string, fn?: () => void): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      fn && fn();
    } catch (error) {
      console.error(`Error removing key "${key}" from AsyncStorage`, error);
    }
  }

  // Set a key's value and optionally call a callback after setting
  public async set(
    key: string,
    value: KeyringJson,
    fn?: () => void
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      fn && fn();
    } catch (error) {
      console.error(
        `Error setting value for key "${key}" in AsyncStorage`,
        error
      );
    }
  }
}
