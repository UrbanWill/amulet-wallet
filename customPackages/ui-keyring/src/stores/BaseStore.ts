// Modified version of the original Base.ts file from package @polkadot/extension-base/stores
import AsyncStorage from "@react-native-async-storage/async-storage";

const lastError = (type: string, error?: any): void => {
  if (error) {
    console.error(`BaseStore.${type}:: Error:`, error);
  }
};

export default class BaseStore<T> {
  __internal__prefix: string;

  constructor(prefix?: string) {
    this.__internal__prefix = prefix ? `${prefix}:` : "";
  }

  // Get all items and update them
  public async all(update: (key: string, value: T) => void): Promise<void> {
    try {
      const map = await this.allMap();
      Object.entries(map).forEach(([key, value]) => {
        update(key, value);
      });
    } catch (error) {
      lastError("all", error);
    }
  }

  // Get all items in a map format
  public async allMap(): Promise<Record<string, T>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) =>
        key.startsWith(this.__internal__prefix)
      );

      const stores = await AsyncStorage.multiGet(filteredKeys);
      const map: Record<string, T> = {};

      stores.forEach(([key, value]) => {
        if (value !== null) {
          map[key.replace(this.__internal__prefix, "")] = JSON.parse(value);
        }
      });

      return map;
    } catch (error) {
      lastError("allMap", error);
      return {};
    }
  }

  // Get a single item by key
  public async get(
    key: string,
    update: (value: T | null) => void
  ): Promise<void> {
    const prefixedKey = `${this.__internal__prefix}${key}`;
    try {
      const result = await AsyncStorage.getItem(prefixedKey);
      update(result !== null ? JSON.parse(result) : null);
    } catch (error) {
      lastError("get", error);
    }
  }

  // Remove a single item by key
  public async remove(key: string, update?: () => void): Promise<void> {
    const prefixedKey = `${this.__internal__prefix}${key}`;
    try {
      await AsyncStorage.removeItem(prefixedKey);
      update && update();
    } catch (error) {
      lastError("remove", error);
    }
  }

  // Set a single item by key
  public async set(key: string, value: T, update?: () => void): Promise<void> {
    const prefixedKey = `${this.__internal__prefix}${key}`;
    try {
      await AsyncStorage.setItem(prefixedKey, JSON.stringify(value));
      update && update();
    } catch (error) {
      lastError("set", error);
    }
  }
}
