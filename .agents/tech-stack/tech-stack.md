# tech-stack.md — Manos Celestes

## LENGUAJES
- TypeScript (estricto, sin `any`)
- SQL (PostgreSQL via Supabase)

---

## FRONTEND

| Herramienta | Versión | Uso |
|---|---|---|
| Next.js | 14 (App Router) | Framework principal |
| React | 18 | UI |
| Tailwind CSS | 3 | Estilos utilitarios |
| shadcn/ui | latest | Componentes base |
| Framer Motion | latest | Animaciones y transiciones |
| react-hook-form | latest | Formularios |
| zod | latest | Validación de esquemas |
| lucide-react | latest | Iconos |

---

## BACKEND / INFRAESTRUCTURA

| Herramienta | Uso |
|---|---|
| Supabase | Auth + DB + Storage |
| Next.js API Routes | Endpoints del CMS |
| Supabase JS v2 | Cliente en frontend y server |
| Resend (o Nodemailer) | Envío de emails desde formulario de contacto |

---

## TIPOGRAFÍA (Google Fonts via next/font)

```ts
// Tres fuentes, roles distintos:
Playfair_Display  → var(--font-display)  // Títulos h1–h3, impacto emocional
DM_Sans           → var(--font-body)     // Cuerpo, UI, formularios
Outfit            → var(--font-accent)   // Números estadísticos, labels técnicos
```

Nunca usar Inter, Roboto, Arial ni fuentes del sistema.

---

## PALETA DE COLORES (FUENTE DE VERDAD)

```ts
// tailwind.config.ts → theme.extend.colors
colors: {
  primary: {
    dark:   '#1E3A5F',  // Hero, footer, secciones oscuras
    medium: '#3A6EA5',  // Gradientes, bordes activos, hover
    light:  '#8EC5E8',  // Acentos, botones secundarios, focus ring
  },
  neutral: {
    cream:  '#F5E6D3',  // Nosotros, Contacto, fondos cálidos
    white:  '#FAFAFA',  // Texto sobre fondos oscuros
    text:   '#0F172A',  // Texto principal sobre fondos claros
    muted:  '#64748B',  // Texto secundario
  },
  accent: {
    green:  '#7FB77E',  // Íconos de vida/éxito, detalles positivos
    gold:   '#EAD7A1',  // Labels decorativos, hover en primario
    amber:  '#E88C2A',  // Barras de progreso, urgencia positiva
  },
}
```

### Gradiente oficial (Hero — obligatorio)
```css
background: linear-gradient(135deg, #1E3A5F 0%, #3A6EA5 55%, #8EC5E8 100%);
```

### Asignación fondo por sección
| Sección | Fondo | Texto |
|---|---|---|
| Hero | Gradiente oficial | `neutral.white` |
| Nosotros | `neutral.cream` | `neutral.text` |
| Stats | `primary.dark` | `neutral.white` |
| Actividades | `neutral.white` | `neutral.text` |
| Equipo | `primary.dark` | `neutral.white` |
| Contacto | `neutral.cream` | `neutral.text` |
| Footer | `#0F172A` | `neutral.white` |

---

## SISTEMA DE SOMBRAS

```css
/* En globals.css como variables CSS */
--shadow-sm: 0 2px 8px   rgba(30, 58, 95, 0.08);
--shadow-md: 0 4px 24px  rgba(30, 58, 95, 0.12);
--shadow-lg: 0 8px 40px  rgba(30, 58, 95, 0.18);
--shadow-xl: 0 16px 64px rgba(30, 58, 95, 0.22);
```

---

## SISTEMA DE ANIMACIONES

```ts
// lib/animations.ts — importar desde aquí, no redefinir en componentes

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.9, 0.4, 1] } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.2, 0.9, 0.4, 1] } },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
```

**Reglas de animación:**
- Hero: `initial/animate` con valores inline (no variants) para evitar conflictos de contexto
- Secciones: `whileInView` con `viewport={{ once: true }}`
- Nunca más de 3 elementos animando simultáneamente en una sección
- Duración máxima de entrada: 600ms
- No usar easing `bounce` — rompe el tono emocional

---

## COMPONENTES COMPARTIDOS

```
components/
├── shared/
│   ├── Button.tsx          → variantes: primary | secondary | action
│   ├── Container.tsx       → max-w-[1200px] + padding responsivo
│   ├── SectionWrapper.tsx  → background: gradient | cream | dark | white
│   └── CountUp.tsx         → contador animado para StatsSection
├── landing/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── StatsSection.tsx
│   ├── ActivitiesSection.tsx
│   ├── ActivityCard.tsx
│   ├── TeamSection.tsx
│   ├── TeamMemberCard.tsx
│   ├── LeaderCard.tsx
│   └── ContactSection.tsx
├── admin/
│   ├── AdminLayout.tsx
│   ├── AdminSidebar.tsx
│   └── [crud pages]
└── ui/                     → componentes shadcn/ui generados
```

---

## SISTEMA DE BOTONES

```css
/* Usar como className directamente */

.btn-primary {
  /* Sobre fondos oscuros: fondo blanco, texto dark */
  background: #FAFAFA; color: #1E3A5F;
  padding: 0.875rem 2rem; border-radius: 9999px;
  font: 600 0.95rem var(--font-body);
  transition: all 150ms ease;
}
.btn-primary:hover { background: #EAD7A1; transform: translateY(-2px); }

.btn-secondary {
  /* Sobre fondos oscuros: outline blanco */
  background: transparent; color: #FAFAFA;
  border: 1.5px solid rgba(250,250,250,0.6);
  padding: 0.875rem 2rem; border-radius: 9999px;
  font: 600 0.95rem var(--font-body);
  transition: all 150ms ease;
}
.btn-secondary:hover { border-color: #FAFAFA; background: rgba(250,250,250,0.08); }

.btn-action {
  /* Sobre fondos claros: fondo dark, texto blanco */
  background: #1E3A5F; color: #FAFAFA;
  padding: 0.875rem 2rem; border-radius: 9999px;
  font: 600 0.95rem var(--font-body);
  transition: all 150ms ease;
}
.btn-action:hover { background: #3A6EA5; transform: translateY(-2px); }
```

---

## ESTRUCTURA DE CARPETAS

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                          ← Landing principal
│   │   └── actividades/
│   │       └── [slug]/
│   │           ├── page.tsx                  ← Detalle de actividad + lista de años
│   │           └── [year]/
│   │               └── page.tsx              ← Galería del año
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx                      ← Dashboard
│   │       ├── actividades/
│   │       ├── equipo/
│   │       ├── stats/
│   │       ├── galeria/
│   │       └── mensajes/
│   ├── api/
│   │   ├── settings/
│   │   ├── stats/
│   │   ├── team/
│   │   ├── activities/
│   │   ├── gallery/
│   │   └── contact/
│   └── actions/
│       ├── contact.ts
│       └── auth.ts
├── components/
│   ├── shared/
│   ├── landing/
│   ├── admin/
│   └── ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── animations.ts
│   ├── validations/
│   └── utils.ts
├── types/
│   └── index.ts
├── db/
│   ├── schema.sql
│   └── seed.sql
└── public/
    ├── mock/
    ├── textures/
    └── videos/
```

---

## HERRAMIENTAS DE DESARROLLO

- ESLint + Prettier
- Git + GitHub
- Vercel (deploy)
- Supabase CLI (migraciones locales)