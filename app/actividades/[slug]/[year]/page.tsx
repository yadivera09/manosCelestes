// app/actividades/[slug]/[year]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, ImageIcon, Calendar } from "lucide-react"
import { GalleryGrid } from "./GalleryGrid"

export default async function ActivityYearGalleryPage({ 
  params 
}: { 
  params: { slug: string, year: string } 
}) {
  const supabase = createClient()
  const yearInt = parseInt(params.year)

  // 1. Obtener la actividad y su categoría
  const { data: activity } = await supabase
    .from('activities')
    .select('id, title, slug, category_id, categories(name)')
    .eq('slug', params.slug)
    .single()

  if (!activity) return notFound()

  // 2. Obtener todos los años disponibles para esta actividad (para el selector)
  const { data: allYears } = await supabase
    .from('activity_years')
    .select('year, id')
    .eq('activity_id', activity.id)
    .eq('is_active', true)
    .order('year', { ascending: false })

  // 3. Obtener el registro del año específico
  const { data: activityYear } = await supabase
    .from('activity_years')
    .select('id, summary, description')
    .eq('activity_id', activity.id)
    .eq('year', yearInt)
    .single()

  if (!activityYear) return notFound()

  // 4. Obtener las imágenes
  const { data: images } = await supabase
    .from('gallery')
    .select('*')
    .eq('activity_year_id', activityYear.id)
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const categoryName = (activity as any).categories?.name || 'Actividad'

  return (
    <div className="min-h-screen bg-[#FDFBF5] pb-24">
      {/* Hero Section */}
      <div className="bg-[#0A2A3A] pt-16 pb-16 px-6 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4FB3DC] opacity-5 blur-[100px] rounded-full -mr-40 -mt-40" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Badge Superior */}
          <div className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[#4FB3DC] text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10">
            #{categoryName.replace(/\s+/g, '')} · {yearInt}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tighter">
            {activity.title}
          </h1>
          
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed font-medium mb-10">
            {activityYear.summary || `Celebrando juntos un año más de impacto y esperanza.`}
          </p>

          {/* Otros Años Navigation */}
          {allYears && allYears.length > 1 && (
            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Otros años:</span>
              <div className="flex flex-wrap gap-2">
                {allYears.filter(y => y.year !== yearInt).map(y => (
                  <Link 
                    key={y.year}
                    href={`/actividades/${activity.slug}/${y.year}`}
                    className="px-4 py-1.5 bg-white/5 hover:bg-[#4FB3DC] hover:text-[#0A2A3A] text-white border border-white/10 rounded-full text-xs font-bold transition-all duration-300"
                  >
                    {y.year}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 mt-12 relative z-20">
        {/* Tarjeta "¿Qué hicimos?" - Ancho completo */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#0A2A3A]/5 p-8 md:p-12 mb-16 border border-neutral-100 w-full">
          <div className="flex items-start gap-5">
            <div className="w-1 h-10 bg-[#4FB3DC] rounded-full hidden md:block" />
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#0A2A3A] mb-6 flex items-center">
                ¿Qué hicimos en {yearInt}?
              </h2>
              <p className="text-[#143B4F]/70 text-base md:text-lg leading-relaxed font-medium">
                {activityYear.description}
              </p>
            </div>
          </div>
        </div>

        {/* Galería Section */}
        <div className="max-w-6xl mr-auto">
          <div className="flex items-end gap-3 mb-8">
            <h3 className="text-2xl font-black text-[#0A2A3A]">Galería de fotos</h3>
            <span className="text-[#0A2A3A]/30 text-base font-bold mb-0.5">({images?.length || 0} fotos)</span>
          </div>

          {!images || images.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-200 mb-6" />
              <h3 className="text-xl font-bold text-gray-400 tracking-tight">Aún no hay fotos en esta galería</h3>
              <p className="text-gray-400 mt-2">Pronto compartiremos los mejores momentos de este año.</p>
            </div>
          ) : (
            <GalleryGrid images={images.map(img => ({
              src: img.image_url,
              alt: img.alt_text || activity.title
            }))} />
          )}
        </div>
      </div>
    </div>
  )
}
