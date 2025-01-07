import logo from '../../../lib/logo'
import { useChatModels } from '../../../hooks/useChatModels'

const ChangeChatModel = () => {
  const { models, activeChatModel, setActiveChatModel } = useChatModels()
  return (
    <div className="cdx-flex cdx-items-center cdx-gap-1 cdx-text-neutral-500 dark:cdx-bg-neutral-900 cdx-bg-neutral-200 cdx-border cdx-rounded-md cdx-border-neutral-400/30 dark:cdx-border-neutral-500/30 cdx-py-1 cdx-px-3">
      <img src={logo} className="cdx-w-5 cdx-h-5" />
      <select
        value={activeChatModel || ''}
        className="cdx-bg-transparent !m-0 !p-0 cdx-box-border cdx-w-min focus:cdx-outline-none focus:cdx-ring-1 cdx-max-w-[100px]"
        onChange={(e) => {
          setActiveChatModel(e.target.value)
        }}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChangeChatModel
