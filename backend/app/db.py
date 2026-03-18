import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

DATABASE_URL = os.getenv("DATABASE_URL") + "?charset=utf8mb4"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# DB接続を自動で閉じたり開いたりする便利な関数
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()