const BASE_URL = "http://localhost:8000";

// 自分の投稿取得
export async function getMyPosts(token: string) {
  const res = await fetch(`${BASE_URL}/my-posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("投稿取得失敗");
  }

  return res.json();
}

// 投稿削除
export async function deletePost(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("削除失敗");
  }
}
