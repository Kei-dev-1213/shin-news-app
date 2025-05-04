import { GoogleGenerativeAI } from "@google/generative-ai";
import { News } from "../domain";

export const useAPI = () => {
  // キー情報
  const VITE_NEWS_API_KEY = "b3f26b82433b49978da7f07f3d2a5383";
  const VITE_GEMINI_API_KEY = "AIzaSyDzHGDwxb8Nakjq_rlp2qvTl3mVwArofmU";

  // geminiの事前設定
  const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // ニュース取得
  const fetchNews = async (inputText: string) => {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${inputText}&apiKey=${VITE_NEWS_API_KEY}`);
    const data = await res.json();

    // 最初のデータを取得
    const firstNews = data.articles[0];
    const { title, description, url } = firstNews;

    return new News(title, description, url, "");
  };

  // gemini問い合わせ
  const listenGemini = async (news: News) => {
    // geminiへの問い合わせ
    const prompt = `次の文章を日本語にして、小学生がわかるように変更してください。\n${news.description}`;
    const result = await model.generateContent(prompt);
    const res = await result.response;
    news.geminiDescription = res.text();
    return news;
  };

  return { fetchNews, listenGemini };
};
