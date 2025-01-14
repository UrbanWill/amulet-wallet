import * as Crypto from "expo-crypto";
import * as CryptoJS from "crypto-js";

// Derive a key using PBKDF2-like hashing
const deriveKey = async (
  password: string,
  salt: Uint8Array
): Promise<Uint8Array> => {
  let keyMaterial: Uint8Array = new Uint8Array([
    ...salt,
    ...new TextEncoder().encode(password),
  ]);

  // Perform multiple iterations of SHA-256 hashing
  for (let i = 0; i < 100000; i++) {
    const hash: string = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Array.from(keyMaterial)
        .map((byte) => String.fromCharCode(byte))
        .join(""),
      { encoding: Crypto.CryptoEncoding.HEX }
    );
    keyMaterial = new TextEncoder().encode(hash);
  }

  return keyMaterial.slice(0, 32); // Return first 32 bytes (256 bits)
};

// Encryption function
export const encrypt = async (
  data: string,
  password: string
): Promise<string> => {
  const salt: Uint8Array = Crypto.getRandomBytes(16); // 16-byte salt
  const iv: Uint8Array = Crypto.getRandomBytes(12); // 12-byte IV for AES-GCM
  const key: Uint8Array = await deriveKey(password, salt);

  // Encrypt using CryptoJS
  const encryptedData: string = CryptoJS.AES.encrypt(data, key.toString(), {
    iv: CryptoJS.enc.Hex.parse(
      Array.from(iv)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
    ),
  }).toString();

  // Combine salt, IV, and encrypted data
  const combined: Uint8Array = Uint8Array.from([
    ...salt,
    ...iv,
    ...new TextEncoder().encode(encryptedData),
  ]);
  return btoa(String.fromCharCode(...combined));
};

// Decryption function
export const decrypt = async (
  encryptedData: string,
  password: string
): Promise<string> => {
  const combined: Uint8Array = Uint8Array.from(atob(encryptedData), (c) =>
    c.charCodeAt(0)
  );

  // Extract salt, IV, and encrypted data
  const salt: Uint8Array = combined.slice(0, 16);
  const iv: Uint8Array = combined.slice(16, 28);
  const encryptedSeed: Uint8Array = combined.slice(28);

  const key: Uint8Array = await deriveKey(password, salt);

  // Decrypt using CryptoJS
  const decryptedData = CryptoJS.AES.decrypt(
    Array.from(encryptedSeed)
      .map((byte) => String.fromCharCode(byte))
      .join(""),
    key.toString(),
    {
      iv: CryptoJS.enc.Hex.parse(
        Array.from(iv)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("")
      ),
    }
  );

  return decryptedData.toString(CryptoJS.enc.Utf8);
};

// // Example usage
// (async () => {
//   const password = "strongpassword";
//   const data = "Secret Message";

//   const encrypted = await encrypt(data, password);
//   console.log("Encrypted:", encrypted);

//   const decrypted = await decrypt(encrypted, password);
//   console.log("Decrypted:", decrypted);
// })();
