import { BsRobot } from 'react-icons/bs'
import { useChatModels } from '../../../hooks/useChatModels'

const ChangeChatModel = () => {
  const { models, activeChatModel, setActiveChatModel } = useChatModels()
  return (
    <div className="cdx-flex cdx-items-center cdx-gap-1 cdx-text-neutral-500 dark:cdx-bg-neutral-900 cdx-bg-neutral-200 cdx-border cdx-rounded-md cdx-border-neutral-400/30 dark:cdx-border-neutral-500/30 cdx-py-1 cdx-px-3">
      <BsRobot size={18} className="cdx-flex-shrink-0" />
      <select
        value={activeChatModel?.id || ''}
        className="cdx-bg-transparent !m-0 !p-0 cdx-box-border cdx-w-min focus:cdx-outline-none focus:cdx-ring-1"
        onChange={(e) => {
          const selectedModel = models.find((m) => m.id === e.target.value)
          if (selectedModel) {
            setActiveChatModel(selectedModel)
          }
        }}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChangeChatModel
