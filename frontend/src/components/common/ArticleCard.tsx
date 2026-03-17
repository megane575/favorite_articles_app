type ArticleCardProps = {
  author: string;
  date: string;
  reason: string;
  url: string;
};

export default function ArticleCard({
  author,
  date,
  reason,
  url,
}: ArticleCardProps) {
  return (
    <article className="border rounded p-4 shadow-sm space-y-2">
      <p>
        <span className="font-bold">投稿者名：</span>
        {author}
      </p>
      <p>
        <span className="font-bold">投稿日時：</span>
        {date}
      </p>
      <p>
        <span className="font-bold">オススメ理由：</span>
        {reason}
      </p>
      <p>
        <span className="font-bold">記事URL：</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {url}s
        </a>
      </p>
    </article>
  );
}