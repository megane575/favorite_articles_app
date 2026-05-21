import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* ロゴやタイトル部分：ヘッダーの雰囲気を継承 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-2 text-3xl hover:scale-110 transition-transform">
            🪅
          </Link>
          <p className="text-xs text-slate-400 font-bold mt-2 tracking-widest uppercase">
            Login to your account
          </p>
        </div>

        {/* ログインフォームを包むカード：ArticleCardと同じデザインルール */}
        <div className="bg-white border border-yellow-100 p-8 rounded-[2.5rem] shadow-xl shadow-yellow-600/5">
          <LoginForm />
        </div>

      
      </div>
    </main>
  );
}