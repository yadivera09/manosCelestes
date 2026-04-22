import { getActivityById, getActivityYears } from '@/app/actions/activities'
import { ActivityYearsClient } from './ActivityYearsClient'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ActivityDetailsPage({ params }: { params: { id: string } }) {
  const { data: activity } = await getActivityById(params.id)
  const { data: years } = await getActivityYears(params.id, false)

  if (!activity) {
    return <div>Actividad no encontrada</div>
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <Link href="/admin/activities" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver a Actividades
      </Link>

      <div className="mb-4 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{activity.title}</h1>
        <p className="mt-2 text-gray-600">
          Agrega carpetas por años para esta actividad.
        </p>
      </div>

      <ActivityYearsClient activityId={params.id} initialYears={years || []} />
    </div>
  )
}
