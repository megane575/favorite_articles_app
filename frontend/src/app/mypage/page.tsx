import Link from "next/link";
import Button from "@/components/common/Button";

export default function MyPage() {
  return (
    <main className="p-6 space-y-6">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">mypage</h1>
        <Link href="/articles/new">
          <Button>記事登録</Button>
        </Link>
      </section>

      <section className="space-y-4">
        <article className="border rounded p-4 shadow-sm space-y-2">
          <p className="font-bold">記事タイトル（仮）</p>
          <p>自分が投稿した記事の説明が入ります。</p>

          <div className="flex gap-3">
            <Link href="/articles/1/edit">
              <Button>編集</Button>
            </Link>

            <button className="px-4 py-2 rounded bg-red-600 text-white hover:opacity-90">
              削除
            </button>
          </div>
        </article>

        <article className="border rounded p-4 shadow-sm space-y-2">
          <p className="font-bold">記事タイトル（仮）</p>
          <p>自分が投稿した記事の説明が入ります。</p>

          <div className="flex gap-3">
            <Link href="/articles/2/edit">
              <Button>編集</Button>
            </Link>

            <button className="px-4 py-2 rounded bg-red-600 text-white hover:opacity-90">
              削除
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}