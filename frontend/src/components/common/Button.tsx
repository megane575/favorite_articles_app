type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:opacity-90"
    >
      {children}
    </button>
  );
}