import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

let genAI: GoogleGenAI | null = null;

export const initializeGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const streamChatResponse = async (
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  const ai = initializeGenAI();
  const model = 'gemini-3-flash-preview';

  // Convert internal history to GenAI format
  // We only send the last few messages to save context and tokens for this demo
  const historyLimit = 10;
  const recentHistory = history
    .slice(-historyLimit)
    .filter(msg => msg.role === 'user' || msg.role === 'model') // Filter out 'friend' roles
    .map(msg => ({
      role: msg.role as 'user' | 'model',
      parts: [{ text: msg.text || (msg.attachments?.length ? '[Attachment]' : '') }] // Handle empty text if attachment exists
    }));

  // Start a chat session
  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: "You are a romantic, helpful, and kind Valentine's Day themed AI assistant. Use heart emojis occasionally. Be supportive and engaging.",
    },
    history: recentHistory
  });

  try {
    const result = await chat.sendMessageStream({ message: newMessage });
    
    let fullText = '';
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      const text = c.text || '';
      fullText += text;
      onChunk(fullText);
    }
    return fullText;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};