import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const base =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<string, string> = {
  primary:
    "bg-brand-rust text-white hover:bg-[#5c0d0b] focus-visible:ring-brand-rust",
  secondary:
    "bg-brand-teal text-white hover:bg-[#0d3336] focus-visible:ring-brand-teal",
  ghost:
    "bg-transparent text-brand-teal border border-brand-teal hover:bg-brand-teal/5 focus-visible:ring-brand-teal",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
