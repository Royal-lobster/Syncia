import React, { useEffect } from 'react'
import ChatList from './chatList'
import { SidebarInput } from './chatInput'
import { GPT35, useChatCompletion } from '../../../hooks/useOpenAI'
import { SYSTEM_PROMPT } from '../../../prompts'

interface ChatProps {
  apiKey: string
}

const Chat = ({ apiKey }: ChatProps) => {
  const { messages, submitQuery, clearMessages, loading, cancelRequest } =
    useChatCompletion({
      model: GPT35.TURBO,
      apiKey,
      systemPrompt: SYSTEM_PROMPT,
    })

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
      <ChatList messages={messages} />
      <SidebarInput
        loading={loading}
        submitMessage={submitQuery}
        chatIsEmpty={messages.length <= 1}
        clearMessages={clearMessages}
        cancelRequest={cancelRequest}
      />
    </>
  )
}

export default Chat
