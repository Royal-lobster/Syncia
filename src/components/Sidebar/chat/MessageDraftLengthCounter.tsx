import React from 'react'

interface MessageDraftLengthCounterProps {
  length: number
  MAX_LENGTH: number
}
const MessageDraftLengthCounter = ({
  length,
  MAX_LENGTH,
}: MessageDraftLengthCounterProps) => {
  return (
    <div className="cdx-text-neutral-500">
      <span>{length.toLocaleString()}</span>/
      <span>{MAX_LENGTH.toLocaleString()}</span>
    </div>
  )
}

export default MessageDraftLengthCounter
