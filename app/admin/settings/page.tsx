import { getSettings } from '@/app/actions/settings'
import { SettingsForm } from './SettingsForm'

export default async function SettingsPage() {
  const result = await getSettings()
  const settingsData = result.data || {}

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Configuración Global</h1>
        <p className="mt-2 text-gray-600">
          Edita los textos principales, eslóganes y llamadas a la acción de las secciones clave de la página de inicio.
        </p>
      </div>

      <SettingsForm 
        sectionKey="hero" 
        sectionName="Sección Hero (Inicio)" 
        initialData={settingsData['hero']} 
      />

      <SettingsForm 
        sectionKey="nosotros" 
        sectionName="Sección Nosotros (Acerca de)" 
        initialData={settingsData['nosotros']} 
      />

      <SettingsForm 
        sectionKey="involucrate" 
        sectionName="Sección Involúcrate / Unirse" 
        initialData={settingsData['involucrate']} 
      />
    </div>
  )
}
