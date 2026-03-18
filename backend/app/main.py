
from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy import  text
import os
from passlib.context import CryptContext 
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db import get_db, engine
import models 
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from jose import jwt
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

# 秘密鍵（何でも良い）
SECRET_KEY = "your-secret-key-share-with-partner"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 # 1時間有効

# DB接続用ライブラリ
import time
from sqlalchemy.exc import OperationalError
from db import engine
from models import Base
from seed import run_seed


# --- 設定と準備 ---

app = FastAPI(title="記事共有アプリ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 本番はURLを指定しますが、開発中は "*" で全て許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# 記事を投稿する時のデータの形
class ArticleCreate(BaseModel):
    url: str
    memo: str

# --- 共通関数 ---

def get_password_hash(password):
    """生のパスワードをハッシュ化する"""
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """パスワードが合っているか確認する"""
    return pwd_context.verify(plain_password, hashed_password)

    # トークンを作る関数
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ログインの口を指定する設定（/docsの画面で右上にAuthorizeボタンが出ます）
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    """通行証（トークン）が正しいかチェックし、中身を読み取るガードマン"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="有効な通行証が必要です",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # トークンを解読する
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        return user_id # 誰のトークンか、IDを返す
    except JWTError:
        raise credentials_exception

# --- エンドポイント（窓口） ---

DATABASE_URL = os.getenv("DATABASE_URL")

@app.get("/")
# DB接続確認用
def root():
    return{"message":"API running"}

# 1. 記事一覧を取得する (Read)
@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    # SQL: SELECT * FROM articles; を実行するのと同じ意味
    articles = db.query(models.Article).all()
    return articles

# 2. 記事を新しく投稿する (ガードマン設置版)
@app.post("/posts")
def create_post(
    post: ArticleCreate, 
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user) # ← ここを追加！
):
    # user_id=1 だったところを、トークンから取った ID に変える
    new_article = models.Article(
        url=post.url, 
        memo=post.memo, 
        user_id=current_user_id 
    )
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return new_article

# 3. 記事を削除する (Delete)
@app.delete("/posts/{post_id}")
def delete_post(
    post_id: int, 
    db: Session = Depends(get_db), 
    current_user_id: int = Depends(get_current_user) # ガードマン追加
):
    # 記事を探す
    target = db.query(models.Article).filter(models.Article.id == post_id).first()
    
    if not target:
        raise HTTPException(status_code=404, detail="記事が見つかりません")
    
    # 投稿者本人かチェック
    if target.user_id != current_user_id:
        raise HTTPException(status_code=403, detail="自分の投稿以外は削除できません")
    
    db.delete(target)
    db.commit()
    return {"message": f"ID:{post_id} の記事を削除しました"}

@app.put("/posts/{post_id}")
def update_post(
    post_id: int, 
    article: ArticleCreate, 
    db: Session = Depends(get_db), 
    current_user_id: int = Depends(get_current_user) # ガードマン追加
):
    db_article = db.query(models.Article).filter(models.Article.id == post_id).first()
    
    if not db_article:
        raise HTTPException(status_code=404, detail="記事が見つかりません")
        
    # 投稿者本人かチェック
    if db_article.user_id != current_user_id:
        raise HTTPException(status_code=403, detail="自分の投稿以外は更新できません")
    
    db_article.url = article.url
    db_article.memo = article.memo
    
    db.commit()
    db.refresh(db_article)
    return db_article

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="認証失敗")

    # 本物のJWTを発行！
    access_token = create_access_token(data={"sub": user.email, "user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

