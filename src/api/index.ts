import { GoogleGenerativeAI } from "@google/generative-ai";
import { News } from "../domain";

// geminiの事前設定
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// gemini問い合わせ
const _listenGemini = async (description: string) => {
  const prompt = `次の文章を日本語にして、小学生がわかるように変更してください。\n${description}`;
  const result = await model.generateContent(prompt);
  const res = await result.response;
  return res.text();
};

export const useAPI = () => {
  // ニュース取得
  const fetchNews = async (inputText: string) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${inputText}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
    );
    const data = await res.json();

    // 最初のデータを取得
    const firstNews = data.articles[0];
    const { title, description, url } = firstNews;

    // geminiの変換結果を取得
    const geminiDescription = await _listenGemini(description);

    return new News(title, description, url, geminiDescription);
  };

  return { fetchNews };
};
