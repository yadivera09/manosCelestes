// components/landing/ActivitiesSection.tsx
"use client";

import { motion } from "framer-motion";
import { Container, SectionWrapper } from "@/components/shared/index";
import Link from "next/link";
import { ChevronRight, Heart, Book, PartyPopper } from "lucide-react";

// Mapeo de metadata para las categorías fijas
const CATEGORY_METADATA: Record<string, any> = {
  'Celebraciones': {
    slug: 'celebraciones',
    description: "Día del Niño, Día de la Madre y Día del Padre. Honramos a las familias con eventos llenos de alegría.",
    icon: <PartyPopper className="w-7 h-7" />,
    color: "bg-[#F4FAFE]"
  },
  'Navidad y Ayuda': {
    slug: 'navidad-ayuda',
    description: "Llevamos esperanza y ayuda concreta a personas en las calles y asilos, iluminando la época para quienes más lo necesitan.",
    icon: <Heart className="w-7 h-7" />,
    color: "bg-[#FFF5F5]"
  },
  'Conferencias': {
    slug: 'conferencias',
    description: "Charlas educativas y paneles de expertos enfocados en defender la vida, fortalecer los valores y apoyar a la familia.",
    icon: <Book className="w-7 h-7" />,
    color: "bg-[#F5F3FF]"
  }
};

export default function ActivitiesSection({ activities }: { activities: any[] }) {
  // 1. Filtrar solo actividades activas
  const activeActivities = activities.filter(a => a.is_active);

  // 2. Agrupar categorías que tienen al menos una actividad
  const uniqueCategories = Array.from(new Set(activeActivities.map(a => a.category))).filter(Boolean);

  // 3. Preparar los datos de las tarjetas a mostrar
  const displayCategories = uniqueCategories.map(catName => {
    const meta = CATEGORY_METADATA[catName] || {
      slug: catName.toLowerCase().replace(/\s+/g, '-'),
      description: `Explora nuestras actividades de ${catName}.`,
      icon: <Heart className="w-7 h-7" />,
      color: "bg-gray-50"
    };

    return {
      name: catName,
      ...meta
    };
  });

  // Si no hay ninguna actividad activa, no mostramos la sección
  if (displayCategories.length === 0) return null;

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
            <span className="inline-block px-4 py-1.5 rounded-lg bg-[#EAF6FC] text-[#143B4F] text-xs font-bold tracking-widest uppercase mb-6">
              Nuestras Áreas
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A2A3A] max-w-4xl mx-auto leading-tight md:leading-[1.1] mb-6">
              Descubre cómo ayudamos
            </h2>
            <p className="text-base md:text-lg text-[#143B4F]/80 max-w-2xl mx-auto">
              Haz clic en un área para ver las iniciativas específicas y sus galerías de fotos.
            </p>
          </motion.div>
        </div>

        {/* Categories Grid - Centrado si hay pocas */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${displayCategories.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2 max-w-4xl mx-auto'} gap-8`}>
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-neutral-100 flex flex-col h-full group hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 text-[#4FB3DC] group-hover:bg-[#4FB3DC] group-hover:text-white transition-all ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#0A2A3A] mb-4">{cat.name}</h3>
              <p className="text-[#143B4F]/80 text-lg leading-relaxed flex-grow">
                {cat.description}
              </p>
              <div className="mt-10 pt-8 border-t border-neutral-50 flex items-center justify-between">
                <Link 
                  href={`/categorias/${cat.slug}`} 
                  className="inline-flex items-center text-[#4FB3DC] font-extrabold text-sm uppercase tracking-widest group-hover:gap-4 transition-all"
                >
                  Ver actividades
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
