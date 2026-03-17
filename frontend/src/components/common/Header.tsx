import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b p-4 bg-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Article App</Link>
        </h1>

        <nav className="flex gap-4">
          <Link href="/mypage">MyPage</Link>
          <Link href="/articles/new">New Article</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}