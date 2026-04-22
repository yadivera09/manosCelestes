// app/admin/activities/[id]/years/[year_id]/YearDescriptionClient.tsx
'use client'

import { useState } from 'react'
import { updateActivityYearContent } from '@/app/actions/activities'
import { Loader2, Save, MessageCircle, Type } from 'lucide-react'

interface Props {
  yearId: string
  activityId: string
  year: number
  initialSummary: string
  initialDescription: string
}

export default function YearDescriptionClient({ 
  yearId, 
  activityId, 
  year, 
  initialSummary,
  initialDescription 
}: Props) {
  const [summary, setSummary] = useState(initialSummary)
  const [description, setDescription] = useState(initialDescription)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    const formData = new FormData()
    formData.append('summary', summary)
    formData.append('description', description)

    const result = await updateActivityYearContent(yearId, formData, activityId)

    if (!result.error) {
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } else {
      alert(`Error: ${result.error}`)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Type className="w-5 h-5 mr-2 text-blue-600" />
            Encabezado de la Tarjeta (Texto corto)
          </h3>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
            placeholder="Ej: Charla educativa sobre valores provida..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
            ¿Qué hicimos en {year}? (Resumen detallado)
          </h3>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 min-h-[120px]"
            placeholder={`Describe los logros, momentos clave o actividades realizadas en el año ${year}...`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end items-center gap-4 border-t pt-4">
          {isSuccess && (
            <span className="text-sm text-green-600 font-medium animate-in fade-in slide-in-from-right-2">
              ¡Contenido guardado con éxito!
            </span>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 transition-all shadow-md active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Guardar Información del Año
          </button>
        </div>
      </form>
    </div>
  )
}
