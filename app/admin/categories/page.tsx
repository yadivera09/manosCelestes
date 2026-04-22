// app/admin/categories/page.tsx
import { getCategories } from "@/app/actions/categories"
import CategoriesClient from "./CategoriesClient"

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const { data: categories, error } = await getCategories()

  if (error) {
    return <div className="p-8 text-red-500">Error cargando categorías: {error}</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A2A3A]">Gestión de Categorías</h1>
        <p className="text-gray-500">Administra las categorías y sus descripciones para las actividades.</p>
      </div>

      <CategoriesClient initialCategories={categories || []} />
    </div>
  )
}
