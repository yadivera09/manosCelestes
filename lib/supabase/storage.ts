import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Sube un archivo a un bucket de Supabase Storage y retorna la URL pública.
 * @param supabase El cliente de Supabase (servidor o cliente)
 * @param file El archivo a subir
 * @param bucket El nombre del bucket (public-assets, team-photos, activity-gallery)
 * @param path La ruta/nombre del archivo dentro del bucket
 */
export async function uploadFile(supabase: SupabaseClient, file: File, bucket: string, path: string) {

  // Limpiar el nombre del archivo de caracteres especiales (acentos, ñ, espacios)
  const cleanPath = path
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-zA-Z0-9-]/g, '-') // Reemplaza todo lo no alfanumérico por guiones
    .toLowerCase()

  const fileExt = file.name.split('.').pop()
  const fileName = `${cleanPath}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = fileName

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Error al subir imagen: ${error.message}`)
  }

  // Obtener la URL pública
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}

/**
 * Elimina un archivo de Supabase Storage dada su URL pública.
 */
export async function deleteFileFromUrl(supabase: SupabaseClient, url: string, bucket: string) {
  
  // Extraer el nombre del archivo de la URL
  // Ejemplo: https://xyz.supabase.co/storage/v1/object/public/bucket/filename.jpg
  const parts = url.split('/')
  const fileName = parts[parts.length - 1]

  if (!fileName) return

  await supabase.storage
    .from(bucket)
    .remove([fileName])
}
