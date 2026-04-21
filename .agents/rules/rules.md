---
trigger: always_on
---

# rules.md — Manos Celestes

## IDENTIDAD DEL PROYECTO
- **Nombre:** Manos Celestes
- **Tipo:** Sitio web institucional + panel administrador (CMS)
- **Eslogan:** "Existimos para incentivar y fomentar activamente la protección de la vida"
- **Líder:** Daniela Vera
- **Antigüedad:** 5 años activos
- **Misión:** Defensa de la vida y la familia; actividades sociales para niños, madres,
  adultos mayores y comunidades vulnerables
- **Stack:** Next.js 14 · Supabase · Tailwind CSS · shadcn/ui · Framer Motion

---

## REGLAS GENERALES

1. Nunca generar múltiples archivos en un mismo paso — un archivo por respuesta.
2. Nunca asumir existencia de tablas, endpoints o componentes sin verificar primero.
3. La base de datos en `db/schema.sql` es la única fuente de verdad del modelo de datos.
4. Todos los IDs deben ser UUID (`gen_random_uuid()`).
5. Todas las fechas usan `TIMESTAMPTZ`.
6. Ningún contenido público se elimina físicamente — usar `is_active = false`.
7. Toda imagen se guarda en Supabase Storage, nunca en base64 en la DB.
8. Ante cualquier ambigüedad → detener y pedir aclaración antes de proceder.
9. Todo archivo generado debe incluir su ruta completa como comentario en la primera línea.
10. Mantener separación clara entre contenido estático (copy fijo) y dinámico (CMS).
11. No usar `any` en TypeScript. Tipado estricto siempre.
12. No dejar `console.log` de debug en código entregado.

---

## ARQUITECTURA DE SECCIONES (LANDING)

El sitio tiene las siguientes secciones en orden:

| # | ID | Nombre visible | Fondo | Notas |
|---|---|---|---|---|
| 1 | `#inicio` | Hero | Gradiente oficial | min-h-100vh |
| 2 | `#nosotros` | Acerca de / Nosotros | `neutral.cream` | Split layout |
| 3 | `#impacto` | Beneficiados / Stats | `primary.dark` | CountUp animado |
| 4 | `#actividades` | Actividades | `neutral.white` | Cards con navegación |
| 5 | `#equipo` | Nuestro Grupo | `primary.dark` | Líder + voluntarios |
| 6 | `#contacto` | Contáctanos | `neutral.cream` | Formulario + email |

**No existe sección de Galería separada.**
La galería vive dentro del flujo de Actividades:
`/actividades/[slug]` → `/actividades/[slug]/[year]`

---

## FLUJO DE ACTIVIDADES (jerárquico)

```
Landing (ActivitiesSection)
  └── Card "Navidad en Calles" → click
        └── /actividades/navidad-en-calles
              └── Lista de años: 2024, 2023, 2022, 2021, 2020
                    └── /actividades/navidad-en-calles/2024
                          └── Galería de imágenes + descripción del año
```

Actividades existentes (slugs):
- `dia-de-la-madre`
- `distribucion-solidaria`
- `dia-del-padre`
- `conferencia-ataques-familia`
- `charla-provida`
- `navidad-en-calles` ← tiene múltiples años (2020–2024)
- `dia-del-nino`
- `donacion-viveres-geriatrico`

---

## MODELO DE DATOS (resumen)

```
settings        → textos globales editables (slogan, misión, etc.)
stats           → contadores (niños, niñas, mujeres, adultos, total)
team            → líder + voluntarios (nombre, rol, foto, orden)
activities      → actividades (nombre, slug, descripción, categoría, is_active)
activity_years  → años de una actividad (activity_id, year, description)
gallery         → imágenes (activity_year_id, url, alt, orden)
contact_messages → mensajes del formulario (nombre, email, asunto, mensaje)
```

---

## PANEL ADMINISTRADOR

Ruta base: `/admin`
Solo existe el rol **administrador**.

Permisos:
- Editar textos globales (settings)
- Editar contadores (stats)
- CRUD completo de actividades y años
- Subir / eliminar imágenes de galería
- CRUD de equipo (líder y voluntarios)
- Ver mensajes de contacto

**No existe registro público.** El admin accede solo via Supabase Auth.

---

## REGLAS DE CÓDIGO

- TypeScript estricto — sin `any`, sin `@ts-ignore`
- Componentes → PascalCase (`HeroSection.tsx`)
- Hooks y utils → camelCase (`useCountUp.ts`)
- Sin lógica de negocio en componentes UI puros
- Formularios → `react-hook-form` + `zod`
- Server actions en `/app/actions/`
- Fetching de datos → Server Components por defecto; Client solo cuando hay interactividad
- Imágenes siempre con `next/image`; Hero con `priority`

---

## REGLAS UX/UI

- Diseño emocional: humano, cálido, esperanzador — nunca frío ni corporativo
- Secciones alternan fondo claro / oscuro sin excepciones (ver tabla de secciones)
- Cada sección responde una pregunta emocional:
  - Hero → ¿Qué es esto y por qué me importa?
  - Nosotros → ¿Quiénes son?
  - Stats → ¿Están haciendo algo real?
  - Actividades → ¿Cómo ayudan concretamente?
  - Equipo → ¿Hay personas reales detrás?
  - Contacto → ¿Cómo puedo sumarme?
- Mobile-first. Breakpoints: 375px · 768px · 1024px · 1440px
- Accesibilidad: `alt` en todas las imágenes, `aria-label` en botones sin texto visible,
  `focus-visible` con outline usando `primary.light`, `prefers-reduced-motion` respetado

---

## ORDEN DE DESARROLLO

```
BLOQUE 0 — Base de datos (schema.sql + seeders)
BLOQUE 1 — Sistema de diseño (tailwind.config + globals.css + fuentes)
BLOQUE 2 — Componentes compartidos (Button, Container, SectionWrapper, CountUp)
BLOQUE 3 — Landing (sección por sección en orden)
BLOQUE 4 — Rutas de actividades (/actividades/[slug] y /actividades/[slug]/[year])
BLOQUE 5 — Panel admin (layout + CRUDs)
BLOQUE 6 — Backend API (endpoints + validaciones zod)
BLOQUE 7 — Integración (reemplazar mocks por datos reales de Supabase)
BLOQUE 8 — Verificación y optimización
```