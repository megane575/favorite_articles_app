import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#FFFDF0] border-b border-yellow-200/50 shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-black text-slate-700 tracking-tight">
          <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-2">
          お気に入り記事共有アプリ</Link>
        </h1>

        <nav className="flex items-center gap-4">
          {/* ログインボタン：濃い黄色（マスタードイエロー系）。文字をあえて黒にするとポップさが増します */}
          <Link 
            href="/login" 
            className="px-6 py-2 bg-[#FFD700] hover:bg-[#FACC15] text-slate-800 text-xs font-black rounded-full shadow-[0_3px_0_0_#EAB308] active:shadow-none active:translate-y-[2px] transition-all tracking-widest"
          >
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  );
}