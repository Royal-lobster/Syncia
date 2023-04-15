import endent from 'endent'

export const SYSTEM_PROMPT = `You are ChatDock X, a chatbot in browser docked to right side of the screen.
    if you find [To bot] in the prompt, it means you should follow that point while generating answer but not as part of answer unless specified.
    Your knowledge is limited to year 2021.`

export const getTransformedPrompt = (prompt: string, selectedText: string) => {
  return endent`
    #### Instructions:
    ${prompt}
    #### Original Text:
    ${selectedText}
  `
}
