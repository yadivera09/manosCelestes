import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-medium text-neutral-white",
    "hover:bg-primary-dark",
    "focus-visible:ring-2 focus-visible:ring-primary-medium focus-visible:ring-offset-2",
    "active:scale-[0.98]",
    "shadow-soft",
  ].join(" "),
  secondary: [
    "bg-transparent text-primary-medium",
    "border-2 border-primary-medium",
    "hover:bg-primary-medium hover:text-neutral-white",
    "focus-visible:ring-2 focus-visible:ring-primary-medium focus-visible:ring-offset-2",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-2xl font-semibold",
        "transition-all duration-300 ease-smooth",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "outline-none cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
