"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { getPosts, savePosts } from "@/lib/mockPosts";

export default function NewArticlePage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = () => {
    if (!url || !memo) {
      alert("入力してください");
      return;
    }

    const newPost = {
      id: Date.now(),
      user_id: Number(userId), // 実際のアプリケーションでは、現在のユーザーIDに置き換える
      url,
      memo,
      created_at: new Date().toISOString(),
    };

    const posts = getPosts();
    savePosts([...posts, newPost]);

    router.push("/mypage");
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">記事投稿</h1>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="User ID"
          className="w-full border p-2 rounded"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

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
