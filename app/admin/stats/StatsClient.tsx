'use client'

import { useState } from 'react'
import { createStat, updateStat, toggleStatActive } from '@/app/actions/stats'
import { Loader2, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react'

type Stat = {
  id: string
  label: string
  value: number
  icon: string | null
  display_order: number
  is_active: boolean
}

export function StatsClient({ initialStats }: { initialStats: Stat[] }) {
  const [stats] = useState<Stat[]>(initialStats)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Estado del formulario
  const [formData, setFormData] = useState({
    label: '',
    value: 0,
    icon: '',
    display_order: 0,
  })

  const handleEditClick = (stat: Stat) => {
    setIsEditing(stat.id)
    setFormData({
      label: stat.label,
      value: stat.value,
      icon: stat.icon || '',
      display_order: stat.display_order,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setFormData({ label: '', value: 0, icon: '', display_order: 0 })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData()
    data.append('label', formData.label)
    data.append('value', formData.value.toString())
    data.append('icon', formData.icon)
    data.append('display_order', formData.display_order.toString())

    if (isEditing) {
      await updateStat(isEditing, data)
    } else {
      await createStat(data)
    }

    // Como no tenemos datos en tiempo real de Supabase configurados, 
    // recargar la página es la forma más fácil de obtener la data fresca tras el revalidatePath
    window.location.reload()
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleStatActive(id, currentStatus)
    window.location.reload()
  }

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Editar Estadística' : 'Nueva Estadística'}
          </h3>
          {isEditing && (
            <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-700">
              Cancelar edición
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta (Ej: Niños Ayudados)</label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({...formData, label: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor (Número)</label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orden de Visualización</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
              {isEditing ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Estadísticas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Estadísticas Actuales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etiqueta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay estadísticas registradas. Agrega una arriba.
                  </td>
                </tr>
              ) : (
                stats.map((stat) => (
                  <tr key={stat.id} className={!stat.is_active ? 'bg-gray-50 opacity-60' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.display_order}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.label}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.value.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(stat.id, stat.is_active)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stat.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                        title="Click para cambiar estado"
                      >
                        {stat.is_active ? 'Visible' : 'Oculto'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleEditClick(stat)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(stat.id, stat.is_active)}
                          className={`${stat.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                          title={stat.is_active ? 'Ocultar' : 'Restaurar'}
                        >
                          {stat.is_active ? <Trash2 className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
