const BASE_URL = "http://localhost:8000";

export type CreatePostRequest = {
  url: string;
  memo: string;
};

export async function createPost(token: string, data: CreatePostRequest) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "投稿失敗");
  }

  return res.json();
}
