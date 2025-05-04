# ニュース理解支援 App

テキストを入力し、NEWS API で記事内容を取得した後、Gemini API を用いてわかりやすく要約・変換し、画面に表示するアプリです。

---

## 機能概要

- 入力したテキストやニュース記事を NEWS API 経由で取得
- Gemini API を使い、記事内容をわかりやすく要約・変換
- 要約結果を画面に表示

---

## 必要環境

- Node.js（推奨バージョン: 18 以上）
- npm

---

## インストール・起動方法

1. 依存パッケージのインストール

   ```
   npm install
   ```

2. 開発サーバの起動

   ```
   npm run dev
   ```

3. ブラウザで URL にアクセス

---

## 環境変数・API キー設定

- NEWS API の API キー
- Gemini API の API キー

API キーは `.env` ファイルに設定してください。  
（例）

```
VITE_NEWS_API_KEY=your_news_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 使い方

1. アプリを起動
2. 知りたいテキストを入力
3. 「検索」ボタンをクリック
4. Gemini API による分かりやすい要約結果が画面に表示されます

---

## 開発メモ

- Gemini API は Google Cloud の Vertex AI や Google AI Studio で利用できます。
- NEWS API から取得した記事本文を Gemini API に渡して要約します。

---

## ライセンス

MIT License

---

## 補足

- Gemini API の利用には Google Cloud プロジェクトの作成と API 有効化が必要です。
- NEWS API の利用には公式サイトでの API キー取得が必要です。

---

ご不明点やバグ報告は Issue でご連絡ください。
