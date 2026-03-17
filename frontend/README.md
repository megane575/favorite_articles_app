# Frontend

この記事共有アプリのフロントエンドです。  
Next.js を使用して UI を構築し、FastAPI のバックエンドと通信します。

---

# 技術構成

| 技術 | 用途 |
|-----|-----|
| Next.js | フロントエンドフレームワーク |
| TypeScript | 型安全 |
| TailwindCSS | UIスタイリング |
| JWT | 認証 |
| Fetch API | FastAPIとの通信 |

---

# アプリ概要

ユーザーがおすすめ記事を投稿・管理できるアプリです。

主な機能

- 記事一覧表示
- ログイン
- マイページ表示
- 記事投稿
- 記事編集
- 記事削除

---

# 画面構成

| URL | 内容 |
|----|----|
| `/` | トップページ（記事一覧） |
| `/login` | ログイン |
| `/mypage` | 自分の投稿一覧 |
| `/articles/new` | 記事投稿 |
| `/articles/[id]/edit` | 記事編集 |

---

# ディレクトリ構成


src/
├ components/
│ ├ common/ ← [A担当] ボタンやカードなどの共通パーツ
│ └ features/ ← [B担当] 登録フォームや編集ロジック
│
├ app/ ← [A担当メイン] 画面のルーティング
│ ├ login/ ← A担当
│ ├ mypage/ ← B担当
│ └ articles/ ← B担当（登録・編集）
│
└ types/ ← [B担当] API型定義


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
- テスト

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

# バックエンド

バックエンドは FastAPI で実装されています。

使用技術

- FastAPI
- SQLAlchemy
- MySQL
- Docker

フロントはAPI経由で通信します。

---

# 今後の改善

- UIの改善
- エラーハンドリング強化
- テスト追加
