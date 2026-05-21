export type Post = {
  id: number;
  user_id: number;
  url: string;
  memo: string;
  created_at: string;
};

export const getPosts = (): Post[] => {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};
