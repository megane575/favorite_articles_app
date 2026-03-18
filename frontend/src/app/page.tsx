"use client";

import ArticleCard from "@/components/common/ArticleCard";
import { useEffect, useState } from "react";
import { getPosts, Post } from "@/lib/mockPosts";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const data = getPosts();
    setPosts(data);
  }, []);

  return (
    <main className="p-6 space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">お気に入り記事共有アプリ</h1>
      </section>

      {/* 投稿一覧 */}
      <section className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border p-4 rounded">
            <p>投稿者：{post.user_id} </p>
            <p>
              {" "}
              投稿日:{" "}
              {new Date(post.created_at).toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p>{post.memo}</p>

            <a
              href={post.url}
              target="_blank"
              className="text-blue-600 underline"
            >
              {post.url}
            </a>
          </article>
        ))}
      </section>

      {/* サンプル記事 */}
      <section className="space-y-4">
        <ArticleCard
          author="Erika"
          date="2026-03-17"
          reason="Next.jsのルーティング理解に役立つため"
          url="https://nextjs.org/docs"
        />

        <ArticleCard
          author="Aさん"
          date="2026-03-16"
          reason="FastAPIとの連携イメージがつかみやすいため"
          url="https://fastapi.tiangolo.com/"
        />
      </section>
    </main>
  );
}
