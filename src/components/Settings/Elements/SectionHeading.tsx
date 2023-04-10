import React from 'react'

const SectionHeading = ({ title }: { title: string }) => {
  return (
    <h2 className='cdx-text-2xl cdx-uppercase cdx-font-bold cdx-mb-5 cdx-text-neutral-200 cdx-bg-neutral-700 cdx-rounded-lg cdx-p-4 cdx-shadow-lg'>
      {title}
    </h2>
  )
}

export default SectionHeading
