export const validateApiKey = async (
  openAIApiKey: string,
  baseURL: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${baseURL || 'https://api.openai.com/v1'}/models`,
      {
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response.status === 200
  } catch (e) {
    console.error(e)
    return false
  }
}
