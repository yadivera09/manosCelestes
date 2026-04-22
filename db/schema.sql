-- ==========================================
-- c:\Users\dayan\Downloads\manosCelestesWebsite\db\schema.sql
-- Modelo de Datos Principal - Manos Celestes
-- ==========================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Configuraciones Globales (Textos e imágenes de Hero, Nosotros, Involúcrte)
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key VARCHAR NOT NULL UNIQUE, -- ej: 'hero', 'nosotros', 'involucrate', 'global'
    title VARCHAR,
    subtitle TEXT,
    description TEXT,
    image_url VARCHAR, -- URL de Supabase Storage
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Estadísticas / Impacto
CREATE TABLE public.stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR NOT NULL, -- ej: 'Niños y Niñas', 'Mujeres Vulnerables'
    value INTEGER NOT NULL DEFAULT 0,
    icon VARCHAR, -- nombre del icono si aplica
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Equipo (Líder y Voluntarios)
CREATE TABLE public.team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    is_leader BOOLEAN NOT NULL DEFAULT false,
    photo_url VARCHAR,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Actividades Principales
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR, -- ej: 'Celebraciones', 'Ayuda Social', 'Conferencias'
    cover_url VARCHAR, -- Imagen principal de la tarjeta
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Años de Actividades (Historial)
CREATE TABLE public.activity_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    summary TEXT, -- Encabezado para la tarjeta
    description TEXT, -- ¿Qué hicimos en este año?
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(activity_id, year)
);

-- 6. Galería de Imágenes (Asociada a un año específico de una actividad)
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_year_id UUID NOT NULL REFERENCES public.activity_years(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    alt_text VARCHAR,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Mensajes de Contacto
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    subject VARCHAR,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true, -- Para soft delete en panel admin
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Categorías de Actividades
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL UNIQUE,
    slug VARCHAR NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- Triggers para updated_at
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_modtime BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_modtime BEFORE UPDATE ON public.stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_modtime BEFORE UPDATE ON public.team FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_modtime BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activity_years_modtime BEFORE UPDATE ON public.activity_years FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_modtime BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Modificación de actividades para usar category_id
ALTER TABLE public.activities ADD COLUMN category_id UUID REFERENCES public.categories(id);

-- ==========================================
-- Supabase Storage Buckets (Referencia para creación)
-- Nota: En producción, estos buckets se crean vía UI o scripts específicos,
-- pero los documentamos aquí como fuente de verdad.
-- Buckets requeridos:
-- 1. 'public-assets' (Público) -> Para Hero, Nosotros, etc.
-- 2. 'team-photos' (Público) -> Fotos del equipo.
-- 3. 'activity-gallery' (Público) -> Fotos de actividades y portadas.
-- ==========================================
