import { getActivityById, getGalleryImages } from '@/app/actions/activities'
import { GalleryClient } from './GalleryClient'
import YearDescriptionClient from './YearDescriptionClient'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function ActivityYearGalleryPage({ 
  params 
}: { 
  params: { id: string, year_id: string } 
}) {
  const { data: activity } = await getActivityById(params.id)
  
  // Obtener la información del año específico
  const supabase = createClient()
  const { data: yearData } = await supabase
    .from('activity_years')
    .select('year, description')
    .eq('id', params.year_id)
    .single()

  const { data: images } = await getGalleryImages(params.year_id)

  if (!activity || !yearData) {
    return <div>Información no encontrada</div>
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <Link href={`/admin/activities/${params.id}`} className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver a los Años de {activity.title}
      </Link>

      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
          {activity.title} <span className="text-gray-400 mx-3">|</span> 
          <Calendar className="w-7 h-7 text-blue-600 mr-2" /> {yearData.year}
        </h1>
        <p className="mt-2 text-gray-600">
          Administra los textos y fotografías de este evento específico.
        </p>
      </div>

      {/* Editor de Descripción Dinámico */}
      <YearDescriptionClient 
        yearId={params.year_id} 
        activityId={params.id}
        year={yearData.year}
        initialSummary={yearData.summary || ''} 
        initialDescription={yearData.description || ''} 
      />

      {/* Galería de Imágenes */}
      <GalleryClient activityYearId={params.year_id} initialImages={images || []} />
    </div>
  )
}
