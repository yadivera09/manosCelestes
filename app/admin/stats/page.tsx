import { getStats } from '@/app/actions/stats'
import { StatsClient } from './StatsClient'

export default async function StatsPage() {
  const { data: stats } = await getStats(false) // false = includeInactive to see all in admin

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Estadísticas (Impacto)</h1>
        <p className="mt-2 text-gray-600">
          Gestiona los contadores de impacto que se muestran en la página principal. 
          Puedes ocultarlos sin borrarlos usando el botón de estado.
        </p>
      </div>

      <StatsClient initialStats={stats || []} />
    </div>
  )
}
