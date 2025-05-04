import { useState } from "react";
import "./App.css";
import { News } from "./domain";
import { useAPI } from "./api";

function App() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState<News | null>(null);
  const { fetchNews, listenGemini } = useAPI();

  // 検索
  const handleSearch = async () => {
    setLoading(true);

    // ニュース取得
    const fetchedNews = await fetchNews(inputText);
    // 取得したニュースを基にGeminiに読み込ませる
    const news = await listenGemini(fetchedNews);

    // 設定
    setNewsData(news);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">ニュース理解支援App</h1>
          <p className="text-slate-500">知りたいことを入力して、AIによる解説を確認できます</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ニュースのURLを入力してください"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={!inputText || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            検索
          </button>
        </div>

        {loading ? (
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        ) : newsData ? (
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 border-b p-6">
              <h2 className="text-xl font-semibold">{newsData.title}</h2>
              <p className="text-sm text-slate-500">
                <a href={newsData.url} target="_blank" rel="noopener noreferrer">
                  元のニュース記事
                </a>
              </p>
            </div>

            <div className="p-6">
              <h3 className="font-medium text-lg mb-2">ニュース内容</h3>
              <p className="mb-8 text-slate-700">{newsData.description}</p>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">AIによる解説</h3>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-slate-700">{newsData.geminiDescription}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t p-4 text-sm text-slate-500">
              AIによる解説は参考情報です。正確性を保証するものではありません。
            </div>
          </div>
        ) : (
          <div className="text-center p-12 border rounded-lg bg-white">
            <p className="text-slate-500">知りたいことを入力して、検索ボタンを押してください！</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
