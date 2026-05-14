import { colors } from "./page";

export function CardWithBackground({
  title,
  description,
  bg,
  border,
}: {
  title: string;
  description: string;
  bg?: string;
  border?: string;
}): import("react/jsx-runtime").JSX.Element {
  return (
    <div
      className={`${bg || "bg-[#1e2129]"} border ${border || "border-[#332e25]"} p-4 w-full rounded-xl`}
    >
      <h1 className={`text-2xl font-semibold ${colors["orange"]}`}>{title}</h1>
      <p className="font-mono text-[#94a3b8] uppercase">{description}</p>
    </div>
  );
}
