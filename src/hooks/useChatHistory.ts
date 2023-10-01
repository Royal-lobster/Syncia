import { atom } from "jotai";
import { getUUID } from "../lib/getUUID";
import { readStorage, useStorage } from "./useStorage";
import { getStoredChatKey } from "./useCurrentChat";
import { getCurrentSiteHostName } from "../lib/getCurrentSiteHostName";

interface ChatHistory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const initialChatId = getUUID();
const historyAtom = atom<ChatHistory[]>([]);
const currentChatIdAtom = atom<string>(initialChatId);

export const useChatHistory = () => {
  const [history, setHistory] = useStorage<ChatHistory[]>(
    "HISTORY",
    historyAtom
  );
  const [currentChatId, setCurrentChatId] = useStorage<string>(
    "CURRENT_CHAT_ID",
    currentChatIdAtom
  );

  const createChatHistory = (name: string, newId = getUUID()) => {
    setHistory((prev) => [
      ...prev,
      {
        id: newId,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    setCurrentChatId(newId);

    return newId;
  };

  const deleteChatHistory = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const getChatHistory = (id: string) => {
    return history.find((h) => h.id === id);
  };

  const updateChatHistory = (id: string, name: string) => {
    setHistory((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          return {
            ...h,
            name,
            updatedAt: new Date().toISOString(),
          };
        }
        return h;
      })
    );
  };

  const initializeChatHistory = async () => {
    const currentHistory = await readStorage<ChatHistory[]>(
      getStoredChatKey(currentChatId),
      "local"
    );

    if (currentHistory?.length) {
      updateChatHistory(currentChatId, await getCurrentSiteHostName());
    } else {
      createChatHistory(await getCurrentSiteHostName());
    }
  };

  if (currentChatId === initialChatId) {
    initializeChatHistory();
  }

  return {
    currentChatId,
    setCurrentChatId,
    createChatHistory,
    deleteChatHistory,
    getChatHistory,
    history,
  };
};
