import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = createClient()
  
  // Aquí podríamos obtener un resumen de datos
  // const { count: totalActivities } = await supabase.from('activities').select('*', { count: 'exact', head: true })
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bienvenido al Panel de Administración</h1>
        <p className="mt-2 text-sm text-gray-600">
          Desde aquí puedes gestionar todo el contenido de la página web de Manos Celestes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjetas de Resumen (Mocks por ahora) */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1 text-left">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Siguiente Paso</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Configurar Supabase
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 text-sm">
            Crea tu proyecto y añade las variables de entorno.
          </div>
        </div>
      </div>
    </div>
  )
}
