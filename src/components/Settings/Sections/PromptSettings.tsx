import { HiRefresh } from 'react-icons/hi'
import { usePrompts } from '../../../hooks/usePrompts'
import { defaultPrompts } from '../../../config/prompts/default'
import FieldWrapper from '../Elements/FieldWrapper'
import QuickMenuCustomize from '../Elements/QuickMenuCustomize'
import SectionHeading from '../Elements/SectionHeading'

const PromptSettings = () => {
  const [, setPrompts] = usePrompts()

  return (
    <div className="cdx-w-full cdx-flex-shrink-0 cdx-flex-1 cdx-rounded-md">
      <SectionHeading title="Prompts" />

      {/* =========================
            Customize Prompts
      ===========================*/}
      <FieldWrapper
        title="Customize Prompts"
        description="You can organize the prompts in the quick menu by dragging these items around. You can also edit the prompts by clicking on the edit button and adding new prompts by clicking on the add button."
      >
        <QuickMenuCustomize />
      </FieldWrapper>

      {/* =========================
          Restore Default Prompts
      ===========================*/}
      <FieldWrapper
        title="Restore Default Prompts"
        description="This will restore the default prompts. Be careful, this action cannot be undone. And any custom prompts you have added will be lost."
        row
      >
        <button
          type="button"
          className="btn cdx-bg-red-500 hover:cdx-bg-red-600"
          onClick={() => {
            setPrompts(defaultPrompts)
          }}
        >
          <HiRefresh /> Restore
        </button>
      </FieldWrapper>
    </div>
  )
}

export default PromptSettings
