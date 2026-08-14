export type OpenAIConfig = {
  apiKey?: string;
  model: string;
  configured: boolean;
};

export function getOpenAIConfig(): OpenAIConfig {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  return {
    apiKey,
    model: process.env.OPENAI_MODEL?.trim() || "gpt-5-mini",
    configured: Boolean(apiKey),
  };
}
