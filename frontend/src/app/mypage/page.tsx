"use client";

import Link from "next/link";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { getPosts, savePosts, Post } from "@/lib/mockPosts";
// import { getPosts } from "@/lib/api";　//api繋げるまで一旦コメントアウト
// import { Post } from "@/types/article"; //api繋げるまで一旦コメントアウト
//ログアウト処理
// import { useRouter } from "next/navigation";

// 認証状態確認（仮）
// ログイン成功時に保存された JWT(token) を確認
// 今後ここで認証ガードを実装予定
export default function MyPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  // ダミーデータ
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     url: "https://example.com",
  //     memo: "Reactの勉強にめっちゃ良かった記事",
  //     username: "tanaka",
  //     created_at: "2024-01-01",
  //   },
  //   {
  //     id: 2,
  //     url: "https://nextjs.org",
  //     memo: "Next.js公式ドキュメント",
  //     username: "sato",
  //     created_at: "2024-01-02",
  //   },
  // ]);

  useEffect(() => {
    const data = getPosts();
    setPosts(data);
  }, []);

  const handleDelete = (id: number) => {
    const newPosts = posts.filter((p) => p.id !== id);
    savePosts(newPosts);
    setPosts(newPosts);
  };

  // かみえりさんのコード↓
  //ログアウト処理
  // const router = useRouter();

  // 一旦ダミーデータで表示のためコメントアウト
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     url: "https://example.com",
  //     description: "Reactの勉強にめっちゃ良かった記事",
  //     username: "tanaka",
  //     created_at: "2024-01-01",
  //   },
  //   {
  //     id: 2,
  //     url: "https://nextjs.org",
  //     description: "Next.js公式ドキュメント",
  //     username: "sato",
  //     created_at: "2024-01-02",
  //   },
  // ]);
  // // ここまで↑

  // 一旦ダミーデータで表示のためコメントアウト
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log("token:", token);

  //   if (!token) return;

  //   console.log("fetch開始");

  //   getPosts(token).then((data) => {
  //     console.log("posts:", data);
  //     setPosts(data);
  //   });
  // }, []);

  //認証状態確認（仮）localStorage に保存された JWT(token) を取得して確認
  // 今後は token が無い場合に /login へリダイレクトする認証ガードを実装予定
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token:", token);
  }, []);

  //ログアウト処理
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
