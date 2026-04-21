// app/categorias/[categoria]/[actividad]/[anio]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCategoryBySlug,
  getActivityBySlug,
  getActivityYear,
} from "@/lib/activitiesData";

export default function GaleriaPage() {
  const params = useParams<{
    categoria: string;
    actividad: string;
    anio: string;
  }>();

  const router = useRouter();
  const year = parseInt(params.anio, 10);

  const category = getCategoryBySlug(params.categoria);
  const activity = getActivityBySlug(params.categoria, params.actividad);
  const activityYear = getActivityYear(params.categoria, params.actividad, year);

  if (!category || !activity || !activityYear) notFound();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + activityYear.images.length) % activityYear.images.length : 0
    );
  const nextImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % activityYear.images.length : 0
    );

  // Other years available for this activity
  const otherYears = activity.years
    .filter((y) => y.year !== year)
    .sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-[#FDFBF5]">
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="bg-[#0A2A3A] py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/#actividades" className="hover:text-white transition-colors">
            Actividades
          </Link>
          <span>/</span>
          <Link
            href={`/categorias/${category.slug}`}
            className="hover:text-white transition-colors"
          >
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-white font-semibold">
            {activity.name} — {year}
          </span>
        </div>
      </div>

      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-[#0A2A3A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #4FB3DC 0%, transparent 50%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#4FB3DC]/20 text-[#4FB3DC] text-xs font-bold tracking-widest uppercase mb-6">
              {category.hashtag} · {year}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {activity.name}
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl">
              {activity.description}
            </p>

            {/* Year navigation pills */}
            {otherYears.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-white/50 text-sm font-semibold uppercase tracking-wider">
                  Otros años:
                </span>
                {otherYears.map((y) => (
                  <Link
                    key={y.year}
                    href={`/categorias/${category.slug}/${activity.slug}/${y.year}`}
                    className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm font-semibold hover:bg-[#4FB3DC] hover:border-[#4FB3DC] hover:text-white transition-all duration-200"
                  >
                    {y.year}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Descripción del Año ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-neutral-100 mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-8 rounded-full bg-[#4FB3DC]" />
            <h2 className="text-2xl font-bold text-[#0A2A3A]">
              ¿Qué hicimos en {year}?
            </h2>
          </div>
          <p className="text-[#143B4F]/80 text-base md:text-lg leading-relaxed">
            {activityYear.description}
          </p>
        </motion.div>

        {/* ── Gallery Grid ───────────────────────────────────────── */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0A2A3A] mb-6">
            Galería de fotos
            <span className="ml-3 text-sm font-normal text-[#143B4F]/50">
              ({activityYear.images.length} fotos)
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {activityYear.images.map((img, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className="relative aspect-square rounded-2xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FB3DC]"
                aria-label={`Abrir foto ${idx + 1}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                {/* hover overlay */}
                <div className="absolute inset-0 bg-[#0A2A3A]/0 group-hover:bg-[#0A2A3A]/40 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                    />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Back Button ────────────────────────────────────────── */}
        <div className="pt-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[#0A2A3A] font-semibold hover:text-[#4FB3DC] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a {category.name}
          </button>
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
              onClick={closeLightbox}
              aria-label="Cerrar galería"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Foto anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activityYear.images[lightboxIndex].src}
                alt={activityYear.images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Foto siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-1.5 rounded-full text-white text-sm font-semibold">
              {lightboxIndex + 1} / {activityYear.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
