import { useCallback, useEffect, useState } from 'react'
import { useSettings } from './useSettings'
import axios from 'axios'
import type { ModelInfo } from '../config/settings'

export const useChatModels = () => {
  const [settings, setSettings] = useSettings()
  const [models, setModels] = useState<ModelInfo[]>([])
  const chatSettings = settings.chat
  const activeChatModel = chatSettings.model

  const fetchAvailableModels = useCallback(async () => {
    if (chatSettings.openAIKey) {
      try {
        const baseUrl =
          chatSettings.openAiBaseUrl || 'https://api.openai.com/v1'
        const { data } = await axios.get(`${baseUrl}/models`, {
          headers: {
            Authorization: `Bearer ${chatSettings.openAIKey}`,
          },
        })

        // Filter for chat-capable models
        const chatModels = data.data.filter(
          (model: ModelInfo) => model.capabilities?.completion_chat === true,
        )

        setModels(chatModels)
      } catch (error) {
        console.log('Failed to fetch models:', error)
        setModels([])
      }
    }
  }, [chatSettings.openAIKey, chatSettings.openAiBaseUrl])

  useEffect(() => {
    fetchAvailableModels()
  }, [fetchAvailableModels])

  const setActiveChatModel = (model: ModelInfo) => {
    setSettings({
      ...settings,
      chat: {
        ...chatSettings,
        model,
      },
    })
  }

  return {
    models,
    activeChatModel,
    setActiveChatModel,
    fetchAvailableModels,
  }
}
