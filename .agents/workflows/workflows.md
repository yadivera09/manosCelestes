---
description: 
---

# workflows.md — Manos Celestes

## PRINCIPIOS DE TRABAJO CON ANTIGRAVITY

1. **Un archivo por paso.** Nunca pedir más de un archivo en el mismo prompt.
2. **Leer antes de editar.** Siempre leer el archivo existente antes de modificarlo.
3. **Verificar imports.** Antes de usar un componente, confirmar que existe en `components/shared/index.ts`.
4. **No redefinir variantes de animación.** Importar siempre desde `lib/animations.ts`.
5. **Mocks primero.** En el Bloque 3 (landing) usar datos hardcodeados. La integración con Supabase va en el Bloque 7.

---

## BLOQUE 0 — BASE DE DATOS

**Orden de creación (respetar dependencias):**

```
Paso 0.1 → db/schema.sql
  Tablas en este orden:
  1. settings
  2. stats
  3. team
  4. activities
  5. activity_years  (FK → activities)
  6. gallery         (FK → activity_years)
  7. contact_messages

  Cada tabla incluye: id UUID PK, created_at, updated_at, is_active
  Triggers de updated_at al final del archivo

Paso 0.2 → db/seed.sql
  Insertar datos de prueba:
  - 1 setting (slogan)
  - Stats iniciales: niños 370, niñas 150, mujeres 50, adultos 50, total 620
  - Daniela Vera como líder + 3 voluntarios ficticios
  - 3 actividades con sus años
  - 5 imágenes de placeholder por año
```

---

## BLOQUE 1 — SISTEMA DE DISEÑO

**Orden obligatorio (no saltear pasos):**

```
Paso 1.1 → tailwind.config.ts
  - Paleta completa (primary, neutral, accent)
  - Variables de fuente (fontFamily con CSS vars)
  - Sombras personalizadas
  - Border radius extendido

Paso 1.2 → app/globals.css
  - Variables CSS (--shadow-sm/md/lg/xl)
  - Variables de fuente (--font-display, --font-body, --font-accent)
  - Escala tipográfica (.text-hero, .text-section, .text-subtitle, .text-label, .text-stat)
  - Clases de botones (.btn-primary, .btn-secondary, .btn-action)
  - prefers-reduced-motion

Paso 1.3 → app/layout.tsx
  - Configurar next/font: Playfair_Display, DM_Sans, Outfit
  - Aplicar variables CSS al body
  - Metadata del sitio (título, descripción, og)

Paso 1.4 → lib/animations.ts
  - Exportar: fadeUp, fadeIn, scaleUp, staggerContainer
```

---

## BLOQUE 2 — COMPONENTES COMPARTIDOS

```
Paso 2.1 → components/shared/Container.tsx
Paso 2.2 → components/shared/SectionWrapper.tsx
  Props: background: 'gradient' | 'cream' | 'dark' | 'white'
Paso 2.3 → components/shared/Button.tsx
  Props: variant: 'primary' | 'secondary' | 'action', size: 'sm' | 'md' | 'lg'
Paso 2.4 → components/shared/CountUp.tsx
  Props: end, duration?, suffix?, prefix?
  Usar useInView de framer-motion con once: true
Paso 2.5 → components/shared/index.ts
  Re-exportar todo lo anterior
```

---

## BLOQUE 3 — LANDING (sección por sección)

> Usar mocks hardcodeados. No conectar Supabase aún.

```
Paso 3.1 → components/landing/HeroSection.tsx
  - Gradiente oficial + textura noise
  - Label "— Protegiendo la vida —"
  - Título h1 con Playfair Display
  - 2 CTAs: "Empecemos" (btn-secondary) + "Ver video" (ghost)
  - VideoModal con video local
  - Scroll indicator animado
  - Imagen hero con badge overlay

Paso 3.2 → components/landing/AboutSection.tsx
  - Fondo neutral.cream
  - Split layout: texto izquierda, imagen derecha
  - Label + título en Playfair Display
  - Texto de misión + quote de Daniela Vera
  - Lista de 3 actividades principales con íconos

Paso 3.3 → components/shared/CountUp.tsx (si no existe aún)

Paso 3.4 → components/landing/StatsSection.tsx
  - Fondo primary.dark
  - 5 contadores: Niños (370), Niñas (150), Mujeres (50), Adultos (50), Total (620)
  - CountUp animado, fuente Outfit
  - Ícono lucide-react por categoría
  - Separadores verticales entre stats (desktop)
  - Frase motivacional al final

Paso 3.5 → components/landing/ActivityCard.tsx
  - Imagen aspect-ratio 16/9 con hover scale
  - Badge de categoría (absolute top-left)
  - Título en Playfair Display
  - Descripción con line-clamp-3
  - Link "Ver más →" con underline animation
  - Hover: y -6px + shadow-lg

Paso 3.6 → components/landing/ActivitiesSection.tsx
  - Fondo neutral.white
  - Grid de ActivityCards con stagger animation
  - 8 actividades mock
  - Cards con link a /actividades/[slug]

Paso 3.7 → components/landing/LeaderCard.tsx
  - Foto con border-radius 24px
  - Nombre en Playfair Display bold
  - Rol en DM Sans, color primary.light
  - Glassmorphism: bg rgba(255,255,255,0.06) + border rgba(142,197,232,0.2)

Paso 3.8 → components/landing/TeamMemberCard.tsx
  - Igual que LeaderCard pero más compacto
  - Hover: borde iluminado

Paso 3.9 → components/landing/TeamSection.tsx
  - Fondo primary.dark
  - Subsección "Nuestra Líder" → LeaderCard de Daniela Vera
  - Subsección "Nuestros Voluntarios" → grid de TeamMemberCards
  - Datos mock

Paso 3.10 → components/landing/ContactSection.tsx
  - Fondo neutral.cream
  - Split layout: info izquierda, formulario derecha
  - Campos: nombre, email, asunto, mensaje
  - react-hook-form + zod
  - Envío via server action → Resend
  - Estado de loading y confirmación

Paso 3.11 → app/(public)/page.tsx
  - Importar y ensamblar todas las secciones en orden
```

