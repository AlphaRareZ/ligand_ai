import React from "react";

// 1. We define the exact strings allowed for variant and size
type ButtonVariant =
  | "primary"
  | "secondary"
  | "blueBack"
  | "ghost"
  | "primaryGlow";
type ButtonSize = "sm" | "md" | "lg";

// 2. We create an interface for the props.
// Extending ButtonHTMLAttributes means this button will naturally accept
// standard HTML attributes like onClick, disabled, type="submit", etc.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode; // This tells TS that children can be text, elements, etc.
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  // <-- 3. We attach the blueprint to the component here

  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition duration-200 cursor-pointer";

  // 4. We tell TS that these objects strictly use the keys we defined above
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#1152d4] text-white hover:bg-[#0f2553]",
    primaryGlow: "bg-[#1152d4] text-white hover:bg-[#2963d8]",
    secondary:
      "bg-transparent border border-[#1152d4] text-[#1152d4] hover:bg-[#1152d4] hover:text-white",
    blueBack: "bg-white border border-[#1152d4] text-[#1152d4]",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
