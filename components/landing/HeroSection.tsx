// components/landing/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  settings?: {
    title?: string
    subtitle?: string
    description?: string
    image_url?: string
  }
}

export default function Hero({ settings }: HeroProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Valores dinámicos con fallbacks
  const title = settings?.title || "Manos Celestes";
  const subtitle = settings?.subtitle || "Somos la mano que se extiende cuando nadie mira.";
  const description = settings?.description || "Transformamos gestos pequeños en sonrisas enormes.";
  const imageUrl = settings?.image_url || "/mock/hero.jpeg";

  // Dividir el título para el diseño especial (ej: "Manos Celestes" -> ["Manos", "Celestes"])
  const titleParts = title.split(" ");
  const firstPart = titleParts[0] || "Manos";
  const secondPart = titleParts.slice(1).join(" ") || "Celestes";

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    {
      name: "Quiénes Somos",
      href: "#quienes-somos",
      desc: "Conoce nuestra misión y valores en defensa de la vida.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      name: "Qué Hacemos",
      href: "#actividades",
      desc: "Descubre nuestras iniciativas y proyectos sociales.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: "Nuestro Grupo",
      href: "#team",
      desc: "Personas reales trabajando con amor y entrega.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      name: "Involúcrate",
      href: "#involucrate",
      desc: "¿Cómo puedes sumarte a nuestra causa?",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo ocupando toda la pantalla */}
      <Image
        src={imageUrl}
        alt="Fondo Manos Celestes"
        fill
        priority
        className="object-cover z-0"
      />
      {/* Overlay para garantizar lectura del texto */}
      <div className="absolute inset-0 bg-[#EAF6FC]/85 z-[1]"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-[1240px] flex flex-col justify-between h-screen min-h-[600px] py-6 md:py-10 px-6 md:px-12">
        {/* Top navigation */}
        <nav className="relative z-[100] flex items-center justify-between w-full pt-8">
          <div className="flex items-center gap-3 fade-up fade-up-1">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image
                src="/mock/logo.png"
                alt="Logo Manos Celestes"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm tracking-[0.22em] font-semibold text-[#0A2A3A]">
              MANOS CELESTES
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10 fade-up fade-up-2 text-[12px] font-bold tracking-widest text-[#0A2A3A]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="nav-link" href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 fade-up fade-up-2">
            {/* Phone Button */}
            <button
              aria-label="Contacto"
              className="w-11 h-11 rounded-full border border-[#0A2A3A]/15 flex items-center justify-center hover:border-[#2E8EBA] transition bg-white/20 backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>

            {/* Donate Button */}
            <a href="#donar" className="btn-primary hidden sm:inline-block">Donar</a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 rounded-full border border-[#0A2A3A]/15 flex flex-col items-center justify-center gap-[4px] bg-white/40 backdrop-blur-md transition-all active:scale-95 z-[110]"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className={`w-5 h-[2px] bg-[#0A2A3A] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-5 h-[2px] bg-[#0A2A3A] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-[2px] bg-[#0A2A3A] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] lg:hidden"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-[#0A2A3A]/40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-white shadow-2xl flex flex-col overflow-hidden rounded-r-[2.5rem]"
              >
                {/* Header (Glassmorphism & Soft Mixture) */}
                <div className="relative h-56 flex items-center justify-center p-8 overflow-hidden bg-sky-ink">
                  {/* Decorative background image */}
                  <div className="absolute inset-0 opacity-40">
                    <Image
                      src="/mock/about.jpeg"
                      alt="Decor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4FB3DC]/60 via-[#0A2A3A]/80 to-[#0A2A3A]"></div>

                  {/* Logo - Circular Glass Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl mb-5 flex items-center justify-center group overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Image
                        src="/mock/logo.png"
                        alt="Logo Manos Celestes"
                        width={75}
                        height={75}
                        className="object-contain relative z-10"
                      />
                    </div>
                    <span className="text-white text-xs tracking-[0.3em] font-bold uppercase opacity-90">
                      Manos Celestes
                    </span>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto px-4 py-8">
                  <div className="flex flex-col">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#F4FAFE] transition-colors border-b border-neutral-50 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#EAF6FC] text-[#4FB3DC] flex items-center justify-center shrink-0">
                          {link.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-[#0A2A3A] tracking-tight">
                            {link.name}
                          </span>
                          <span className="text-xs text-[#143B4F]/60 mt-1 leading-relaxed">
                            {link.desc}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Footer Area */}
                <div className="p-8 pt-4 border-t border-neutral-100 mt-auto">
                  <a
                    href="#donar"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full block text-center py-4 mb-8"
                  >
                    Donar Ahora
                  </a>

                  <p className="text-[11px] text-[#143B4F]/40 font-medium text-center">
                    © 2024 Manos Celestes.
                    <br />
                    Protección de la vida y la familia.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Título principal */}
        <div className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-12 pb-10 text-center">
          <h1 className="display-title text-[18vw] md:text-[14vw] lg:text-[11rem] xl:text-[13rem] leading-[0.88] fade-up fade-up-3">
            <span className="block">{firstPart}</span>
            <span className="block mt-2 fade-up fade-up-4">{secondPart}</span>
          </h1>

          {/* Frase de apoyo */}
          <p className="mt-10 md:mt-12 max-w-2xl mx-auto text-base md:text-lg text-[#143B4F]/80 leading-relaxed fade-up fade-up-4 px-4">
            {subtitle}
            <br className="hidden md:block" />
            {description}
          </p>

          {/* Botones */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 fade-up fade-up-5">
            <a href="#donar" className="btn-primary px-8">Donar Ahora</a>
            <a href="#ayuda" className="btn-ghost">
              Necesito Ayuda
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer del hero con aliados y scroll */}
        <div className="border-t border-[#0A2A3A]/10 py-6 flex flex-wrap items-center justify-between gap-6 fade-up fade-up-5 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md border border-[#0A2A3A]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#143B4F]">
              DONACIÓN RÁPIDA
            </span>
          </div>

          <div className="hidden md:flex flex-wrap items-center gap-x-10 gap-y-3 opacity-80">
            <span className="italic font-serif text-xl text-[#143B4F]">
              aliados<span className="text-[#4FB3DC]">+</span>
            </span>
            <span className="text-[10px] tracking-[0.18em] font-semibold text-[#143B4F]">
              FUNDACIÓN · LUZ
            </span>
            <span className="text-[10px] tracking-[0.18em] font-semibold text-[#143B4F]">
              UNICEF
            </span>
            <span className="text-[10px] tracking-[0.18em] font-semibold text-[#143B4F]">
              RED SOLIDARIA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#143B4F]">
              DESLIZA
            </span>
            <div className="w-9 h-9 rounded-full border border-[#0A2A3A]/20 flex items-center justify-center soft-float text-[#143B4F]">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
