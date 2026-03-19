"use client";

import ArticleCard from "@/components/common/ArticleCard";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: number;
  user_id: string;
  user_name: string;
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
    <main className="p-6 bg-[#f0f9ff] min-h-screen"> 
      
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {loading ? (
          <p className="col-span-full text-center text-gray-400">データを読み込み中...</p>
        ) : articles.length > 0 ? (
          articles.map((article) => {
            const dateOnly = article.created_at ? article.created_at.split("T")[0] : "不明";

            return (
              <ArticleCard
                key={article.id}
                author={article.user_name || `ユーザー(ID:${article.user_id})` || "ゲスト"}
                date={dateOnly}
                reason={article.memo}
                url={article.url}
              />
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-400">記事がまだありません。</p>
        )}

      </section>
    </main>
  );
}