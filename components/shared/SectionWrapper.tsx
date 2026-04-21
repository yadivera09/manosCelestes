import type { HTMLAttributes, ReactNode } from "react";

type SectionBackground = "white" | "cream" | "dark" | "gradient";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  background?: SectionBackground;
  /** ID de ancla para navegación */
  id?: string;
  /** Añade padding vertical estándar (por defecto true) */
  padded?: boolean;
}

const backgroundClasses: Record<SectionBackground, string> = {
  white: "bg-neutral-white",
  cream: "bg-neutral-cream",
  dark: "bg-primary-dark text-neutral-white",
  gradient: "bg-gradient-primary text-neutral-white",
};

export default function SectionWrapper({
  children,
  background = "white",
  id,
  padded = true,
  className = "",
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={[
        "w-full",
        backgroundClasses[background],
        padded ? "py-16 md:py-24" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}
