'use client'

import { useState } from 'react'
import { createTeamMember, updateTeamMember, toggleTeamMemberActive } from '@/app/actions/team'
import { Loader2, Plus, Edit2, Trash2, CheckCircle2, UserCircle } from 'lucide-react'
import Image from 'next/image'

type TeamMember = {
  id: string
  name: string
  role: string
  is_leader: boolean
  photo_url: string | null
  display_order: number
  is_active: boolean
}

export function TeamClient({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [team] = useState<TeamMember[]>(initialTeam)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    is_leader: false,
    photo_url: '',
    display_order: 0,
  })

  const handleEditClick = (member: TeamMember) => {
    setIsEditing(member.id)
    setFormData({
      name: member.name,
      role: member.role,
      is_leader: member.is_leader,
      photo_url: member.photo_url || '',
      display_order: member.display_order,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setFormData({ name: '', role: '', is_leader: false, photo_url: '', display_order: 0 })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData(e.currentTarget)

    if (isEditing) {
      await updateTeamMember(isEditing, data)
    } else {
      await createTeamMember(data)
    }

    window.location.reload()
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleTeamMemberActive(id, currentStatus)
    window.location.reload()
  }

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Editar Miembro del Equipo' : 'Nuevo Miembro'}
          </h3>
          {isEditing && (
            <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-700">
              Cancelar edición
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: Juan Pérez"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol / Cargo</label>
              <input
                type="text"
                name="role"
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: Voluntario / Psicóloga"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orden (Menor sale primero)</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto del Miembro</label>
              <div className="flex items-center gap-4">
                {formData.photo_url && (
                  <div className="relative w-12 h-12">
                    <Image 
                      src={formData.photo_url || '/mock/about.jpeg'} 
                      alt="Previa" 
                      fill
                      className="rounded-full object-cover border border-gray-200" 
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
                  <input type="hidden" name="photo_url" value={formData.photo_url} />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_leader"
                  value="true"
                  checked={formData.is_leader}
                  onChange={(e) => setFormData({...formData, is_leader: e.target.checked})}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">¿Es Líder Principal?</span>
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
              {isEditing ? 'Actualizar Miembro' : 'Agregar Miembro'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista del Equipo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Listado del Equipo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Líder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No hay miembros en el equipo aún. Agrega uno arriba.
                  </td>
                </tr>
              ) : (
                team.map((member) => (
                  <tr key={member.id} className={!member.is_active ? 'bg-gray-50 opacity-60' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.photo_url ? (
                        <div className="relative w-10 h-10">
                          <Image 
                            src={member.photo_url || '/mock/about.jpeg'} 
                            alt={member.name} 
                            fill
                            className="rounded-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          <UserCircle className="w-6 h-6" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.is_leader ? (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Líder</span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(member.id, member.is_active)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {member.is_active ? 'Visible' : 'Oculto'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleEditClick(member)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(member.id, member.is_active)}
                          className={`${member.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {member.is_active ? <Trash2 className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
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
