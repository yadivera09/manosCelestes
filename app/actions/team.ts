'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/supabase/storage'

export async function getTeam(includeInactive = true) {
  const supabase = createClient()
  let query = supabase.from('team').select('*').order('is_leader', { ascending: false }).order('display_order', { ascending: true })
  
  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching team:', error)
    return { error: error.message, data: [] }
  }

  return { data }
}

export async function createTeamMember(formData: FormData) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const existingPhotoUrl = formData.get('photo_url') as string
  const imageFile = formData.get('image') as File
  const is_leader = formData.get('is_leader') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  let photo_url = existingPhotoUrl

  if (imageFile && imageFile.size > 0) {
    try {
      photo_url = await uploadFile(supabase, imageFile, 'team-photos', name.toLowerCase().replace(/\s+/g, '-'))
    } catch (err) {
      console.error(err)
      return { error: 'Error al subir la foto' }
    }
  }

  const { error } = await supabase
    .from('team')
    .insert([{ name, role, photo_url, is_leader, display_order, is_active: true }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}

export async function updateTeamMember(id: string, formData: FormData) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const existingPhotoUrl = formData.get('photo_url') as string
  const imageFile = formData.get('image') as File
  const is_leader = formData.get('is_leader') === 'true'
  const display_order = parseInt(formData.get('display_order') as string) || 0

  let photo_url = existingPhotoUrl

  if (imageFile && imageFile.size > 0) {
    try {
      photo_url = await uploadFile(supabase, imageFile, 'team-photos', name.toLowerCase().replace(/\s+/g, '-'))
    } catch (err) {
      console.error(err)
      return { error: 'Error al subir la foto' }
    }
  }

  const { error } = await supabase
    .from('team')
    .update({ name, role, photo_url, is_leader, display_order, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}

export async function toggleTeamMemberActive(id: string, currentStatus: boolean) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('team')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}
