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

    <div className="space-y-6">

      <div>
        <label htmlFor="email" className="block text-xs font-black text-slate-600 mb-2 ml-1 tracking-widest uppercase">
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
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all placeholder:text-slate-300"
      placeholder="example@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-black text-slate-600 mb-2 ml-1 tracking-widest uppercase">
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
          className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all placeholder:text-slate-300"
      placeholder="••••••••"
        />
      </div>

    </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="w-full px-6 py-3 bg-[#FFD700] hover:bg-[#FACC15] text-slate-800 text-sm font-black rounded-full shadow-[0_4px_0_0_#EAB308] active:shadow-none active:translate-y-[2px] transition-all tracking-widest uppercase mt-4"
      >
        ログイン
      </button>
    </form>
  );
}
