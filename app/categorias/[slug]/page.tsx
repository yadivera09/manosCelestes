import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"
import CategoryActivitiesClient from "@/components/landing/CategoryActivitiesClient"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  
  // Obtener la información de la categoría
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!category || catError) return notFound()

  // Obtener actividades que pertenecen a esta categoría con sus años
  const { data: activities } = await supabase
    .from('activities')
    .select('*, activity_years(*)')
    .eq('category_id', category.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#FDFBF5] pb-20">
      {/* Hero de Categoría */}
      <div className="bg-[#0A2A3A] py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4FB3DC_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <Link 
            href="/#actividades" 
            className="inline-flex items-center text-[#4FB3DC] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nuestras Actividades
          </Link>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
            {category.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed font-medium">
            {category.description}
          </p>
        </div>
      </div>

      {/* Listado con Filtros (Client Component) */}
      <CategoryActivitiesClient 
        initialActivities={activities || []} 
        categoryName={category.name} 
      />

      {/* Botón Volver Inferior */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <Link 
          href="/#actividades" 
          className="inline-flex items-center text-[#0A2A3A] font-bold hover:text-[#4FB3DC] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
          Volver
        </Link>
      </div>
    </div>
  )
}
