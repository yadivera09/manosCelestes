# Mock Assets — Manos Celestes

> Imágenes de desarrollo generadas con IA.
> Se reemplazarán por imágenes reales subidas desde el panel admin (Supabase Storage) en BLOQUE 3.

---

## Estructura

```
public/
└── mock/
    ├── hero.jpg        → Sección Hero (landing)
    ├── about.jpg       → Sección Nosotros
    ├── activity-1.jpg  → Sección Actividades (primera tarjeta)
    └── team-1.jpg      → Sección Equipo (primera tarjeta de integrante)
```

---

## Uso en Next.js

### Opción A — `next/image` (recomendada en producción)

```tsx
import Image from "next/image";

// Hero
<Image
  src="/mock/hero.jpg"
  alt="Voluntarios de Manos Celestes ayudando a niños"
  width={1280}
  height={720}
  priority
  className="w-full h-full object-cover rounded-2xl"
/>

// About
<Image
  src="/mock/about.jpg"
  alt="Equipo de Manos Celestes reunido"
  width={800}
  height={600}
  className="w-full object-cover shadow-card rounded-3xl"
/>

// Activity card
<Image
  src="/mock/activity-1.jpg"
  alt="Actividad comunitaria de Manos Celestes"
  width={600}
  height={400}
  className="w-full h-48 object-cover rounded-2xl"
/>

// Team member card
<Image
  src="/mock/team-1.jpg"
  alt="Integrante del equipo"
  width={300}
  height={300}
  className="w-24 h-24 rounded-full object-cover shadow-soft"
/>
```

### Opción B — `<img>` estándar (solo mocks, no usar en producción)

```tsx
<img
  src="/mock/hero.jpg"
  alt="Voluntarios de Manos Celestes"
  className="w-full h-full object-cover rounded-2xl"
/>
```

---

## Convención de nombres (para datos reales)

Cuando se integre Supabase Storage (BLOQUE 3), las rutas cambiarán a:

```
https://<project>.supabase.co/storage/v1/object/public/images/<categoria>/<uuid>.jpg
```

El campo `imagen_url` en cada tabla (`activities`, `team`, `gallery`) almacenará esa URL completa.
Para desarrollo, las mismas columnas pueden contener rutas `/mock/...`.

---

## Plan de uso por sección

| Sección       | Mock actual              | Campo DB futuro              |
|---------------|--------------------------|------------------------------|
| Hero          | `/mock/hero.jpg`         | `settings.hero_imagen_url`   |
| Nosotros      | `/mock/about.jpg`        | `settings.about_imagen_url`  |
| Actividades   | `/mock/activity-1.jpg`   | `activities.imagen_url`      |
| Equipo        | `/mock/team-1.jpg`       | `team.foto_url`              |
| Galería       | *(generadas en BLOQUE 1)*| `gallery.imagen_url`         |
