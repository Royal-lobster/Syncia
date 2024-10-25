import React from 'react'

const SectionHeading = ({ title }: { title: string }) => {
  return (
    <h2 className="cdx-text-3xl dark:cdx-border-neutral-700 cdx-border-b cdx-mb-5 cdx-text-neutral-700  dark:cdx-text-neutral-200 cdx-py-4">
      {title}
    </h2>
  )
}

export default SectionHeading
