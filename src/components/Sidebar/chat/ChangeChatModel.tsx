import { BsRobot } from 'react-icons/bs'
import type { AvailableModels } from '../../../config/settings'
import { useChatModels } from '../../../hooks/useChatModels'
import { getReadableModelName } from '../../../lib/getReadableModelName'

const ChangeChatModel = () => {
  const { availableModels, activeChatModel, setActiveChatModel } =
    useChatModels()
  return (
    <div className="cdx-flex cdx-items-center cdx-gap-1 cdx-text-neutral-500 dark:cdx-bg-neutral-900 cdx-bg-neutral-200 cdx-border cdx-rounded-md cdx-border-neutral-400/30 dark:cdx-border-neutral-500/30 cdx-py-1 cdx-px-3">
      <BsRobot size={18} className="cdx-flex-shrink-0" />
      <select
        value={activeChatModel}
        className="cdx-bg-transparent !m-0 !p-0 cdx-box-border cdx-w-min focus:cdx-outline-none focus:cdx-ring-1"
        onChange={(e) => {
          setActiveChatModel(e.target.value as AvailableModels)
        }}
      >
        {availableModels.map(([model, value]) => (
          <option key={model} value={value}>
            {getReadableModelName(model)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChangeChatModel
