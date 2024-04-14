import { capitalizeText } from './capitalizeText'

export const getReadableModelName = (model: string) => {
  return capitalizeText(
    model
      .toLowerCase()
      .replace('gpt', 'GPT')
      .replace(/(\d+)_(\d+)/, '$1.$2')
      .replace(/[_:]/g, ' '),
  )
}
