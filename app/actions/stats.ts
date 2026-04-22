'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getStats(includeInactive = true) {
  const supabase = createClient()
  let query = supabase.from('stats').select('*').order('display_order', { ascending: true })
  
  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching stats:', error)
    return { error: error.message, data: [] }
  }

  return { data }
}

export async function createStat(formData: FormData) {
  const supabase = createClient()
  
  const label = formData.get('label') as string
  const value = parseInt(formData.get('value') as string) || 0
  const icon = formData.get('icon') as string
  const display_order = parseInt(formData.get('display_order') as string) || 0

  const { error } = await supabase
    .from('stats')
    .insert([{ label, value, icon, display_order, is_active: true }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/stats')
  return { success: true }
}

export async function updateStat(id: string, formData: FormData) {
  const supabase = createClient()
  
  const label = formData.get('label') as string
  const value = parseInt(formData.get('value') as string) || 0
  const icon = formData.get('icon') as string
  const display_order = parseInt(formData.get('display_order') as string) || 0

  const { error } = await supabase
    .from('stats')
    .update({ label, value, icon, display_order, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/stats')
  return { success: true }
}

export async function toggleStatActive(id: string, currentStatus: boolean) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('stats')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/stats')
  return { success: true }
}
