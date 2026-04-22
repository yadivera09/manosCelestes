'use client'

import { useState } from 'react'
import { markMessageAsRead, softDeleteMessage } from '@/app/actions/messages'
import { Mail, MailOpen, Trash2, Calendar } from 'lucide-react'

type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    await markMessageAsRead(id, !currentStatus)
    window.location.reload()
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este mensaje? No será visible en la lista principal.')) {
      await softDeleteMessage(id)
      if (selectedMessage?.id === id) setSelectedMessage(null)
      window.location.reload()
    }
  }

  const handleSelectMessage = async (msg: Message) => {
    setSelectedMessage(msg)
    if (!msg.is_read) {
      await markMessageAsRead(msg.id, true)
      // Actualizamos localmente para mejor UX sin recargar todo
      setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de Mensajes */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900">Bandeja de Entrada</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {messages.filter(m => !m.is_read).length} sin leer
          </span>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {messages.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              No tienes mensajes nuevos.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {messages.map((msg) => (
                <li 
                  key={msg.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'
                  }`}
                  onClick={() => handleSelectMessage(msg)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {msg.is_read ? (
                        <MailOpen className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      )}
                      <p className={`text-sm truncate max-w-[180px] ${!msg.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {msg.name}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(msg.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 truncate ${!msg.is_read ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                    {msg.subject || 'Sin Asunto'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Detalle del Mensaje */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[600px] flex flex-col">
        {selectedMessage ? (
          <>
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-start bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject || 'Sin Asunto'}</h2>
                <div className="mt-2 text-sm text-gray-600">
                  De: <span className="font-medium text-gray-900">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(selectedMessage.created_at).toLocaleString('es-ES')}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleMarkAsRead(selectedMessage.id, selectedMessage.is_read)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Marcar como {selectedMessage.is_read ? 'No Leído' : 'Leído'}
                </button>
                <button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-200 rounded hover:bg-red-50 transition-colors flex items-center"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Eliminar
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              <div className="prose text-gray-800 text-sm whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <a 
                href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Responder por Correo
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Mail className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-sm">Selecciona un mensaje de la lista para leerlo</p>
          </div>
        )}
      </div>
    </div>
  )
}
