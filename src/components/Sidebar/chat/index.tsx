import React, { useEffect } from 'react'
import ChatList from './ChatList'
import { SidebarInput } from './ChatInput'
import { useChatCompletion } from '../../../hooks/useChatCompletion'
import { SYSTEM_PROMPT } from '../../../config/prompts'
import { AvailableModels, Settings } from '../../../config/settings'

interface ChatProps {
  settings: Settings
}

const Chat = ({ settings }: ChatProps) => {
  const {
    messages,
    submitQuery,
    clearMessages,
    generating,
    cancelRequest,
    removeMessagePair,
    error,
  } = useChatCompletion({
    model: settings.chat.modal,
    apiKey: settings.chat.openAIKey!,
    mode: settings.chat.mode,
    systemPrompt: SYSTEM_PROMPT,
  })

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      const { action, prompt } = event.data as {
        action: string
        prompt: string
      }
      if (action === 'generate') {
        submitQuery({ text: prompt, files: [] })
      }
    }
    window.addEventListener('message', handleWindowMessage)

    return () => {
      window.removeEventListener('message', handleWindowMessage)
    }
  }, [submitQuery])

  return (
    <>
      <ChatList
        messages={messages}
        removeMessagePair={removeMessagePair}
        generating={generating}
        error={error}
      />
      <SidebarInput
        loading={generating}
        submitMessage={submitQuery}
        chatIsEmpty={messages.length <= 1}
        clearMessages={clearMessages}
        cancelRequest={cancelRequest}
        isWebpageContextOn={settings.general.webpageContext}
        isVisionModel={settings.chat.modal === AvailableModels.GPT_4_VISION}
      />
    </>
  )
}

export default Chat
