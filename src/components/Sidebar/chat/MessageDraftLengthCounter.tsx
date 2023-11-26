import React from 'react'

interface MessageDraftlengthCounterProps {
  length: number
  MAX_LENGTH: number
}
const MessageDraftLengthCounter = ({
  length,
  MAX_LENGTH,
}: MessageDraftlengthCounterProps) => {
  return (
    <div className="cdx-text-neutral-500">
      <span>{length.toLocaleString()}</span>/
      <span>{MAX_LENGTH.toLocaleString()}</span>
    </div>
  )
}

export default MessageDraftLengthCounter
