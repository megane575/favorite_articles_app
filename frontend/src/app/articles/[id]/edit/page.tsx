"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { getPosts, savePosts } from "@/lib/mockPosts";

export default function EditPage() {
  const params = useParams();
  const id = Number(params.id);

  const router = useRouter();

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  // 初期表示
  useEffect(() => {
    const posts = getPosts();
    const target = posts.find((p) => p.id === Number(id));

    if (target) {
      setUrl(target.url);
      setDescription(target.memo);
    }
  }, [id]);

  // 更新処理
  const handleUpdate = () => {
    const posts = getPosts();

    const updated = posts.map((p) =>
      p.id === Number(id) ? { ...p, url, memo: description } : p,
    );

    savePosts(updated);
    router.push("/mypage");
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">記事編集</h1>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleUpdate}>更新する</Button>
      </div>
    </main>
  );
}
