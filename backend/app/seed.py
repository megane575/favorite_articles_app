from db import SessionLocal
from models import User, Article
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def run_seed():
    db = SessionLocal()

    #すでにユーザーが入ればデータ流し込みしない
    if db.query(User).first():
        print("既にデータが存在するので中止しました")
        db.close()
        return

    users = [
        User(name="かみえり", email="kami@test.com", password=hash_password("password1")),
        User(name="かんちゃん", email="kan@test.com", password=hash_password("password2")),
        User(name="まゆ", email="mayu@test.com", password=hash_password("password3")),
        User(name="めがねママ", email="megane@test.com", password=hash_password("password4")),
    ]
    db.add_all(users)
    db.commit()

    articles = [
        Article(user_id=1, url="https://fastapi.tiangolo.com", memo="FastAPI公式"),
        Article(user_id=1, url="https://docs.sqlalchemy.org", memo="ORMの理解"),
        Article(user_id=2, url="https://nextjs.org", memo="Next.js公式"),
        Article(user_id=3, url="https://zenn.dev", memo="zenn記事サイト"),
        Article(user_id=3, url="https://note.com", memo="note記事サイト"),
        Article(user_id=3, url="https://qiita.com", memo="qiita記事サイト"),
    ]
    db.add_all(articles)
    db.commit()

    db.close()
    print("初期値データ流し込み完了")