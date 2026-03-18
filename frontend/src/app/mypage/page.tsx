"use client";

// import { ROUTES } from "@/constants/routes";

import Link from "next/link";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { getPosts, savePosts } from "@/lib/mockPosts";
import { Post } from "@/types/article";
import { useRouter } from "next/navigation";

// 認証状態確認（仮）
// ログイン成功時に保存された JWT(token) を確認
// 今後ここで認証ガードを実装予定
export default function MyPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    const data = getPosts();
    setPosts(data);
  }, []);

  const handleDelete = (id: number) => {
    const newPosts = posts.filter((p) => p.id !== id);
    savePosts(newPosts);
    setPosts(newPosts);
  };

  // ログアウト処理
  // localStorage から token を削除してログイン画面へ戻す
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <main className="p-6 space-y-6">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">mypage</h1>

        <div className="flex gap-3">
          {/* URLを直接指定の書き方 */}
          <Link href="/articles/new">
            {/* routes.ts を使用した書き方
            <Link href={ROUTES.newArticle}> */}
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
