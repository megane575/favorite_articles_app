# Backend (FastAPI + MySQL) 環境構築・起動手順

このバックエンドは **FastAPI + SQLAlchemy + MySQL** を **Docker** で構築しています。

## 🔹 必要条件

- Docker / Docker Compose がインストールされていること
- macOS / Windows / Linux いずれでも可

---

### 1️⃣ Docker コンテナ起動

ターミナルで backend ディレクトリに移動：

```bash
cd /backend
```

初回ビルド & 起動：

```
docker-compose up --build
```

### 2️⃣ コンテナの確認

```
docker ps
```

### 3️⃣ FastAPI サーバー確認

下記のコマンドにアクセス

```
http://localhost:8000/
```

### 4️⃣ MySQL 接続確認

passwordはyml参照

```
docker compose exec -it backend_db mysql -u root -p articles_db
```

## ディレクトリ構成図

```
.
├── app
│   ├── __pycache__
│   └── main.py
├── docker-compose.yml
├── Dockerfile
├── README.md
└── requirements.txt
```

## Ruff規約
