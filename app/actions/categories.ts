// app/actions/categories.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCategories(includeInactive = true) {
  const supabase = createClient()
  let query = supabase.from('categories').select('*').order('name', { ascending: true })
  
  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  return { data, error: error?.message }
}

export async function createCategory(formData: FormData) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  const { error } = await supabase
    .from('categories')
    .insert([{ 
      name, 
      slug, 
      description, 
      is_active: true 
    }])

  if (error) return { error: error.message }

  revalidatePath('/admin/categories')
  revalidatePath('/admin/activities')
  return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  const { error } = await supabase
    .from('categories')
    .update({ name, slug, description, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/categories')
  revalidatePath('/admin/activities')
  revalidatePath(`/categorias/${slug}`)
  return { success: true }
}

export async function toggleCategoryActive(id: string, currentStatus: boolean) {
  const supabase = createClient()
  const { error } = await supabase
    .from('categories')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/categories')
  return { success: true }
}
