// API関数ここにまとめるページ

const BASE_URL = "http://localhost:8000";

export async function getPosts(token: string) {
  const res = await fetch(`${BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("取得失敗");

  return res.json();
}
