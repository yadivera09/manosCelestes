'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/supabase/storage'

// --- ACTIVITIES ---

export async function getActivities(includeInactive = true) {
  const supabase = createClient()
  let query = supabase
    .from('activities')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })
  
  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  return { data, error: error?.message }
}

export async function getActivityById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('activities').select('*, categories(name)').eq('id', id).single()
  return { data, error: error?.message }
}

export async function createActivity(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const category_id = formData.get('category_id') as string
  const existingCoverUrl = formData.get('cover_url') as string
  const imageFile = formData.get('image') as File

  let cover_url = existingCoverUrl

  if (imageFile && imageFile.size > 0) {
    try {
      cover_url = await uploadFile(supabase, imageFile, 'activity-gallery', `cover-${slug}`)
    } catch (err) {
      console.error(err)
      return { error: 'Error al subir la portada' }
    }
  }

  const { error, data } = await supabase
    .from('activities')
    .upsert({ 
      title, 
      slug, 
      description, 
      category_id: category_id || null, 
      cover_url, 
      is_active: true,
      updated_at: new Date().toISOString()
    }, { onConflict: 'slug' })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/activities')
  revalidatePath('/')
  return { success: true, id: data.id }
}

export async function updateActivity(id: string, formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const category_id = formData.get('category_id') as string
  const existingCoverUrl = formData.get('cover_url') as string
  const imageFile = formData.get('image') as File

  let cover_url = existingCoverUrl

  if (imageFile && imageFile.size > 0) {
    try {
      cover_url = await uploadFile(supabase, imageFile, 'activity-gallery', `cover-${slug}`)
    } catch (err) {
      console.error(err)
      return { error: 'Error al subir la portada' }
    }
  }

  const { error } = await supabase
    .from('activities')
    .update({ 
      title, 
      slug, 
      description, 
      category_id: category_id || null, 
      cover_url, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/activities')
  revalidatePath('/')
  return { success: true }
}

export async function toggleActivityActive(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('activities')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/activities')
  return { success: true }
}

// --- ACTIVITY YEARS ---

export async function getActivityYears(activityId: string, includeInactive = true) {
  const supabase = createClient()
  let query = supabase.from('activity_years').select('*').eq('activity_id', activityId).order('year', { ascending: false })
  
  if (!includeInactive) query = query.eq('is_active', true)

  const { data, error } = await query
  return { data, error: error?.message }
}

export async function createActivityYear(activityId: string, formData: FormData) {
  const supabase = createClient()
  
  const year = parseInt(formData.get('year') as string)
  const description = formData.get('description') as string

  // Usamos upsert para que si el año ya existe (aunque esté inactivo), lo reactive y actualice
  const { error, data } = await supabase
    .from('activity_years')
    .upsert({ 
      activity_id: activityId, 
      year, 
      description, 
      is_active: true,
      updated_at: new Date().toISOString()
    }, { onConflict: 'activity_id, year' })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath(`/admin/activities/${activityId}`)
  return { success: true, id: data.id }
}

export async function toggleActivityYearActive(id: string, currentStatus: boolean, activityId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('activity_years')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath(`/admin/activities/${activityId}`)
  return { success: true }
}

export async function updateActivityYearContent(id: string, formData: FormData, activityId: string) {
  const supabase = createClient()
  const summary = formData.get('summary') as string
  const description = formData.get('description') as string

  const { error } = await supabase
    .from('activity_years')
    .update({ summary, description, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  
  revalidatePath(`/admin/activities/${activityId}`)
  revalidatePath(`/admin/activities/${activityId}/years/${id}`)
  return { success: true }
}

// --- GALLERY ---

export async function getGalleryImages(activityYearId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('activity_year_id', activityYearId)
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return { data, error: error?.message }
}

export async function addGalleryImage(activityYearId: string, formData: FormData) {
  const supabase = createClient()
  
  const existingImageUrl = formData.get('image_url') as string
  const imageFile = formData.get('image') as File
  const alt_text = formData.get('alt_text') as string
  const display_order = parseInt(formData.get('display_order') as string) || 0

  let image_url = existingImageUrl

  if (imageFile && imageFile.size > 0) {
    try {
      image_url = await uploadFile(supabase, imageFile, 'activity-gallery', `gallery-${activityYearId}`)
    } catch (err) {
      console.error(err)
      return { error: 'Error al subir la imagen a la galería' }
    }
  }

  const { error } = await supabase
    .from('gallery')
    .insert([{ activity_year_id: activityYearId, image_url, alt_text, display_order, is_active: true }])

  if (error) return { error: error.message }

  revalidatePath(`/admin/activities`) // Podría ser más específico si tuviéramos la ruta
  return { success: true }
}

export async function deleteGalleryImage(id: string) {
  // Aquí sí podemos borrar físicamente la imagen de la base de datos si lo deseamos,
  // pero mantendremos la regla de is_active por seguridad.
  const supabase = createClient()
  const { error } = await supabase
    .from('gallery')
    .update({ is_active: false })
    .eq('id', id)

  if (error) return { error: error.message }
  return { success: true }
}
