import axios from "axios";

const VERIFY_API_KEY_URL = "https://api.openai.com/v1/models";

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    await axios.get(VERIFY_API_KEY_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
