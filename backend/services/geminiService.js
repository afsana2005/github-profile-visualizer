import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

let aiClient;

function getAIClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Add it to backend/.env.");
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  return aiClient;
}

export async function generateAIResponse(prompt) {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-flash-latest",
    contents: prompt,
  });

  return response.text || "The AI returned an empty response.";
}
