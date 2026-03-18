from sqlalchemy import  text
import os
from fastapi import FastAPI, HTTPException, status
from passlib.context import CryptContext 
from pydantic import BaseModel

# DB接続用ライブラリ
import time
from sqlalchemy.exc import OperationalError
from db import engine
from models import Base
from seed import run_seed


# --- 設定と準備 ---

app = FastAPI(title="記事共有アプリ API")

# DBテーブル作成（起動時）
@app.on_event("startup")
def startup():
    for i in range(10):
        try:
            Base.metadata.create_all(bind=engine)
            print("DB 接続されました！！")

            run_seed()
            
            break
        except OperationalError:
            print("DB 接続中...")
            time.sleep(2)

# パスワードハッシュ化の設定
pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated="auto",
    bcrypt__ident="2b"
)

# ユーザーが送ってくるデータの形（型定義）
class LoginRequest(BaseModel):
    email: str
    password: str

# --- 共通関数 ---

def get_password_hash(password):
    """生のパスワードをハッシュ化する"""
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """パスワードが合っているか確認する"""
    return pwd_context.verify(plain_password, hashed_password)

# --- エンドポイント（窓口） ---

DATABASE_URL = os.getenv("DATABASE_URL")

@app.get("/")
# DB接続確認用
def root():
    return{"message":"API running"}

def read_root():
    return {"message": "APIは正常に起動しています！ /docs にアクセスしてね"}

@app.get("/posts")
def get_posts():
    return [
        {"id": 1, "url": "https://google.com", "description": "検索エンジンです"},
        {"id": 2, "url": "https://fastapi.tiangolo.com", "description": "FastAPIの公式サイト"}
    ]

@app.post("/login")
def login(request: LoginRequest):
    # 【テスト用】昨日の実行結果（$2b$12$...）をここに貼り付け
    dummy_hashed_password = "$2b$12$y2voiZNmujG/8TPD99vawerDaID7dbl/Ckt.f6RBA9o3Hp4S6oFqG" 

    # パスワード照合
    if not verify_password(request.password, dummy_hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="パスワードが違います"
        )

    return {"message": "ログイン成功！", "token": "fake-jwt-token"}
