// components/landing/ActivitiesSection.tsx
"use client";

import { motion } from "framer-motion";
import { Container, SectionWrapper } from "@/components/shared/index";
import Link from "next/link";

export default function ActivitiesSection() {
  return (
    <SectionWrapper id="actividades" className="bg-[#FDFBF5] py-24">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {/* Small badge */}
            <span className="inline-block px-4 py-1.5 rounded-lg bg-[#EAF6FC] text-[#143B4F] text-xs font-bold tracking-widest uppercase mb-6">
              Qué Hacemos
            </span>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A2A3A] max-w-4xl mx-auto leading-tight md:leading-[1.1] mb-6">
              Dale un vistazo a lo que hacemos
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-[#143B4F]/80 max-w-2xl mx-auto">
              Cada actividad es un acto de amor concreto. Conoce las iniciativas con las que transformamos vidas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-[#0A2A3A]">
              Conoce más
            </span>
            <Link href="#impacto" className="w-12 h-12 rounded-full border border-[#0A2A3A]/20 flex items-center justify-center hover:bg-[#4FB3DC] hover:text-white hover:border-[#4FB3DC] transition-all group">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A2A3A] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 — Celebraciones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-neutral-100 flex flex-col h-full group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-[#F4FAFE] flex items-center justify-center mb-8 text-[#4FB3DC] group-hover:bg-[#4FB3DC] group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0A2A3A] mb-4">Celebraciones</h3>
            <p className="text-[#143B4F]/80 text-lg leading-relaxed flex-grow">
              Día del Niño, Día de la Madre y Día del Padre. Honramos a las familias de la comunidad con eventos llenos de alegría, juegos y unidad.
            </p>
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="flex gap-2 text-xs font-semibold text-[#143B4F]/50 uppercase tracking-widest">
                <span>#Familia</span>
              </div>
              <Link href="/categorias/celebraciones" className="w-10 h-10 rounded-full border border-[#0A2A3A]/10 flex items-center justify-center group-hover:border-[#4FB3DC] group-hover:bg-[#4FB3DC] transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0A2A3A] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Card 2 — Navidad y Ayuda */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-neutral-100 flex flex-col h-full group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-[#F4FAFE] flex items-center justify-center mb-8 text-[#4FB3DC] group-hover:bg-[#4FB3DC] group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0A2A3A] mb-4">Navidad y Ayuda</h3>
            <p className="text-[#143B4F]/80 text-lg leading-relaxed flex-grow">
              Llevamos regalos, comida caliente y nuestro abrazo sincero a personas en las calles y asilos, iluminando la época para quienes más lo necesitan.
            </p>
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="flex gap-2 text-xs font-semibold text-[#143B4F]/50 uppercase tracking-widest">
                <span>#Solidaridad</span>
              </div>
              <Link href="/categorias/navidad-y-ayuda" className="w-10 h-10 rounded-full border border-[#0A2A3A]/10 flex items-center justify-center group-hover:border-[#4FB3DC] group-hover:bg-[#4FB3DC] transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0A2A3A] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Card 3 — Conferencias */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-neutral-100 flex flex-col h-full group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-[#F4FAFE] flex items-center justify-center mb-8 text-[#4FB3DC] group-hover:bg-[#4FB3DC] group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0A2A3A] mb-4">Conferencias</h3>
            <p className="text-[#143B4F]/80 text-lg leading-relaxed flex-grow">
              Organizamos charlas educativas y paneles de expertos enfocados en defender la vida, fortalecer los valores y apoyar a la familia del siglo XXI.
            </p>
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="flex gap-2 text-xs font-semibold text-[#143B4F]/50 uppercase tracking-widest">
                <span>#Educación</span>
              </div>
              <Link href="/categorias/conferencias" className="w-10 h-10 rounded-full border border-[#0A2A3A]/10 flex items-center justify-center group-hover:border-[#4FB3DC] group-hover:bg-[#4FB3DC] transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0A2A3A] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </motion.div>

        </div>
      </Container>
    </SectionWrapper>
  );
}
