'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  Users, 
  CalendarHeart, 
  MessageSquare,
  Tag,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Configuración Global', href: '/admin/settings', icon: Settings },
  { name: 'Estadísticas (Impacto)', href: '/admin/stats', icon: BarChart3 },
  { name: 'Equipo', href: '/admin/team', icon: Users },
  { name: 'Actividades', href: '/admin/activities', icon: CalendarHeart },
  { name: 'Categorías', href: '/admin/categories', icon: Tag },
  { name: 'Mensajes', href: '/admin/messages', icon: MessageSquare },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
        <span className="text-xl font-bold text-gray-900">MC Admin</span>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out flex flex-col
        md:translate-x-0 md:static md:w-64
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200 bg-gray-50">
          <span className="text-xl font-bold text-gray-900">Manos Celestes</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              // Exact match para dashboard, startsWith para los demás
              const isActuallyActive = item.href === '/admin' ? pathname === '/admin' : isActive

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActuallyActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`
                      mr-3 flex-shrink-0 h-5 w-5
                      ${isActuallyActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => logout()}
            className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-400 group-hover:text-red-500" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
