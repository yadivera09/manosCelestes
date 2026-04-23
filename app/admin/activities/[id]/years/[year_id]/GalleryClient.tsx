'use client'

import { useState } from 'react'
import { addGalleryImage, deleteGalleryImage } from '@/app/actions/activities'
import { Loader2, Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

type GalleryImage = {
  id: string
  activity_year_id: string
  image_url: string
  alt_text: string | null
  display_order: number
}

export function GalleryClient({ 
  activityYearId, 
  initialImages 
}: { 
  activityYearId: string, 
  initialImages: GalleryImage[] 
}) {
  const [images] = useState<GalleryImage[]>(initialImages)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ image_url: '', alt_text: '', display_order: 0 })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData(e.currentTarget)

    await addGalleryImage(activityYearId, data)
    window.location.reload()
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de quitar esta imagen de la galería?')) {
      await deleteGalleryImage(id)
      window.location.reload()
    }
  }

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-blue-600" /> Agregar Nueva Foto
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Imagen</label>
            <input
              type="file" required
              name="image"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Texto Alt (Accesibilidad)</label>
            <input
              type="text"
              name="alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData({...formData, alt_text: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              placeholder="Descripción de la foto"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center px-4 py-2 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5 mr-1" />}
              Subir
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No hay imágenes en esta galería.
          </div>
        ) : (
          images.map((img) => (
            <div key={img.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-sm">
              <Image 
                src={img.image_url || '/mock/activity-1.jpg'} 
                alt={img.alt_text || 'Galería'} 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="text-white text-xs font-medium">Orden: {img.display_order}</div>
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="self-end p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  title="Eliminar Foto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
