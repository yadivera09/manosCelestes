'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/supabase/storage'

export async function getSettings() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .order('section_key', { ascending: true })

  if (error) {
    console.error('Error fetching settings:', error)
    return { error: error.message }
  }

  interface Setting {
    id: string
    section_key: string
    title: string | null
    subtitle: string | null
    description: string | null
    image_url: string | null
    updated_at: string
  }

  // Convertir a un objeto clave-valor para fácil acceso
  const settingsMap = (data as Setting[]).reduce((acc, curr) => {
    acc[curr.section_key] = curr
    return acc
  }, {} as Record<string, Setting>)

  return { data: settingsMap }
}

export async function updateSetting(sectionKey: string, formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  const description = formData.get('description') as string
  const existingImageUrl = formData.get('image_url') as string
  const imageFile = formData.get('image') as File
  
  let imageUrl = existingImageUrl

  // Si se subió una nueva imagen
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadFile(supabase, imageFile, 'public-assets', sectionKey)
    } catch (err) {
      console.error(err)
      return { error: 'Error al subir la imagen' }
    }
  }

  const { error } = await supabase
    .from('settings')
    .upsert({ 
      section_key: sectionKey, 
      title, 
      subtitle, 
      description, 
      image_url: imageUrl,
      updated_at: new Date().toISOString()
    }, { onConflict: 'section_key' })

  if (error) {
    console.error('Error updating setting:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/settings')
  
  return { success: true }
}
