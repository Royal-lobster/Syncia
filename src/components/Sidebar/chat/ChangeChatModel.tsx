import type { AvailableModels } from '../../../config/settings'
import { useChatModels } from '../../../hooks/useChatModels'
import { capitalizeText } from '../../../lib/capitalizeText'

const ChangeChatModel = () => {
  const { availableModels, activeChatModel, setActiveChatModel } =
    useChatModels()
  return (
    <div>
      <select
        value={activeChatModel}
        className="input cdx-w-44"
        onChange={(e) => {
          setActiveChatModel(e.target.value as AvailableModels)
        }}
      >
        {availableModels.map(([modal, value]) => (
          <option key={modal} value={value}>
            {capitalizeText(
              modal
                .toLowerCase()
                .replace('gpt', 'GPT')
                .replace('3_5', '3.5')
                .replaceAll('_', ' '),
            )}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChangeChatModel
