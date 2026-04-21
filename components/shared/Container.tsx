import type { HTMLAttributes, ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: ContainerSize;
  /** Centra el contenido de texto y elementos inline */
  centered?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  size = "xl",
  centered = false,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={[
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        centered ? "text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
