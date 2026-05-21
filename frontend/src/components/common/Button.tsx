type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      // 共通の「ぷっくりデザイン」をここに集約！
      className={`
        bg-[#FFD700] hover:bg-[#FACC15] 
        text-slate-800 text-xs font-black 
        rounded-full 
        shadow-[0_4px_0_0_#EAB308] 
        active:shadow-none active:translate-y-[2px] 
        transition-all tracking-widest uppercase
        flex items-center justify-center gap-2
        px-6 py-2.5
        ${className} 
      `}
    >
      {children}
    </button>
  );
}
