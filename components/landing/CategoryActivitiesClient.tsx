// components/landing/CategoryActivitiesClient.tsx
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

type ActivityYear = {
  id: string
  year: number
  summary: string | null
  is_active: boolean
}

type Activity = {
  id: string
  title: string
  slug: string
  description: string | null
  cover_url: string | null
  activity_years: ActivityYear[]
}

interface Props {
  initialActivities: Activity[]
  categoryName: string
}

export default function CategoryActivitiesClient({ initialActivities, categoryName }: Props) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')

  // Obtener lista única de años de todas las actividades
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    initialActivities.forEach(act => {
      act.activity_years.forEach(ay => {
        if (ay.is_active) years.add(ay.year)
      })
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [initialActivities])

  // Filtrar actividades basadas en el año seleccionado
  const filteredActivities = useMemo(() => {
    if (selectedYear === 'all') return initialActivities
    return initialActivities.filter(act => 
      act.activity_years.some(ay => ay.is_active && ay.year === selectedYear)
    )
  }, [initialActivities, selectedYear])

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Filtro por Año */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-16 border-b border-gray-100 pb-10">
        <span className="text-xs font-black text-[#0A2A3A]/40 uppercase tracking-[0.2em]">
          Filtrar por año:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              selectedYear === 'all'
                ? 'bg-[#0A2A3A] text-white shadow-lg shadow-[#0A2A3A]/20'
                : 'bg-white text-[#0A2A3A] border border-gray-200 hover:border-[#4FB3DC] hover:text-[#4FB3DC]'
            }`}
          >
            Todos
          </button>
          {availableYears.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedYear === year
                  ? 'bg-[#0A2A3A] text-white shadow-lg shadow-[#0A2A3A]/20'
                  : 'bg-white text-[#0A2A3A] border border-gray-200 hover:border-[#4FB3DC] hover:text-[#4FB3DC]'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Actividades */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
          <p className="text-gray-400 text-lg">No hay actividades para el año seleccionado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((act) => {
              // Obtener los años activos de esta actividad para las etiquetas
              const actYears = act.activity_years
                .filter(ay => ay.is_active)
                .map(ay => ay.year)
                .sort((a, b) => b - a)

              // El año más reciente para el badge de la imagen
              const latestYear = actYears[0]

              // Determinar qué descripción mostrar (la del año seleccionado o la general)
              const selectedYearData = selectedYear !== 'all' 
                ? act.activity_years.find(ay => ay.year === selectedYear)
                : null
              
              const displayDescription = selectedYearData?.summary || act.description

              return (
                <motion.div
                  key={act.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={`/actividades/${act.slug}`}
                    className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={act.cover_url || '/mock/activity-1.jpg'}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Badge de año en la imagen */}
                      <div className="absolute top-6 right-6 bg-[#0A2A3A] text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                        {selectedYear !== 'all' ? selectedYear : latestYear}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A3A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="p-10 flex flex-col flex-1">
                      <h3 className="text-3xl font-bold text-[#0A2A3A] mb-4 group-hover:text-[#4FB3DC] transition-colors leading-tight">
                        {act.title}
                      </h3>
                      <p className="text-[#143B4F]/60 text-lg line-clamp-3 leading-relaxed mb-8 flex-1">
                        {displayDescription}
                      </p>
                      
                      {/* Etiquetas de Años */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {actYears.slice(0, 3).map(year => (
                          <span key={year} className="px-4 py-1.5 bg-[#F4F9FB] text-[#4FB3DC] text-xs font-black rounded-lg uppercase tracking-wider">
                            {year}
                          </span>
                        ))}
                        {actYears.length > 3 && (
                          <span className="px-4 py-1.5 bg-[#F4F9FB] text-[#4FB3DC] text-xs font-black rounded-lg uppercase tracking-wider">
                            +{actYears.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-[#4FB3DC] font-black text-sm uppercase tracking-[0.2em] group/link">
                        Ver galería 
                        <ChevronRight className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
