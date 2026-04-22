import { getActivities } from '@/app/actions/activities'
import { getCategories } from '@/app/actions/categories'
import { ActivitiesClient } from './ActivitiesClient'

export const dynamic = 'force-dynamic'

export default async function ActivitiesPage() {
  const { data: activities } = await getActivities(true)
  const { data: categories } = await getCategories(true)

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Actividades</h1>
        <p className="mt-2 text-gray-600">
          Crea las carpetas principales de actividades (ej: "Navidad en Calles"). 
          Luego, dentro de cada actividad podrás crear carpetas por Años para subir las fotos de la galería.
        </p>
      </div>

      <ActivitiesClient 
        initialActivities={activities || []} 
        categories={categories || []}
      />
    </div>
  )
}
