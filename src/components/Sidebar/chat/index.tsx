import React, { useEffect, useState } from 'react'
import ChatList from './chatList'
import { SidebarInput } from './chatInput'
import { ChatMessage, useChatCompletion } from '../../../hooks/useOpenAI'
import { SYSTEM_PROMPT } from '../../../prompts'
import { Settings } from '../../../hooks/useSettings'
import { useCurrentMessage } from '../../../hooks/useCurrentMessage'
import { useChatHistory } from '../../../hooks/useChatHistoty'

interface ChatProps {
  settings: Settings
}

const Chat = ({ settings }: ChatProps) => {
  const { submitQuery, clearMessages, loading, cancelRequest, messages, currentId, setCurrentId } =
    useChatCompletion({
      model: settings.chat.modal,
      apiKey: settings.chat.openAIKey!,
      mode: settings.chat.mode,
      systemPrompt: SYSTEM_PROMPT,
    })

  const [currentChat, setCurrentChat] = useCurrentMessage()

  const [chatHistory, setChatHistory] = useChatHistory()

  const [currentMessage, setCurrentMessage] = useState<ChatMessage[]>(currentChat.ChatMessages)

  console.log(currentChat, 'currentchat comp');

  useEffect(() => {
    setCurrentMessage(currentChat.ChatMessages)
  }, [currentChat, setCurrentMessage, messages, currentId])

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
      <ChatList messages={currentMessage} />
      <SidebarInput
        loading={loading}
        submitMessage={submitQuery}
        chatIsEmpty={currentChat.ChatMessages.length <= 1}
        clearMessages={clearMessages}
        cancelRequest={cancelRequest}
        setCurrentChat={setCurrentChat}
        chatHistory={chatHistory}
        currentChat={currentChat}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </>
  )
}

export default Chat
