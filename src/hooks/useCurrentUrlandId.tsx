import { useState, useEffect } from 'react';
import { getActiveTabUrl } from '../utils/getActiveTab';
import { ChatHistory } from './useOpenAI';
import { getNewUUID } from '../utils/UUID';
import { useStorage } from './useStorage';
import { ChatMessage } from './useOpenAI';

interface IUrlMap {
    url: string,
    id: string,
}

export function useCurrentUrlandId(ChatHistory: ChatHistory[]): [string, string, ChatMessage[]] {
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [currentId, setCurrentId] = useState<string>('');
    const [currentMessage, setCurrentMessage] = useState<ChatMessage[]>([]);

    const [urlsMap, setUrlsMap] = useStorage<IUrlMap[]>('urlsMap', [], 'local')

    useEffect(() => {
        console.log(urlsMap, 'urlsmap');

        let isFound: boolean = false;
        let tempUrl: string;
        getActiveTabUrl().then((url) => {
            setCurrentUrl(url);
            tempUrl = url
            ChatHistory.map((chatMessage) => {
                if (chatMessage.url === url) {
                    setCurrentMessage(chatMessage.ChatMessages)
                    setCurrentId(chatMessage.id);
                    isFound = true;
                }
            })
        }).then(() => {
            console.log(tempUrl, 'current url', isFound, 'is found');

            if (!isFound) {
                const uuid: string = getNewUUID();
                setUrlsMap([...urlsMap, { url: tempUrl, id: uuid }])
                setCurrentId(currentId)
            }
        })
    }, [currentUrl]);

    return [currentUrl, currentId, currentMessage];
}
