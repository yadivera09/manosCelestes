"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const slides = [
  { src: "/mock/inicio.jpeg", alt: "Manos Celestes — inicio" },
  { src: "/mock/activity-1.jpg", alt: "Manos Celestes — actividad 1" },
  { src: "/mock/activity-2.jpg", alt: "Manos Celestes — actividad 2" },
  { src: "/mock/activity-3.jpg", alt: "Manos Celestes — actividad 3" },
  { src: "/mock/activity-4.jpg", alt: "Manos Celestes — actividad 4" },
  { src: "/mock/activity-5.jpg", alt: "Manos Celestes — actividad 5" },
  { src: "/mock/activity-6.jpg", alt: "Manos Celestes — actividad 6" },
];

interface QuienesSomosProps {
  settings?: {
    title?: string
    subtitle?: string
    description?: string
  }
}

export default function QuienesSomosSection({ settings }: QuienesSomosProps) {
  const [active, setActive] = useState(0);

  const title = settings?.title || "Conócenos";
  const subtitle = settings?.subtitle || "Sumérgete en nuestra historia";
  const description = settings?.description || "Somos un grupo de jóvenes comprometidos con la defensa de la vida y la familia. Nacimos como una iniciativa para apoyar, acompañar y brindar esperanza a quienes más lo necesitan.";

  // Dividir la descripción en frases para el carrusel si es necesario, 
  // o simplemente usar la descripción completa como mensaje principal.
  const displayMessages = [description];

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  // 5 visible indices: far-left, left, center, right, far-right
  const idx = (offset: number) =>
    (active + offset + slides.length * 4) % slides.length;

  // [size, opacity, grayscale, zIndex] per position offset
  const config: Record<number, { width: string; opacity: number; grayscale: boolean; z: number }> = {
    [-2]: { width: "clamp(100px, 15vw, 180px)", opacity: 0.55, grayscale: true,  z: 0 },
    [-1]: { width: "clamp(150px, 24vw, 280px)", opacity: 0.75, grayscale: true,  z: 1 },
    [0]:  { width: "clamp(240px, 38vw, 460px)", opacity: 1,    grayscale: false, z: 2 },
    [1]:  { width: "clamp(150px, 24vw, 280px)", opacity: 0.75, grayscale: true,  z: 1 },
    [2]:  { width: "clamp(100px, 15vw, 180px)", opacity: 0.55, grayscale: true,  z: 0 },
  };

  return (
    <section
      id="quienes-somos"
      className="w-full py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EAF6FC 0%, #FDFBF5 100%)" }}
    >
      {/* Header */}
      <div className="text-center mb-14 px-4">
        <p className="text-xs tracking-[0.22em] font-semibold text-[#4FB3DC] uppercase mb-3">
          Quiénes Somos
        </p>
        <h2 className="display-title text-5xl md:text-6xl lg:text-7xl mb-4">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-[#143B4F]/70 font-light tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* Carousel — 5 images */}
      <div className="flex items-center justify-center gap-3 md:gap-4">
        {([-2, -1, 0, 1, 2] as const).map((offset) => {
          const i = idx(offset);
          const { width, opacity, grayscale, z } = config[offset];
          const isCenter = offset === 0;

          return isCenter ? (
            /* Center card (non-clickable, highlighted) */
            <div
              key={`center-${active}`}
              className="relative flex-shrink-0"
              style={{ width, aspectRatio: "3/4", zIndex: z }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={slides[i].src}
                  alt={slides[i].alt}
                  fill
                  className="object-cover"
                  style={{ animation: "fade-up 0.4s ease both" }}
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0A2A3A]/65 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                  <p
                    key={`msg-${active}`}
                    className="text-white text-sm md:text-base leading-snug font-medium"
                    style={{ animation: "fade-up 0.5s ease both" }}
                  >
                    {displayMessages[active % displayMessages.length]}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Side cards (clickable) */
            <button
              key={`side-${offset}-${i}`}
              onClick={() => setActive(i)}
              className="relative flex-shrink-0 focus:outline-none group"
              style={{ width, aspectRatio: "3/4", opacity, zIndex: z }}
              aria-label={`Ver ${slides[i].alt}`}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:opacity-100">
                <Image
                  src={slides[i].src}
                  alt={slides[i].alt}
                  fill
                  className={`object-cover transition-all duration-500 ${grayscale ? "grayscale group-hover:grayscale-0" : ""}`}
                />
                <div className="absolute inset-0 bg-[#0A2A3A]/25 group-hover:bg-[#0A2A3A]/5 transition-all duration-500 rounded-2xl" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              background: i === active ? "#4FB3DC" : "#9FD6EF",
            }}
          />
        ))}
      </div>
    </section>
  );
}
