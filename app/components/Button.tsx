// export function Button({
//   padding = "px-6 py-3",
//   bg = "bg-[#1152d4]",
//   border = "border-2-[#0f2553]",
//   hover,
//   className,
//   children,
// }) {
//   return (
//     <a
//       href="#"
//       className={`${bg} text-white font-bold ${padding} rounded-md inline-block ${hover} transform transition ${border} ${className}`}
//     >
//       {children}
//     </a>
//   );
// }

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition duration-200";

  const variants = {
    primary: "bg-[#1152d4] text-white hover:bg-[#0f2553]",
    secondary: "bg-transparent border border-[#1152d4] text-[#1152d4] hover:bg-[#1152d4] hover:text-white",
    blueBack: "bg-white border border-[#1152d4] text-[#1152d4]",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}