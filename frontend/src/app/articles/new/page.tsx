"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { createPost } from "./api-new";

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
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">記事投稿</h1>

      <div className="space-y-4">
        <textarea
          placeholder="おすすめ理由"
          className="w-full border p-2 rounded"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <input
          type="text"
          placeholder="記事URL"
          className="w-full border p-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button onClick={handleSubmit}>投稿する</Button>
      </div>
    </main>
  );
}
