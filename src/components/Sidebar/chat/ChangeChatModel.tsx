import type { AvailableModels } from '../../../config/settings'
import { useChatModels } from '../../../hooks/useChatModels'
import { capitalizeText } from '../../../lib/capitalizeText'

const ChangeChatModel = () => {
  const { availableModels, activeChatModel, setActiveChatModel } =
    useChatModels()
  return (
    <div className="cdx-flex cdx-gap-1 cdx-text-neutral-500  dark:cdx-bg-black/20 cdx-bg-black/10 cdx-border cdx-rounded-full cdx-border-neutral-400/30 dark:cdx-border-neutral-500/50 cdx-px-2 cdx-py-1">
      <span className="cdx-pl-1">Using</span>
      <select
        value={activeChatModel}
        className="cdx-bg-transparent cdx-underline cdx-decoration-dotted cdx-underline-offset-4 !m-0 !p-0 cdx-box-border"
        onChange={(e) => {
          setActiveChatModel(e.target.value as AvailableModels)
        }}
        style={{
          appearance: 'none',
          backgroundImage: 'none',
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
