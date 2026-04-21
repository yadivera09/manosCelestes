// lib/activitiesData.ts

export type GalleryImage = {
  src: string;
  alt: string;
};

export type ActivityYear = {
  year: number;
  description: string;
  images: GalleryImage[];
};

export type Activity = {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  years: ActivityYear[];
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  hashtag: string;
  activities: Activity[];
};

// ─── Mock gallery images (cycling through available mock images) ───────────────
const mockImages = (count: number, altPrefix: string): GalleryImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/mock/activity-${(i % 6) + 1}.jpg`,
    alt: `${altPrefix} — foto ${i + 1}`,
  }));

// ─── DATA ──────────────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  // ── CELEBRACIONES ────────────────────────────────────────────────────────────
  {
    slug: "celebraciones",
    name: "Celebraciones",
    tagline:
      "Honramos a las familias de la comunidad con eventos llenos de alegría, juegos y unidad.",
    hashtag: "#Familia",
    activities: [
      {
        slug: "dia-del-nino",
        name: "Día del Niño",
        description:
          "Un día lleno de sonrisas, juegos y regalos para los más pequeños de la comunidad.",
        coverImage: "/mock/activity-1.jpg",
        years: [
          {
            year: 2024,
            description:
              "En 2024 celebramos el Día del Niño con más de 150 pequeños en el sector La Pastora. Organizamos juegos tradicionales, pintura facial, distribuimos kits escolares y concluimos con una piñata gigante. Cada niño recibió un kit de útiles y una lonchera nutritiva de la mano de nuestros voluntarios.",
            images: mockImages(8, "Día del Niño 2024"),
          },
          {
            year: 2023,
            description:
              "La celebración 2023 congregó a familias de tres comunidades. Los niños participaron en talleres de arte, teatro de marionetas y una carrera de obstáculos. Contamos con el apoyo de la alcaldía y empresas locales que donaron juguetes y refrigerios.",
            images: mockImages(6, "Día del Niño 2023"),
          },
          {
            year: 2022,
            description:
              "Primera gran celebración pos-pandemia. Volvimos con energía renovada para regalarle alegría a los niños que tanto esperaron este reencuentro. Más de 80 voluntarios hicieron posible un día mágico.",
            images: mockImages(5, "Día del Niño 2022"),
          },
        ],
      },
      {
        slug: "dia-de-la-madre",
        name: "Día de la Madre",
        description:
          "Le expresamos gratitud y amor a las mamás que cuidan y sostienen sus hogares con invaluable esfuerzo.",
        coverImage: "/mock/activity-3.jpg",
        years: [
          {
            year: 2024,
            description:
              "Reunimos a madres de familias vulnerables en un desayuno especial con música en vivo, palabras de agradecimiento y la entrega de canastas con productos del hogar. Cada mamá salió con una flor y una nota escrita por nuestros voluntarios.",
            images: mockImages(7, "Día de la Madre 2024"),
          },
          {
            year: 2023,
            description:
              "En 2023 organizamos un spa comunitario gratuito donde las mamás recibieron tratamientos de relajación, masajes de manos y maquillaje. Un momento de descanso y reconocimiento que no olvidarán.",
            images: mockImages(5, "Día de la Madre 2023"),
          },
          {
            year: 2022,
            description:
              "Celebración íntima y emotiva con madres adultas mayores de la comunidad. Se realizó una misa de acción de gracias, entrega de ramos y un almuerzo compartido con sus familias.",
            images: mockImages(4, "Día de la Madre 2022"),
          },
        ],
      },
      {
        slug: "dia-del-padre",
        name: "Día del Padre",
        description:
          "Reconocemos a los papás presentes y valientes que construyen familia cada día con amor y sacrificio.",
        coverImage: "/mock/activity-5.jpg",
        years: [
          {
            year: 2024,
            description:
              "Unimos a padres e hijos en una mañana deportiva: fútbol, carreras en saco y tiro al blanco. Luego compartimos una parrilla comunitaria. El evento reforzó los lazos familiares con mucha alegría.",
            images: mockImages(6, "Día del Padre 2024"),
          },
          {
            year: 2023,
            description:
              "Organizamos un torneo de domino y ajedrez para honrar a los padres. Cada ganador recibió un trofeo artesanal elaborado por los niños de la comunidad. Una tarde inolvidable.",
            images: mockImages(5, "Día del Padre 2023"),
          },
        ],
      },
    ],
  },

  // ── NAVIDAD Y AYUDA ──────────────────────────────────────────────────────────
  {
    slug: "navidad-y-ayuda",
    name: "Navidad y Ayuda",
    tagline:
      "Llevamos regalos, comida caliente y nuestro abrazo sincero a quienes más lo necesitan.",
    hashtag: "#Solidaridad",
    activities: [
      {
        slug: "navidad-en-calles-1",
        name: "Navidad en Calles #1",
        description:
          "Primera jornada de navidad solidaria en las calles del centro histórico de la ciudad.",
        coverImage: "/mock/activity-2.jpg",
        years: [
          {
            year: 2022,
            description:
              "Ruta inaugural que marcó el inicio de esta tradición. Con 30 voluntarios y la donación de empresas locales pudimos atender a más de 120 personas durante la noche más fría del año. Cerramos con villancicos y oración.",
            images: mockImages(8, "Navidad en Calles #1 — 2022"),
          },
        ],
      },
      {
        slug: "navidad-en-calles-2",
        name: "Navidad en Calles #2",
        description:
          "Segunda jornada expandiendo la cobertura hacia zonas residenciales vulnerables.",
        coverImage: "/mock/activity-4.jpg",
        years: [
          {
            year: 2023,
            description:
              "Ampliamos la ruta hasta urbanizaciones de emergencia. Con el apoyo de una parroquia local pudimos llegar a familias que nunca habían sido visitadas por ninguna organización. Distribuimos canastas de alimentos y juguetes para los niños.",
            images: mockImages(7, "Navidad en Calles #2 — 2023"),
          },
        ],
      },
      {
        slug: "navidad-en-calles-3",
        name: "Navidad en Calles #3",
        description:
          "Tercera ruta: llevamos alegría navideña a adultos mayores y comunidades alejadas.",
        coverImage: "/mock/activity-6.jpg",
        years: [
          {
            year: 2024,
            description:
              "Visitamos tres hogares de adultos mayores llevando música, flores y una merienda especial. Los abuelos cantaron con nosotros y compartieron sus historias de vida en una tarde muy emotiva. Más de 60 voluntarios participaron en esta edición.",
            images: mockImages(6, "Navidad en Calles #3 — 2024"),
          },
        ],
      },
      {
        slug: "navidad-en-calles-4",
        name: "Navidad en Calles #4",
        description:
          "Cuarta jornada: llegamos a hospitales, centros de salud pública y comunidades de alta vulnerabilidad.",
        coverImage: "/mock/activity-1.jpg",
        years: [
          {
            year: 2025,
            description:
              "En nuestra edición más reciente llevamos alegría navideña a niños hospitalizados y sus familias. Decoramos pasillos, entregamos juguetes y compartimos una actividad artística que llenó de color los cuartos del hospital pediátrico.",
            images: mockImages(7, "Navidad en Calles #4 — 2025"),
          },
        ],
      },
      {
        slug: "visita-geriatrico",
        name: "Visita a un Geriátrico",
        description:
          "Un encuentro lleno de calor humano con los adultos mayores que viven en residencias geriátricas.",
        coverImage: "/mock/activity-5.jpg",
        years: [
          {
            year: 2023,
            description:
              "Visitamos una residencia geriátrica del municipio que llevaba meses sin recibir visitas externas. Llevamos flores, música en vivo, meriendas caseras y tiempo de calidad para escuchar sus historias. Los abuelos nos recibieron con lágrimas de emoción y nosotros salimos con el corazón lleno.",
            images: mockImages(6, "Visita a Geriátrico 2023"),
          },
        ],
      },
    ],
  },

  // ── CONFERENCIAS ─────────────────────────────────────────────────────────────
  {
    slug: "conferencias",
    name: "Conferencias",
    tagline:
      "Charlas educativas y paneles de expertos para defender la vida y fortalecer la familia.",
    hashtag: "#Educación",
    activities: [
      {
        slug: "conferencia-ue-san-jose",
        name: "Conferencia en U.E. San José",
        description:
          "Charla educativa sobre valores provida y familia dirigida a estudiantes de bachillerato.",
        coverImage: "/mock/activity-3.jpg",
        years: [
          {
            year: 2024,
            description:
              "En 2024 llevamos la conferencia a dos secciones de 5to año con más de 80 estudiantes. El panel incluyó médicos, psicólogos y madres de familia que compartieron sus testimonios. Los chicos participaron activamente con preguntas y reflexiones que sorprendieron a todos.",
            images: mockImages(6, "Conferencia U.E. San José 2024"),
          },
          {
            year: 2023,
            description:
              "Primera conferencia en esta institución. Abordamos los temas de respeto a la vida desde la concepción, vínculos familiares y toma de decisiones responsables. Más de 60 estudiantes y docentes asistieron.",
            images: mockImages(5, "Conferencia U.E. San José 2023"),
          },
        ],
      },
      {
        slug: "charla-provida-comunidad",
        name: "Charla Provida Comunitaria",
        description:
          "Panel abierto a la comunidad sobre defensa de la vida y apoyo a la familia venezolana.",
        coverImage: "/mock/activity-5.jpg",
        years: [
          {
            year: 2024,
            description:
              "Realizamos un conversatorio abierto en la plaza principal del municipio con la participación de líderes religiosos, profesionales de la salud y representantes de organizaciones civiles. Asistieron más de 120 personas.",
            images: mockImages(7, "Charla Provida 2024"),
          },
          {
            year: 2023,
            description:
              "Primera edición del conversatorio en formato al aire libre. El evento reunió a familias, jóvenes y adultos mayores en torno a un debate constructivo sobre los desafíos de la familia contemporánea.",
            images: mockImages(5, "Charla Provida 2023"),
          },
          {
            year: 2022,
            description:
              "Charla inaugural en formato íntimo dentro de la sede de Manos Celestes. Fue el punto de partida de lo que hoy es nuestro ciclo de conferencias anuales.",
            images: mockImages(4, "Charla Provida 2022"),
          },
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getActivityBySlug(
  categorySlug: string,
  activitySlug: string
): Activity | undefined {
  return getCategoryBySlug(categorySlug)?.activities.find(
    (a) => a.slug === activitySlug
  );
}

export function getActivityYear(
  categorySlug: string,
  activitySlug: string,
  year: number
): ActivityYear | undefined {
  return getActivityBySlug(categorySlug, activitySlug)?.years.find(
    (y) => y.year === year
  );
}
