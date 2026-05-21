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
  // 全体：ごく薄いクリーム色の背景、丸みの強い角、柔らかな黄色の影
  <div className="bg-[#FFFDF0] border border-yellow-100 p-6 rounded-[2rem] shadow-md shadow-yellow-50 hover:shadow-lg transition-all duration-300">
    
    {/* ヘッダー：投稿者と日付を横並びに */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {/* 投稿者のアイコン風の丸 */}
        <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-xs">
          🌵
        </div>
        <span className="font-bold text-gray-700 text-sm">
          {author}
        </span>
      </div>
      <span className="text-[10px] text-yellow-600/60 font-medium tracking-wider uppercase">
        {date}
      </span>
    </div>

    {/* メイン：オススメ理由（見出しを追加） */}
<div className="bg-white p-4 rounded-2xl text-gray-600 text-sm leading-relaxed mb-4 border border-yellow-50 shadow-inner">
  <p className="text-[10px] font-black text-yellow-600 mb-1 flex items-center gap-1">
    <span>🪅</span> お気に入りポイント
  </p>
  <p>
    {reason}
  </p>
</div>

    {/* フッター */}
    <a 
    href={url} 
    target="_blank"
    rel="noopener noreferrer"
    className="px-8 py-2 bg-[#8C73FF] hover:bg-[#7A61E6] text-white text-[11px] font-bold rounded-full shadow-sm transition-all tracking-widest uppercase"
  >
      記事を読む
    </a>
  </div>
);
}