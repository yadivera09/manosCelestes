// c:\Users\dayan\Downloads\manosCelestesWebsite\lib\supabase\middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: Esto asegura que el token sea actualizado si está expirando.
  // getSession es suficiente, pero getUser protege más y refresca mejor.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Proteger la ruta de administrador
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Si no hay usuario logueado, enviar al login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    
    // Aquí podrías agregar validación de rol de admin si lo configuras en auth.users
    // por ejemplo verificando un campo "role" o "is_admin" en metadata
  }

  // Redirigir a /admin si el usuario ya está logueado e intenta ir a /login
  if (request.nextUrl.pathname.startsWith('/login')) {
     if (user) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
     }
  }

  return supabaseResponse
}
