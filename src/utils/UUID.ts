import { useStorage } from "../hooks/useStorage";

interface UrlMap {
  url: string;
  uuid: string;
}

export const getUUID = (url: string) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("uuid");
};

/**
 * @description Generate a new UUID
 * @returns {string} UUID
 * @example
 * getNewUUID();
 * // => "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID#see_also
 */

export const getNewUUID = (): string => {
<<<<<<< HEAD
  return self.crypto.randomUUID();
};
=======
  // const [urlMap, setUrlMap] = useStorage("urlMap", []);
  // const uuid = self.crypto.randomUUID();
  return self.crypto.randomUUID();
};

// const findORCreateUUID = (url: string) => {
//   const [urlMap, setUrlMap] = useStorage<UrlMap>("urlMap", [], "local");
//   const uuid = getUUID(url);
//   if (uuid) {
//     return uuid;
//   }
//   return getNewUUID();
// };
>>>>>>> c282520026a3d5f0ffba6eea500e0c8546f320e8
