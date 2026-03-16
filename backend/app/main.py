from fastapi import FastAPI
from passlib.context import CryptContext  # 1. 追加

# FastAPIの本体を作成
app = FastAPI(title="記事共有アプリ API")

# 2. パスワードをハッシュ化するための設定（app作成のすぐ下あたりがおすすめ）
pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated="auto",
    bcrypt__ident="2b"  # これを明示的に指定するとエラーが消えることが多いです
)

def get_password_hash(password):
    """生のパスワードを暗号化された文字列に変える関数"""
    return pwd_context.hash(password)

# --- ここから下の既存のコードはそのままでOK ---

# 1. 記事一覧取得の窓口
@app.get("/posts")
def get_posts():
    return [
        {"id": 1, "url": "https://google.com", "description": "検索エンジンです"},
        {"id": 2, "url": "https://fastapi.tiangolo.com", "description": "FastAPIの公式サイト"}
    ]

# 2. 正常起動の確認用
@app.get("/")
def read_root():
    return {"message": "APIは正常に起動しています！ /docs にアクセスしてね"}

# 3. 【実験用】パスワードが暗号化されるか確認する窓口
@app.get("/test-hash")
def test_hash(p: str):
    hashed = get_password_hash(p)
    return {
        "original": p,
        "hashed": hashed
    }