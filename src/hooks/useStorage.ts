import { type PrimitiveAtom, useAtom } from 'jotai'
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react'

export type StorageArea = 'sync' | 'local'

// custom hook to set chrome local/sync storage
// should also set a listener on this specific key

type SetValue<T> = Dispatch<SetStateAction<T>>

/**
 * Returns a stateful value from storage, and a function to update it.
 */
export function useStorage<T>(
  key: string,
  atom: PrimitiveAtom<T>,
  area: StorageArea = 'local',
): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useAtom(atom)

  // biome-ignore lint/correctness/useExhaustiveDependencies: This works fine. i don't want to change it.
  useEffect(() => {
    readStorage<T>(key, area).then((res) => {
      if (res) setStoredValue(res)
    })

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (
        namespace === area &&
        Object.prototype.hasOwnProperty.call(changes, key)
      ) {
        if (changes[key].newValue) setStoredValue(changes[key].newValue)
      }
    })
  }, [])

  const setValueRef = useRef<SetValue<T>>()

  setValueRef.current = (value) => {
    // Allow value to be a function, so we have the same API as useState
    const newValue = value instanceof Function ? value(storedValue) : value
    // Save to storage
    setStoredValue((prevState) => {
      setStorage<T>(key, newValue, area).then((success) => {
        if (!success) setStoredValue(prevState)
      })

      return newValue
    })
  }

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to storage.
  const setValue: SetValue<T> = useCallback(
    (value) => setValueRef.current?.(value),
    [],
  )

  return [storedValue, setValue]
}

/**
 * Retrieves value from chrome storage area
 *
 * @param key
 * @param area - defaults to local
 */
export async function readStorage<T>(
  key: string,
  area: StorageArea = 'local',
): Promise<T | undefined> {
  try {
    const result = await chrome.storage[area].get(key)
    return result?.[key]
  } catch (error) {
    console.warn(`Error reading ${area} storage key "${key}":`, error)
    return undefined
  }
}

/**
 * Sets object in chrome storage area
 *
 * @param key
 * @param value - value to be saved
 * @param area - defaults to local
 */
export async function setStorage<T>(
  key: string,
  value: T,
  area: StorageArea = 'local',
): Promise<boolean> {
  try {
    await chrome.storage[area].set({ [key]: value })
    return true
  } catch (error) {
    console.warn(`Error setting ${area} storage key "${key}":`, error)
    return false
  }
}

/**
 * Function to save data to IndexedDB
 */
export const saveToIndexedDB = async (key: string, data: any) => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open('SynciaDB', 1)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore('embeddings')
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      const transaction = db.transaction('embeddings', 'readwrite')
      const store = transaction.objectStore('embeddings')
      store.put(data, key)

      transaction.oncomplete = () => {
        resolve()
      }

      transaction.onerror = (event) => {
        reject(event)
      }
    }

    request.onerror = (event) => {
      reject(event)
    }
  })
}

/**
 * Function to retrieve data from IndexedDB
 */
export const getFromIndexedDB = async (key: string) => {
  return new Promise<any>((resolve, reject) => {
    const request = indexedDB.open('SynciaDB', 1)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore('embeddings')
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      const transaction = db.transaction('embeddings', 'readonly')
      const store = transaction.objectStore('embeddings')
      const getRequest = store.get(key)

      getRequest.onsuccess = () => {
        resolve(getRequest.result)
      }

      getRequest.onerror = (event) => {
        reject(event)
      }
    }

    request.onerror = (event) => {
      reject(event)
    }
  })
}
