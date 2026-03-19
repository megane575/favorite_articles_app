"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { getMyPosts, deletePost } from "./api-mypage";
import { useRouter } from "next/navigation";
import { Post } from "@/types/article";

export default function MyPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  // 投稿取得
  const fetchPosts = async (token: string) => {
    try {
      const data = await getMyPosts(token);
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 認証ガード
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    (async () => {
      try {
        const data = await getMyPosts(token);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // 削除処理
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await deletePost(id, token);

      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました");
    }
  };

  // ログアウト
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <main className="p-6 space-y-6">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">mypage</h1>

        <div className="flex gap-3">
          <Link href="/articles/new">
            <Button>記事登録</Button>
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:opacity-90"
          >
            ログアウト
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded p-4 shadow-sm space-y-2"
          >
            <p className="text-sm text-gray-500">投稿者:{post.user_id}</p>
            <p className="text-sm text-gray-400">
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
            <p className="font-bold">{post.url}</p>

            <div className="flex gap-3">
              <Link href={`/articles/${post.id}/edit`}>
                <Button>編集</Button>
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:opacity-90"
              >
                削除
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
