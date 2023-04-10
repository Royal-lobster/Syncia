import React from 'react'

interface FieldWrapperProps {
  title: string
  children: React.ReactNode
  row?: boolean
  description?: string
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

const FieldWrapper = ({
  title,
  description,
  children,
  row,
  onSubmit,
}: FieldWrapperProps) => {
  return (
    <form
      data-row={row || undefined}
      className='cdx-flex cdx-flex-col cdx-p-3 cdx-gap-1 data-[row]:cdx-items-center cdx-my-4 data-[row]:cdx-flex-row data-[row]:cdx-justify-between data-[row]:cdx-gap-2'
      onSubmit={onSubmit}
    >
      <div>
        <label className='cdx-text-xl cdx-text-neutral-200 cdx-font-bold'>
          {title}
        </label>
        {description && (
          <p className='cdx-text-sm cdx-mt-2 cdx-text-neutral-400'>
            {description}
          </p>
        )}
      </div>
      <div className='cdx-mt-2'>{children}</div>
    </form>
  )
}

export default FieldWrapper
