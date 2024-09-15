import type { KeyringJson, KeyringStore } from "../types";
import RNFS from "react-native-fs";

// NOTE: untested and may require further adaptation for specific scenarios
export class ReactNativeFileStore implements KeyringStore {
  #path: string;

  constructor(path: string) {
    this.#path = path;
    this._initDirectory(path);
  }

  // Initialize the directory, create if it doesn't exist
  private async _initDirectory(path: string): Promise<void> {
    const exists = await RNFS.exists(path);
    if (!exists) {
      await RNFS.mkdir(path);
    }
  }

  // Get all keys and iterate over them
  public async all(
    fn: (key: string, value: KeyringJson) => void
  ): Promise<void> {
    try {
      const files = await RNFS.readDir(this.#path);

      for (const file of files) {
        if (file.isFile() && ![".DS_Store"].includes(file.name)) {
          const value = await this._readKey(file.name);
          if (value?.address) {
            fn(file.name, value);
          }
        }
      }
    } catch (error) {
      console.error("Error reading all files:", error);
    }
  }

  // Get a specific key
  public async get(
    key: string,
    fn: (value: KeyringJson) => void
  ): Promise<void> {
    try {
      const value = await this._readKey(key);
      if (!value?.address) {
        throw new Error(`Invalid JSON found for ${key}`);
      }
      fn(value);
    } catch (error) {
      console.error(`Error getting key "${key}":`, error);
    }
  }

  // Remove a specific key
  public async remove(key: string, fn?: () => void): Promise<void> {
    try {
      const filePath = this._getPath(key);
      await RNFS.unlink(filePath);
      fn && fn();
    } catch (error) {
      console.error(`Error removing key "${key}":`, error);
    }
  }

  // Set a specific key
  public async set(
    key: string,
    value: KeyringJson,
    fn?: () => void
  ): Promise<void> {
    try {
      const filePath = this._getPath(key);
      await RNFS.writeFile(filePath, JSON.stringify(value), "utf8");
      fn && fn();
    } catch (error) {
      console.error(`Error setting key "${key}":`, error);
    }
  }

  // Get the file path for a key
  private _getPath(key: string): string {
    return `${this.#path}/${key}`;
  }

  // Read the content of a key file
  private async _readKey(key: string): Promise<KeyringJson | undefined> {
    try {
      const filePath = this._getPath(key);
      const content = await RNFS.readFile(filePath, "utf8");
      return JSON.parse(content) as KeyringJson;
    } catch (error) {
      console.error(`Error reading key "${key}":`, error);
      return undefined;
    }
  }
}
