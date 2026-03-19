"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { getPost, updatePost } from "./api-edit";

export default function EditPage() {
  const params = useParams();
  const id = Number(params.id);

  const router = useRouter();

  const [memo, setMemo] = useState("");
  const [url, setUrl] = useState("");

  // ユーザー認証確認
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getPost(id, token).then((data) => {
      setUrl(data.url);
      setMemo(data.memo);
    });
  }, [id]);

  // 更新処理
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await updatePost(id, url, memo, token);
      router.push("/mypage");
    } catch (error) {
      console.error(error);
      alert("更新に失敗しました");
    }
  };

  return (
　　<main className="min-h-screen bg-[#FFFDF0] p-6 flex flex-col items-center">
      <div className="w-full max-w-xl">

    {/* 見出し部分 */}
        <div className="mb-8 text-center">
          <span className="text-3xl">✏️</span>
          <h1 className="text-2xl font-black text-slate-700 mt-2 tracking-tight">記事を編集</h1>
        </div>

    <div className="bg-white border border-yellow-100 p-8 rounded-[2.5rem] shadow-xl shadow-yellow-600/5 space-y-8">

      {/* URL入力 */}
          <div>
            <label className="block text-xs font-black text-slate-600 mb-2 ml-1 tracking-widest uppercase">
              記事のURL
            </label>
            <input
              type="text"
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

        {/* お気に入りポイント */}
          <div>
            <label className="block text-xs font-black text-slate-600 mb-2 ml-1 tracking-widest uppercase">
              お気に入りポイントを修正 🪅
            </label>
            <textarea
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all placeholder:text-slate-300 min-h-[120px] resize-none"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

      <div className="pt-4 space-y-3">
        <Button onClick={handleUpdate} className="w-full py-4 text-sm">
          更新する</Button>
      </div>
      </div>
      </div>
    </main>
  );
}
