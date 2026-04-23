'use client'

import { useState } from 'react'
import { createActivity, updateActivity, toggleActivityActive } from '@/app/actions/activities'
import { Loader2, Plus, Edit2, Trash2, CheckCircle2, Folder, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Activity = {
  id: string
  title: string
  slug: string
  description: string | null
  category_id: string | null
  cover_url: string | null
  is_active: boolean
  categories?: { name: string } | null
}

type Category = {
  id: string
  name: string
  slug: string
}

export function ActivitiesClient({ 
  initialActivities, 
  categories 
}: { 
  initialActivities: Activity[], 
  categories: Category[] 
}) {
  const [activities] = useState<Activity[]>(initialActivities)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category_id: '',
    cover_url: '',
  })

  // Actividades filtradas
  const filteredActivities = filterCategory === 'all' 
    ? activities 
    : activities.filter(a => a.category_id === filterCategory)

  // Genera el slug automáticamente si está vacío basado en el título
  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData(prev => ({ ...prev, title, slug: prev.slug || slug }))
  }

  const handleEditClick = (activity: Activity) => {
    setIsEditing(activity.id)
    setFormData({
      title: activity.title,
      slug: activity.slug,
      description: activity.description || '',
      category_id: activity.category_id || '',
      cover_url: activity.cover_url || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setFormData({ title: '', slug: '', description: '', category_id: '', cover_url: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData(e.currentTarget)

    if (isEditing) {
      await updateActivity(isEditing, data)
    } else {
      await createActivity(data)
    }

    window.location.reload()
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleActivityActive(id, currentStatus)
    window.location.reload()
  }

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Editar Actividad' : 'Nueva Actividad'}
          </h3>
          {isEditing && (
            <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-700">
              Cancelar
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                placeholder="Ej: Navidad en Calles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text" 
                name="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                placeholder="navidad-en-calles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              >
                <option value="">Sin categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Portada</label>
              <div className="flex items-center gap-4">
                {formData.cover_url && (
                  <div className="relative w-12 h-12">
                    <Image 
                      src={formData.cover_url || '/mock/activity-1.jpg'} 
                      alt="Previa" 
                      fill
                      className="rounded-lg object-cover border border-gray-200" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  <input type="hidden" name="cover_url" value={formData.cover_url} />
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Breve</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" disabled={isLoading} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70">
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
              {isEditing ? 'Guardar Cambios' : 'Crear Actividad'}
            </button>
          </div>
        </form>
      </div>

      {/* Filtros y Lista */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Actividades</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filtrar por categoría:</span>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="all">Todas</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actividad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No se encontraron actividades.</td></tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id} className={!activity.is_active ? 'bg-gray-50 opacity-60' : ''}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Folder className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                          <div className="text-sm text-gray-500">/{activity.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {activity.categories?.name || <span className="italic text-gray-400">Sin categoría</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {activity.is_active ? 'Visible' : 'Oculto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link href={`/admin/activities/${activity.id}`} className="text-blue-600 hover:text-blue-900 flex items-center text-sm font-medium bg-blue-50 px-3 py-1 rounded-md">
                          Ver Años <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                        <button onClick={() => handleEditClick(activity)} className="text-gray-600 hover:text-gray-900"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleToggleActive(activity.id, activity.is_active)} className={activity.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}>
                          {activity.is_active ? <Trash2 className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
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
