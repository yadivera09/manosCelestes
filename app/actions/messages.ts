'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMessages(includeInactive = false) {
  const supabase = createClient()
  let query = supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  
  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching messages:', error)
    return { error: error.message, data: [] }
  }

  return { data }
}

export async function markMessageAsRead(id: string, isRead: boolean = true) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: isRead })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function softDeleteMessage(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}
