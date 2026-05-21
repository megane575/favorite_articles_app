# Frontend

この記事共有アプリのフロントエンドです。  
Next.js を使用して UI を構築し、FastAPI のバックエンドと通信します。

---

# 画面構成

| URL                | 内容                     |
| ------------------ | ------------------------ |
| `/`                | トップページ（記事一覧） |
| `/login`           | ログイン                 |
| `/my-posts`        | 自分の投稿一覧           |
| `/posts`           | 記事投稿                 |
| `/posts/{post_id}` | 記事編集                 |

---

# ディレクトリ構成

.
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│ ├── file.svg
│ ├── globe.svg
│ ├── next.svg
│ ├── vercel.svg
│ └── window.svg
├── README.md
├── src
│ ├── app
│ ├── components
│ ├── lib
│ └── types
└── tsconfig.json

---

# 認証

認証には **JWT (JSON Web Token)** を使用します。

ログイン成功時

POST /login

FastAPIから返却される

token

をフロント側で保存します。

保存先

localStorage

APIリクエスト時

Authorization: Bearer token

をヘッダーに付与します。

---

# フロント担当

## フロントA

担当

- 環境構築
- 共通UI
- 認証

作業内容

- Next.js + Tailwind セットアップ
- Header / Footer / Button / ArticleCard
- ルーティング
- ログイン画面
- JWT保存
- 認証ガード
- ログアウト処理

---

## フロントB

担当

- 管理画面
- CRUD機能
- 型定義

作業内容

- mypage画面
- 記事投稿 (POST)
- 記事編集 (PUT)
- 記事削除 (DELETE)
- 入力バリデーション
- API型定義 (types)

---

# 開発環境

依存関係インストール

npm install

開発サーバー起動

npm run dev

アクセス

http://localhost:3000

---

# 今後の改善

- UIの改善
- エラーハンドリング強化
- テスト追加
- API関数をまとめて呼び出す
- APIエンドポイントの環境変数の設定
