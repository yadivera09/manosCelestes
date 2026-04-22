'use client'

import { useState } from 'react'
import { updateSetting } from '@/app/actions/settings'
import { Loader2, Save } from 'lucide-react'

type SettingsFormProps = {
  sectionKey: string
  sectionName: string
  initialData?: {
    title?: string
    subtitle?: string
    description?: string
    image_url?: string
  }
}

export function SettingsForm({ sectionKey, sectionName, initialData }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateSetting(sectionKey, formData)

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'Guardado correctamente' })
      setTimeout(() => setMessage(null), 3000)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">{sectionName}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Título */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              defaultValue={initialData?.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Ej: Manos Celestes"
            />
          </div>

          {/* Subtítulo */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo o Slogan</label>
            <input
              type="text"
              name="subtitle"
              defaultValue={initialData?.subtitle}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Ej: Ayudando a los más necesitados"
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Texto Principal</label>
            <textarea
              name="description"
              rows={4}
              defaultValue={initialData?.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
              placeholder="Escribe el texto descriptivo de la sección..."
            />
          </div>

          {/* Subida de Imagen */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen de la sección
            </label>
            
            <div className="flex items-center gap-6">
              {initialData?.image_url && (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={initialData.image_url} 
                    alt="Vista previa" 
                    className="w-full h-full object-cover"
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
                <input type="hidden" name="image_url" defaultValue={initialData?.image_url} />
                <p className="mt-1 text-xs text-gray-500">
                  Formatos aceptados: JPG, PNG, WEBP. Máximo 5MB.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {message && (
              <span className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}
