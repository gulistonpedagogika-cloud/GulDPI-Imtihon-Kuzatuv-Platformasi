
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExamInsights = async (examName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berilgan imtihon nomi: "${examName}". Ushbu imtihon uchun 2 ta qisqa va foydali maslahat bering (o'zbek tilida). Maksimal 150 ta belgi.`,
    });
    return response.text || "Imtihonda muvaffaqiyat tilaymiz!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bilim - bu kuch. Imtihonga tayyorlaning!";
  }
};
