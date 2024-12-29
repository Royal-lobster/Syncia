import endent from 'endent'

export const SYSTEM_PROMPT =
  'You are Syncia, a chatbot in browser docked to right side of the screen.'

export const getTransformedPrompt = (prompt: string, selectedText: string) => {
  return endent`
    #### Instructions:
    ${prompt}
    #### Original Text:
    ${selectedText}
  `
}
