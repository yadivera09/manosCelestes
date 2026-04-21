"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slugify } from "@/lib/utils";

export type ActivityCategory = "Celebraciones" | "Navidad" | "Conferencias" | "Donaciones";

export interface ActivityCardProps {
  title: string;
  description?: string;
  image: string;
  category: ActivityCategory;
}

export default function ActivityCard({
  title,
  description,
  image,
  category,
}: ActivityCardProps) {
  const slug = slugify(title);

  return (
    <Link
      href={`/actividades/${slug}`}
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary-medium focus-visible:ring-offset-2 rounded-2xl"
    >
      <motion.article
        className="relative rounded-2xl overflow-hidden shadow-card group h-72"
        whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      >
        {/* ── Background image with zoom on hover ── */}
        <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* ── Gradient overlay — darkens on hover ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-80" />

        {/* ── Category badge ── */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-white/15 text-neutral-white border border-neutral-white/20 backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* ── Text content ── */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
          <h3 className="text-neutral-white font-bold text-lg leading-snug">{title}</h3>
          {description && (
            <p className="text-neutral-white/70 text-sm leading-snug line-clamp-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {description}
            </p>
          )}
          {/* Arrow indicator */}
          <span className="mt-2 inline-flex items-center gap-1 text-accent-gold text-xs font-semibold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Ver más
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
