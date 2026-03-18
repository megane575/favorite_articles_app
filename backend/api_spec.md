# 記事共有アプリ API仕様書

## 共通設定
- **ベースURL:** `http://localhost:8000`
- **データ形式:** JSON

## 1. 投稿関連

### 記事一覧取得
全てのユーザーが投稿した記事を取得します。
- **メソッド:** `GET`
- **エンドポイント:** `/posts`
- **レスポンス例:**
  ```json
  [
    {
      "id": 1,
      "url": "[https://example.com](https://example.com)",
      "memo": "この記事は参考になります！",
      "username": "tanaka",
      "created_at": "2024-05-20T10:00:00"
    }
  ]

### 新規投稿
URLとおすすめ理由を投稿します（要ログイン）。
- **メソッド:** `POST`
- **エンドポイント:** `/posts`
- **リクエストボディ:**
  ```json
  [
    {
      "url": "[https://example.com](https://example.com)",
      "memo": "おすすめの理由"
    }
  ]

### 投稿削除
自分の投稿を削除します。
- **メソッド:** `DELETE`
- **エンドポイント:** `/posts/{post_id}`

## 2. 認証関連

### ユーザー登録
- **メソッド:** `POST`
- **エンドポイント:** `/signup`
- **リクエストボディ:**
  ```json
  [
    {
      "username": "yourname",
      "password": "yourpassword"
    }
  ]

### ログイン
- **メソッド:** `POST`
- **エンドポイント:** `/login`
- **レスポンス:**トークンを返却します。