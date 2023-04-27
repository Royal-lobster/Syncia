import React, { useEffect } from 'react'
import ChatList from './chatList'
import { SidebarInput } from './chatInput'
import { useChatCompletion } from '../../../hooks/useOpenAI'
import { SYSTEM_PROMPT } from '../../../prompts'
import { Settings } from '../../../hooks/useSettings'

interface ChatProps {
  settings: Settings
}

const Chat = ({ settings }: ChatProps) => {
  const { submitQuery, clearMessages, loading, cancelRequest, setChatMessage, currentChat, chatHistory, currentUrl, setCurrentUrl } =
    useChatCompletion({
      model: settings.chat.modal,
      apiKey: settings.chat.openAIKey!,
      mode: settings.chat.mode,
      systemPrompt: SYSTEM_PROMPT,
    })

  console.log(currentChat, 'currentchat comp');

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      const { action, prompt } = event.data as {
        action: string
        prompt: string
      }
      if (action === 'generate') {
        submitQuery([{ content: prompt, role: 'user' }])
      }
    }
    window.addEventListener('message', handleWindowMessage)

    return () => {
      window.removeEventListener('message', handleWindowMessage)
    }
  }, [])

  return (
    <>
      <ChatList messages={currentChat.ChatMessages} />
      <SidebarInput
        loading={loading}
        submitMessage={submitQuery}
        chatIsEmpty={currentChat.ChatMessages.length <= 1}
        clearMessages={clearMessages}
        cancelRequest={cancelRequest}
        setChatMessage={setChatMessage}
        chatHistory={chatHistory}
        currentUrl={currentUrl}
        setCurrentUrl={setCurrentUrl}
      />
    </>
  )
}

export default Chat
