import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAPI_KEY,
  organization: process.env.OPENAPI_ORG_ID,
});

export const useOpenAPI = openai.chat.completions.create;
