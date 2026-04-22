import { getTeam } from '@/app/actions/team'
import { TeamClient } from './TeamClient'

export default async function TeamPage() {
  const { data: team } = await getTeam(false) // includeInactive = false para ver todo en el admin

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Nuestro Equipo</h1>
        <p className="mt-2 text-gray-600">
          Gestiona los miembros del equipo. Puedes marcar a alguien como "Líder Principal" para que tenga 
          su tarjeta destacada en la página de inicio. El orden menor aparece primero.
        </p>
      </div>

      <TeamClient initialTeam={team || []} />
    </div>
  )
}
