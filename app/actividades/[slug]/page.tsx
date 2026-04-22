// app/actividades/[slug]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Folder, Calendar, ChevronRight, ArrowLeft } from "lucide-react"

export default async function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  
  // 1. Obtener la actividad por su slug
  const { data: activity, error: activityError } = await supabase
    .from('activities')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (activityError || !activity) {
    return notFound()
  }

  // 2. Obtener los años registrados para esta actividad
  const { data: years, error: yearsError } = await supabase
    .from('activity_years')
    .select('*')
    .eq('activity_id', activity.id)
    .eq('is_active', true)
    .order('year', { ascending: false })

  return (
    <div className="min-h-screen bg-[#FDFBF5]">
      {/* Header / Breadcrumb */}
      <div className="bg-[#0A2A3A] py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/#actividades" 
            className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver a Actividades
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#4FB3DC]/20 text-[#4FB3DC] text-xs font-bold tracking-widest uppercase mb-4">
                {activity.category || 'Actividad'}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {activity.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Info de la Actividad */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">
                <Image
                  src={activity.cover_url || '/mock/activity-1.jpg'}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0A2A3A] mb-4">Sobre esta actividad</h3>
              <p className="text-[#143B4F]/70 leading-relaxed italic">
                "{activity.description || 'Sin descripción disponible.'}"
              </p>
            </div>
          </div>

          {/* Columna Derecha: Listado de Años */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#0A2A3A] mb-8 flex items-center">
              <Folder className="w-6 h-6 mr-3 text-[#4FB3DC]" />
              Álbumes por año
            </h2>

            {!years || years.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Aún no hay galerías registradas para esta actividad.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {years.map((y) => (
                  <Link
                    key={y.id}
                    href={`/actividades/${activity.slug}/${y.year}`}
                    className="group bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl hover:border-[#4FB3DC]/30 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-[#0A2A3A] group-hover:text-[#4FB3DC] transition-colors">
                          {y.year}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-[#EAF6FC] flex items-center justify-center text-[#4FB3DC] group-hover:bg-[#4FB3DC] group-hover:text-white transition-all">
                          <ChevronRight className="w-6 h-6" />
                        </div>
                      </div>
                      <p className="text-sm text-[#143B4F]/60 line-clamp-3">
                        {y.description || 'Explora los momentos vividos en esta jornada.'}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-50 text-xs font-bold text-[#4FB3DC] uppercase tracking-widest">
                      Ver Galería
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
