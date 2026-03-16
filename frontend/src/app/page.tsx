import Link from "next/link";
import ArticleCard from "@/components/common/ArticleCard";

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">オススメ記事紹介サイト</h1>
        <p>誰でも見られるトップページです。</p>

        <Link href="/login" className="text-blue-600 underline">
          ログインへ
        </Link>
      </section>

      <section className="space-y-4">
        <ArticleCard
          author="Erika"
          date="2026-03-17"
          reason="Next.jsのルーティング理解に役立つため"
          url="https://nextjs.org/docs"
        />
        <ArticleCard
          author="Aさん"
          date="2026-03-16"
          reason="FastAPIとの連携イメージがつかみやすいため"
          url="https://fastapi.tiangolo.com/"
        />
      </section>
    </main>
  );
}