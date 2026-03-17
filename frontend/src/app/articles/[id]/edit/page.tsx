type EditArticlePageProps = {
  params: {
    id: string;
  };
};

export default function EditArticlePage({ params }: EditArticlePageProps) {
  return (
    <main>
      <h1>記事編集ページ</h1>
      <p>編集中の記事ID: {params.id}</p>
    </main>
  );
}