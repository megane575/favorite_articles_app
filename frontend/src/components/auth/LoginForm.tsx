"use client";

import { useState } from "react";
import { loginApi } from "../../app/login/api-login";
//成功時に token を localStorage に保存して /mypage に遷移
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // JWT保存処理実装

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("① submit開始");
    setErrorMessage("");

    if (!email || !password) {
      //console.log("② 未入力でreturn");
      setErrorMessage("メールアドレスとパスワードを入力してください。");
      return;
    }

    try {
      //console.log("③ loginApi実行前", { email, password });

      const data = await loginApi({ email, password });//UIと認証処理担当

      //console.log("④ loginApi結果", data);

      //console.log("⑤ success分岐に入った");
      localStorage.setItem("token", data.access_token); // JWT保存
      //console.log("⑥ token保存後", localStorage.getItem("token"));

      router.push("/mypage");//UIと認証処理担当
      //console.log("⑦ push後");
    } catch (error) {
      //console.error("⑧ catchに入った", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("通信エラーが発生しました");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          メールアドレス
        </label>
        <input
          id="email"
          name="nope-email"
          type="email"
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          パスワード
        </label>
        <input
          id="password"
          name="nope-password"
          type="password"
          autoComplete="new-password"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="パスワードを入力"
        />
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:opacity-90"
      >
        ログイン
      </button>
    </form>
  );
}
