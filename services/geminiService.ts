import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: The API key is injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Constants for models
const CHAT_MODEL = 'gemini-3-flash-preview';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

/**
 * Creates a chat session for the community assistant.
 */
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: CHAT_MODEL,
    config: {
      systemInstruction: `You are "BiggsBot", the official AI hype-man and assistant for The W Club Biggs ($TWCB) community. 
      
      Key Traits:
      - You are enthusiastic, knowledgeable about crypto (specifically Solana and NFTs).
      - You often use terms like "W", "L", "HODL", "Moon", "Based".
      - You know that $TWCB is on Solana and Base.
      - You encourage community vibes.
      - Keep responses concise and engaging.`,
      temperature: 0.8,
    },
  });
};

/**
 * Sends a message to the chat model and returns a stream.
 */
export const sendMessageStream = async (chat: Chat, message: string) => {
  return await chat.sendMessageStream({ message });
};

/**
 * Generates art for the club based on a prompt.
 */
export const generateClubArt = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        // Construct the data URL for the image
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Art generation failed:", error);
    return null;
  }
};