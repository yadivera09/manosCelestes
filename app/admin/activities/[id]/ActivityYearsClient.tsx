'use client'

import { useState } from 'react'
import { createActivityYear, toggleActivityYearActive } from '@/app/actions/activities'
import { Loader2, Plus, Trash2, CheckCircle2, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type ActivityYear = {
  id: string
  activity_id: string
  year: number
  description: string | null
  is_active: boolean
}

export function ActivityYearsClient({ 
  activityId, 
  initialYears 
}: { 
  activityId: string, 
  initialYears: ActivityYear[] 
}) {
  const [years] = useState<ActivityYear[]>(initialYears)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ year: new Date().getFullYear(), description: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData()
    data.append('year', formData.year.toString())
    data.append('description', formData.description)

    await createActivityYear(activityId, data)
    window.location.reload()
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleActivityYearActive(id, currentStatus, activityId)
    window.location.reload()
  }

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 flex flex-col md:flex-row md:items-end gap-4">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col md:flex-row gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
            <input
              type="number" required
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || new Date().getFullYear()})}
              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta (opcional)</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              placeholder="Ej: Resumen del evento este año..."
            />
          </div>
          <button type="submit" disabled={isLoading} className="flex items-center px-6 py-2 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 whitespace-nowrap">
            {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
            Agregar Año
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No hay años registrados para esta actividad.
          </div>
        ) : (
          years.map((yearItem) => (
            <div key={yearItem.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${!yearItem.is_active ? 'opacity-60 bg-gray-50' : ''}`}>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center text-xl font-bold text-gray-900">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" /> {yearItem.year}
                  </div>
                  <button onClick={() => handleToggleActive(yearItem.id, yearItem.is_active)} className={`p-1 rounded-full ${yearItem.is_active ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}>
                    {yearItem.is_active ? <Trash2 className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 h-10">
                  {yearItem.description || 'Sin descripción'}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link href={`/admin/activities/${activityId}/years/${yearItem.id}`} className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-50 transition-colors">
                    Ver Galería de Fotos <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
