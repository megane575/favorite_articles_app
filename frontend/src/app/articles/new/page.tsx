"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { createPost } from "./api-new";
import Link from "next/link";

export default function NewArticlePage() {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = async () => {
    if (!url || !memo) {
      alert("入力してください");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("TOKEN", token);

    if (!token) {
      alert("ログインしてください");
      router.push("/login");
      return;
    }

    try {
      await createPost(token, { url, memo });
      router.push("/mypage");
    } catch (error) {
      console.error(error);
      alert("投稿失敗");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF0] p-6 flex flex-col items-center">
      <div className="w-full max-w-xl">

      <div className="mb-8 text-center">
          <span className="text-3xl">📝</span>
          <h1 className="text-2xl font-black text-slate-700 mt-2 tracking-tight">記事投稿</h1>
      </div>

      {/* フォームエリアを白背景のカードにする */}
        <div className="bg-white border border-yellow-100 p-8 rounded-[2.5rem] shadow-xl shadow-yellow-600/5 space-y-8">
          
          {/* オススメ理由入力 */}
          <div>
            <label className="block text-xs font-black text-slate-600 mb-2 ml-1 tracking-widest uppercase">
              お気に入りポイント 🪅
            </label>
            <textarea
              placeholder="なぜこの記事が好きなのか教えてください"
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all placeholder:text-slate-300 min-h-[120px] resize-none"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        {/* URL入力 */}
          <div>
            <label className="block text-xs font-black text-slate-600 mb-2 ml-1 tracking-widest uppercase">
              記事のURL
            </label>
            <input
              type="text"
              placeholder="https://example.com/..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all placeholder:text-slate-300"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

        <div className="pt-4">
            <Button onClick={handleSubmit} 
            className="w-full py-4 text-sm">
              この記事をシェアする</Button>
        </div>
        </div>
      </div>
    </main>
  );
}
