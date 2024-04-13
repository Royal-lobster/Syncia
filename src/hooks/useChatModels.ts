import { useCallback, useEffect, useState } from 'react'
import { useSettings } from './useSettings'
import axios from 'axios'
import { AvailableModels } from '../config/settings'

export const useChatModels = () => {
  const [settings, setSettings] = useSettings()
  const [dynamicModels, setDynamicModels] = useState<string[]>([])
  const chatSettings = settings.chat
  const activeChatModel = chatSettings.modal

  const fetchLocalModels = useCallback(async () => {
    if (chatSettings.showLocalModels) {
      const {
        data: { models },
      } = await axios<{ models: { name: string }[] }>(
        'http://localhost:11434/api/tags',
      )
      if (models) {
        setDynamicModels(models.map((m) => m.name))
      }
    } else {
      setDynamicModels([])
    }
  }, [chatSettings.showLocalModels])

  useEffect(() => {
    fetchLocalModels()
  }, [fetchLocalModels])

  const availableModels = [
    ...Object.entries(AvailableModels),
    ...dynamicModels.map((m) => [m, m]),
  ]

  const setActiveChatModel = (model: AvailableModels) => {
    setSettings({
      ...settings,
      chat: {
        ...chatSettings,
        modal: model,
      },
    })
  }

  return {
    availableModels,
    activeChatModel,
    setActiveChatModel,
    fetchLocalModels,
  }
}
