import CryptoJS from "crypto-js";

// Reduce PBKDF2 iterations to improve performance
const deriveKey = async (password: string, salt: string): Promise<string> => {
  const derivedKey = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(salt), {
    keySize: 256 / 32,
    iterations: 1000, // Reduced iterations for better performance
  });
  return derivedKey.toString(CryptoJS.enc.Hex);
};

export const encrypt = async (
  data: string,
  password: string
): Promise<string> => {
  const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex); // Generate salt
  const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex); // Generate IV
  const key = await deriveKey(password, salt);

  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const combined = `${salt}:${iv}:${encrypted.ciphertext.toString(
    CryptoJS.enc.Hex
  )}`;
  return combined;
};

export const decrypt = async (
  encryptedData: string,
  password: string
): Promise<string> => {
  const [salt, iv, ciphertext] = encryptedData.split(":");
  if (!salt || !iv || !ciphertext) {
    throw new Error("Invalid encrypted data format");
  }

  const key = await deriveKey(password, salt);

  const decrypted = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext),
    }),
    CryptoJS.enc.Hex.parse(key),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return CryptoJS.enc.Utf8.stringify(decrypted);
};

// Example usage in a non-blocking way
// (async () => {
//   const password = "strongpassword";
//   const data = "Secret Message";

//   // Run in background thread if possible
//   setTimeout(async () => {
//     const encrypted = await encrypt(data, password);
//     console.log("Encrypted:", encrypted);

//     const decrypted = await decrypt(encrypted, password);
//     console.log("Decrypted:", decrypted);
//   }, 0); // Offload to event loop
// })();
