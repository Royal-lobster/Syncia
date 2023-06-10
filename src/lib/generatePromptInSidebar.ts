import { getTransformedPrompt } from '../prompts'

export const generatePromptInSidebar = (
  prompt: string,
  selectedText: string,
) => {
  const fullPrompt = getTransformedPrompt(prompt, selectedText)
  const sideBarIframe = document.getElementById(
    'syncia_sidebar',
  ) as HTMLIFrameElement
  if (sideBarIframe.style.width === '0px') {
    sideBarIframe.style.width = '400px'
  }
  sideBarIframe.contentWindow?.postMessage(
    {
      action: 'generate',
      prompt: fullPrompt,
    },
    '*',
  )
}
