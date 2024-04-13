import type React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { HiX } from 'react-icons/hi'

interface DialogPortalProps {
  title: string
  children: React.ReactNode
  primaryAction?: () => void
  secondaryAction?: () => void
  primaryText?: string
  secondaryText?: string
}

const DialogPortal = ({
  title,
  children,
  primaryAction,
  secondaryAction,
  primaryText,
  secondaryText,
}: DialogPortalProps) => (
  <Dialog.Portal>
    <Dialog.Overlay className="cdx-bg-black/50 data-[state=open]:cdx-animate-overlayShow cdx-fixed cdx-inset-0" />
    <Dialog.Content className="data-[state=open]:cdx-animate-contentShow cdx-fixed cdx-top-[50%] cdx-left-[50%] cdx-max-h-[85vh] cdx-w-[90vw] cdx-max-w-[450px] cdx-translate-x-[-50%] cdx-translate-y-[-50%] cdx-bg-neutral-100 dark:cdx-bg-neutral-800 cdx-p-[25px] cdx-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:cdx-outline-none cdx-rounded-md">
      <Dialog.Title className="cdx-text-2xl cdx-m-0 cdx-mb-4 cdx-border-b cdx-border-b-neutral-500/20 cdx-pb-4">
        {title}
      </Dialog.Title>
      <div className="cdx-text-base">{children}</div>
      <div className="cdx-flex cdx-gap-3 cdx-justify-end cdx-mt-4">
        {secondaryAction && (
          <button
            type="button"
            className="cdx-text-neutral-400 hover:cdx-text-neutral-300 cdx-px-4 cdx-py-2 cdx-rounded-sm cdx-bg-neutral-100 dark:cdx-bg-neutral-600 hover:cdx-bg-neutral-200 focus:cdx-bg-neutral-200 focus:cdx-outline-none"
            onClick={secondaryAction}
          >
            {secondaryText || 'Cancel'}
          </button>
        )}
        {primaryAction && (
          <button
            type="button"
            className="cdx-text-white cdx-px-4 cdx-py-2 cdx-rounded-sm cdx-text-sm cdx-bg-blue-500 hover:cdx-bg-blue-600 focus:cdx-bg-blue-600 focus:cdx-outline-none"
            onClick={primaryAction}
          >
            {primaryText || 'Save'}
          </button>
        )}
      </div>
      <Dialog.Close asChild>
        <button
          type="button"
          className="cdx-text-neutral-500 hover:cdx-text-neutral-400 cdx-absolute cdx-top-7 cdx-right-7 cdx-inline-flex cdx-h-[25px] cdx-w-[25px] cdx-appearance-none cdx-items-center cdx-justify-center focus:cdx-outline-none"
          aria-label="Close"
        >
          <HiX size={18} />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
)

export default DialogPortal
