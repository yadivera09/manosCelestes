// app/categorias/[categoria]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, type Activity } from "@/lib/activitiesData";

export default function CategoriaPage() {
  const params = useParams<{ categoria: string }>();
  const router = useRouter();
  const category = CATEGORIES.find((c) => c.slug === params.categoria);

  if (!category) notFound();

  // Collect all available years across all activities in this category
  const allYears = Array.from(
    new Set(
      category.activities.flatMap((a) => a.years.map((y) => y.year))
    )
  ).sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredActivities: Activity[] = selectedYear
    ? category.activities.filter((a) =>
        a.years.some((y) => y.year === selectedYear)
      )
    : category.activities;

  return (
    <div className="min-h-screen bg-[#FDFBF5]">
      {/* ── Top Navigation ─────────────────────────────────────── */}
      <div className="bg-[#0A2A3A] py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-3 text-sm text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/#actividades" className="hover:text-white transition-colors">
            Actividades
          </Link>
          <span>/</span>
          <span className="text-white font-semibold">{category.name}</span>
        </div>
      </div>

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <div className="relative bg-[#0A2A3A] overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #4FB3DC 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4FB3DC 0%, transparent 40%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#4FB3DC]/20 text-[#4FB3DC] text-xs font-bold tracking-widest uppercase mb-6">
              {category.hashtag}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              {category.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Year Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          <span className="text-sm font-bold text-[#0A2A3A] uppercase tracking-widest mr-2">
            Filtrar por año:
          </span>
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
              selectedYear === null
                ? "bg-[#0A2A3A] text-white border-[#0A2A3A]"
                : "bg-white text-[#0A2A3A] border-[#0A2A3A]/20 hover:border-[#4FB3DC] hover:text-[#4FB3DC]"
            }`}
          >
            Todos
          </button>
          {allYears.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                selectedYear === y
                  ? "bg-[#4FB3DC] text-white border-[#4FB3DC]"
                  : "bg-white text-[#0A2A3A] border-[#0A2A3A]/20 hover:border-[#4FB3DC] hover:text-[#4FB3DC]"
              }`}
            >
              {y}
            </button>
          ))}
        </motion.div>

        {/* Activity Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredActivities.map((activity, idx) => {
              // If year is filtered, show only that year's card; else show the most recent year
              const displayYear = selectedYear
                ? activity.years.find((y) => y.year === selectedYear)
                : activity.years[0];

              if (!displayYear) return null;

              return (
                <motion.div
                  key={`${activity.slug}-${displayYear.year}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    href={`/categorias/${category.slug}/${activity.slug}/${displayYear.year}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={activity.coverImage}
                        alt={activity.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Year badge */}
                      <div className="absolute top-4 right-4 bg-[#0A2A3A]/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {displayYear.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#0A2A3A] mb-2 group-hover:text-[#4FB3DC] transition-colors">
                        {activity.name}
                      </h2>
                      <p className="text-sm text-[#143B4F]/70 leading-relaxed line-clamp-2">
                        {activity.description}
                      </p>

                      {/* Available years pills */}
                      {!selectedYear && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {activity.years.map((y) => (
                            <span
                              key={y.year}
                              className="text-xs px-2.5 py-1 rounded-full bg-[#EAF6FC] text-[#143B4F] font-semibold"
                            >
                              {y.year}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-5 flex items-center gap-2 text-[#4FB3DC] text-sm font-semibold">
                        <span>Ver galería</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredActivities.length === 0 && (
          <div className="text-center py-24 text-[#143B4F]/50 text-lg">
            No hay actividades registradas para {selectedYear}.
          </div>
        )}
      </div>

      {/* ── Back Button ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
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
          Volver
        </button>
      </div>
    </div>
  );
}
