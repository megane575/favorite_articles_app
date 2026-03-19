//ログインAPIのリクエスト型
export type LoginRequest = {
  email: string;
  password: string;
};

//ログインAPIのレスポンス型（JWNトークンを受け取る）
export type LoginResponse = {
  access_token: string;
  token_type: string;
};

//ログインAPIを呼び出す関数
export const loginApi = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //ログイン情報をJSON式で送信
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  //console.log("login response status:", response.status);
  //console.log("login response data:", data);

  if (!response.ok) {
    throw new Error(data.detail || "ログインに失敗しました");
  }

  return data;
};