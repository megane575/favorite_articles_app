"use client";

import ArticleCard from "@/components/common/ArticleCard";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: number;
  user_id: string;
  user_name?: string;
  created_at: string;
  memo: string;
  url: string;
}

export default function HomePage() {
  // 1. データを置くための「箱（State）」を用意
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. 画面が開いた時にバックエンドからデータを取ってくる
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts"); 
        const data = await response.json();
        setArticles(data); // 取ってきたデータを箱に入れる
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

  }, []);

  return (
    <main className="p-6 space-y-6">
    

      {/* 投稿一覧 */}
      <section className="space-y-4">

        {loading ? (
          <p>データを読み込み中...</p>
        ) : articles.length > 0 ? (
          // 3. 配列の中身を一つずつ ArticleCard にして表示する
          articles.map((article) => {
            // 日付の "T" より前だけを取り出す
            const dateOnly = article.created_at ? article.created_at.split("T")[0] : "不明";

            return (
              <ArticleCard
                key={article.id}
                author={article.user_name || `ユーザー(${article.user_id})`}
                date={dateOnly}
                reason={article.memo}
                url={article.url}
              />
            );
          })
        ) : (
          <p>記事がまだありません。</p>
        )}

      </section>
    </main>
  );
}
