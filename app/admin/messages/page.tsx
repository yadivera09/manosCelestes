import { getMessages } from '@/app/actions/messages'
import { MessagesClient } from './MessagesClient'

export default async function MessagesPage() {
  const { data: messages } = await getMessages(false)

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bandeja de Mensajes</h1>
        <p className="mt-2 text-gray-600">
          Aquí puedes ver los mensajes enviados por los usuarios a través del formulario de la sección &quot;Contáctanos&quot;.
        </p>
      </div>

      <MessagesClient initialMessages={messages || []} />
    </div>
  )
}
