
import { GoogleGenAI } from "@google/genai";

export const getExamInsights = async (examName: string) => {
  try {
    // API key process.env.API_KEY orqali olinadi. 
    // GoogleGenAI obyektini funksiya ichida yaratish muhit tayyor bo'lgunga qadar kutishga yordam beradi.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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