---

## BLOQUE 4 — RUTAS DE ACTIVIDADES

```
Paso 4.1 → app/(public)/actividades/[slug]/page.tsx
  - Server Component
  - Mostrar: nombre, descripción, categoría de la actividad
  - Grid de años disponibles como cards clicables
  - Cada año → link a /actividades/[slug]/[year]
  - Datos mock por ahora

Paso 4.2 → app/(public)/actividades/[slug]/[year]/page.tsx
  - Server Component
  - Mostrar: título del año, descripción del año
  - Galería de imágenes en grid masonry o grid uniforme
  - Botón "Volver a [nombre actividad]"
  - Datos mock por ahora
```

---

## BLOQUE 5 — PANEL ADMIN

```
Paso 5.1 → app/(admin)/admin/layout.tsx
  - Sidebar + protección de ruta (redirect si no hay sesión)

Paso 5.2 → components/admin/AdminSidebar.tsx
  - Links: Dashboard, Actividades, Equipo, Stats, Galería, Mensajes

Paso 5.3 → app/(admin)/admin/page.tsx
  - Dashboard con resumen de stats

Paso 5.4 → CRUDs en este orden:
  - /admin/stats      (editar contadores)
  - /admin/equipo     (CRUD team members)
  - /admin/actividades (CRUD actividades + años)
  - /admin/galeria    (subir/eliminar imágenes por año)
  - /admin/mensajes   (ver mensajes de contacto)
```

---

## BLOQUE 6 — BACKEND API

> Para cada entidad, crear en este orden: types → validation → endpoint

```
Paso 6.1 → types/index.ts (todos los tipos TypeScript)
Paso 6.2 → lib/validations/ (schemas zod por entidad)
Paso 6.3 → Endpoints (uno por paso):
  - app/api/stats/route.ts
  - app/api/team/route.ts
  - app/api/activities/route.ts
  - app/api/gallery/route.ts
  - app/api/contact/route.ts

Formato de respuesta estándar:
{ data: T | null, error: string | null, meta?: { total?: number } }
```

---

## BLOQUE 7 — INTEGRACIÓN CON SUPABASE

```
Paso 7.1 → lib/supabase/client.ts  (cliente browser)
Paso 7.2 → lib/supabase/server.ts  (cliente server con cookies)
Paso 7.3 → Reemplazar mocks en landing (sección por sección)
Paso 7.4 → Reemplazar mocks en rutas de actividades
Paso 7.5 → Conectar admin CRUDs con Supabase
Paso 7.6 → Configurar Supabase Storage para imágenes
Paso 7.7 → Implementar Auth en panel admin
```

---

## BLOQUE 8 — VERIFICACIÓN

```
Checklist final:
[ ] Tipografía: Playfair Display en h1-h3, DM Sans en body, Outfit en números
[ ] Colores: ninguno fuera de la paleta oficial
[ ] Alternancia secciones claro/oscuro correcta
[ ] Animaciones: viewport={{ once: true }} en todos los whileInView
[ ] Contadores: todos usan <CountUp />
[ ] Imágenes: todas con next/image, Hero con priority
[ ] Formulario contacto: validación + envío funcionando
[ ] Admin: CRUD completo operativo
[ ] Responsive: 375px, 768px, 1024px, 1440px
[ ] prefers-reduced-motion implementado
[ ] Sin console.log en producción
[ ] Sin TypeScript errors
```

---

## PROMPT BASE PARA CADA SECCIÓN

Usar esta estructura al pedirle a Antigravity que cree una sección:

```
Crea [NombreComponente].tsx siguiendo estas reglas:

LEER ANTES DE CREAR:
- rules.md
- tech-stack.md
- components/shared/index.ts (para verificar imports disponibles)
- lib/animations.ts (para verificar variantes disponibles)

DATOS: Usar mocks hardcodeados (no Supabase aún)
FONDO: [según tabla de secciones en tech-stack.md]
ANIMACIONES: whileInView con viewport={{ once: true }}
             NO usar variants en hijos directos si el padre ya tiene initial/animate propio
             Para animaciones independientes usar valores inline: initial={{ opacity: 0, y: 24 }}

RESTRICCIONES:
- Sin any en TypeScript
- Sin console.log
- Un solo archivo como resultado
- Incluir ruta completa como comentario en línea 1
```