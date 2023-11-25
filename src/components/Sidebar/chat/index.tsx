import { useEffect } from 'react'
import ChatList from './ChatList'
import { SidebarInput } from './ChatInput'
import { useChatCompletion } from '../../../hooks/useChatCompletion'
import { SYSTEM_PROMPT } from '../../../config/prompts'
import { Settings } from '../../../config/settings'
import { getWebPageContent } from '../../../lib/getWebPageContent'

interface ChatProps {
  settings: Settings
}

const Chat = ({ settings }: ChatProps) => {
  const { messages, submitQuery, clearMessages, generating, cancelRequest } =
    useChatCompletion({
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
        submitQuery(
          prompt,
          settings.general.webpageContext ? getWebPageContent() : undefined,
        )
      }
    }
    window.addEventListener('message', handleWindowMessage)

    return () => {
      window.removeEventListener('message', handleWindowMessage)
    }
  }, [submitQuery, settings.general.webpageContext])

  return (
    <>
      <ChatList messages={messages} />
      <SidebarInput
        loading={generating}
        submitMessage={submitQuery}
        chatIsEmpty={messages.length <= 1}
        clearMessages={clearMessages}
        cancelRequest={cancelRequest}
      />
    </>
  )
}

export default Chat
