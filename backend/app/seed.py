from db import SessionLocal
from models import User, Article
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()

def hash_password(password):
    return pwd_context.hash(password)

def seed_users():
    users = [
        User(name="かみえり", email="kami@test.com", password=hash_password("password1")),
        User(name="かんちゃん", email="kan@test.com", password=hash_password("password2")),
        User(name="まゆ", email="mayu@test.com", password=hash_password("password3")),
        User(name="めがねママ", email="megane@test.com", password=hash_password("password4")),
    ]
    db.add_all(users)
    db.commit()

def seed_articles():
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

if __name__ == "__main__":
    seed_users()
    seed_articles()
    db.close()