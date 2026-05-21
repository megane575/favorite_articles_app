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
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#FFFDF0] p-6">
      <div className="max-w-3xl mx-auto space-y-8">


      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-yellow-100 p-6 rounded-[2rem] shadow-xl shadow-yellow-600/5">
          <div>
            <h1 className="text-xl font-black text-slate-700 tracking-tight flex items-center gap-2">
              マイページ
            </h1>
          </div>

        <div className="flex gap-3">
            <Link href="/articles/new">
              <Button className="py-2 text-[10px]">記事を登録</Button>
          </Link>

          <button
            onClick={handleLogout}
            className="px-5 py-2 text-[10px] font-black text-slate-400 hover:text-rose-400 border-2 border-slate-100 hover:border-rose-100 rounded-full transition-all tracking-widest uppercase"
            >
            ログアウト
          </button>
        </div>
      </section>

      <section className="grid gap-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-[2rem] border-2 border-dashed border-yellow-200">
              <p className="text-slate-400 font-bold">まだ投稿がありません 🍌</p>
            </div>
          ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-yellow-100 p-6 rounded-[2.5rem] shadow-xl shadow-yellow-600/5 hover:translate-y-[-2px] transition-all group"
              >
           <div className="flex justify-between items-start mb-4">
      <div className="w-full">
        {/* URL部分：投稿者IDを消してスッキリさせました */}
        <h2 className="text-lg font-black text-slate-700 break-all hover:text-[#8C73FF] transition-colors leading-tight">
          <a 
            href={post.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
             {post.url}
          </a>
        </h2>
      </div>
    </div>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
      “ {post.memo} ”
    </p>

            {/* フッター部分：日付とアクションボタン */}
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
        {new Date(post.created_at).toLocaleDateString("ja-JP")} 投稿
      </span>
      
      <div className="flex gap-2">
        <Link href={`/articles/${post.id}/edit`}>
          <button className="px-4 py-1.5 text-[10px] font-black text-[#8C73FF] bg-[#8C73FF]/5 hover:bg-[#8C73FF]/10 rounded-full transition-all active:scale-95">
            編集
          </button>
        </Link>
        <button
          onClick={() => handleDelete(post.id)}
          className="px-4 py-1.5 text-[10px] font-black text-rose-400 bg-rose-50 hover:bg-rose-100 rounded-full transition-all active:scale-95"
        >
          削除
        </button>
      </div>
    </div>
  </article>
))
)}
        </section>
      </div> 
    </main>
  );
}