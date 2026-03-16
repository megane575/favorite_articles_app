# 📚 お気に入り記事共有アプリ

## 🧩 アプリ概要

お気に入りの記事URLを投稿・共有できるWebアプリです。  
ログインしたユーザーのみ記事の登録・編集・削除が可能です。  
トップページは未ログインでも閲覧可能です。

※新規登録機能は実装せず、あらかじめ用意されたユーザーでログインします。

---

## 👥 想定開発体制

- 開発期間：3日
- 開発人数：4名
- チーム開発未経験・初学者想定
- フロントエンド / バックエンド分業

---

## 🛠 使用技術

### フロントエンド

- Next.js

### バックエンド

- FastAPI
- SQLAlchemy

### データベース

- MySQL

### 開発環境

- Docker（Backend + DB）
- Frontendはローカル実行

---

## ✨ 機能一覧

### 認証

- ログイン機能（初期ユーザーのみ）

### 記事管理（ログイン必須）

- 記事一覧表示
- 記事登録
- 記事編集
- 記事削除

### 公開ページ

- トップページ（誰でも閲覧可能）

---

## 🗄 データベース設計（簡易）

### users

| カラム   | 型     | 説明           |
| -------- | ------ | -------------- |
| id       | int    | ユーザーID     |
| name     | string | ユーザー名     |
| email    | string | メールアドレス |
| password | string | パスワード     |

### articles

| カラム     | 型        | 説明         |
| ---------- | --------- | ------------ |
| id         | int       | 記事ID       |
| user_id    | int       | 投稿者ID     |
| url        | string    | 記事URL      |
| memo 　    | string 　 | おすすめ理由 |
| created_at | datetime  | 投稿日       |

---

## 🔌 API一覧

- `POST /login`
- `GET /articles`
- `POST /articles`
- `PUT /articles/{id}`
- `DELETE /articles/{id}`

---

## 📅 開発スケジュール（3日）

### DAY1：設計 + 環境構築

#### 全員

- 要件確定
- DB設計
- API設計
- 役割分担

#### 環境構築

- Docker構築（FastAPI + MySQL）
- Next.js環境構築

#### Backend

- SQLAlchemyモデル作成
- 初期データ投入
- ログインAPI作成

#### Frontend

- UI作成（ダミーデータ）
- コンポーネント設計

---

### DAY2：機能実装

#### Backend

- 記事CRUD API実装
- 認証ミドルウェア
- CORS対応

#### Frontend

- API接続
- CRUD機能実装
- token管理

---

### DAY3：調整・完成

#### Backend

- バグ修正
- ログ整備

#### Frontend

- UX改善
- デザイン調整

#### 全員

- 結合テスト
- 発表準備

---

## ⚠️ 開発ルール

- DockerはDAY1で必ず完成させる
- フロントはAPI完成を待たずUIを作る
- 認証機能を最優先で実装する
- DAY3は新機能を追加しない
