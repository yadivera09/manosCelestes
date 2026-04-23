"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  is_leader: boolean;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  bio?: string | null;
}

export default function TeamSection({ team }: { team: TeamMember[] }) {
  // Filtrar activos y ordenar
  const activeTeam = team.filter(m => m.is_active).sort((a, b) => a.display_order - b.display_order);
  
  // Separar líder y miembros
  const leader = activeTeam.find(m => m.is_leader) || {
    name: "Daniela Vera",
    role: "Líder del grupo",
    photo_url: "/mock/about.jpeg",
    bio: "Con una vocación inquebrantable de servicio, coordina cada una de nuestras actividades asegurando que la ayuda llegue siempre a buenas manos y los corazones se llenen de esperanza."
  };
  
  const members = activeTeam.filter(m => !m.is_leader);
  
  // Miembros por defecto si la lista está vacía
  const displayMembers = members.length > 0 ? members : [
    { name: "Carlos Mendoza", role: "Voluntario", photo_url: "/mock/activity-1.jpg" },
    { name: "Lucía Fernández", role: "Voluntario", photo_url: "/mock/activity-2.jpg" },
    { name: "Martín Rivas",    role: "Voluntario", photo_url: "/mock/activity-3.jpg" },
    { name: "Sofía Torres",    role: "Voluntario", photo_url: "/mock/activity-4.jpg" },
  ];
  return (
    <section
      id="team"
      className="w-full py-24 px-4 md:px-8 bg-[#FDFBF5]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-10 h-px bg-[#4FB3DC]/50" />
            <span className="text-xs tracking-[0.26em] font-bold text-[#4FB3DC] uppercase">
              Nuestro Equipo
            </span>
            <span className="block w-10 h-px bg-[#4FB3DC]/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A2A3A] leading-tight mb-5">
            Personas que hacen<br className="hidden md:block" /> esto posible
          </h2>
          <p className="text-base md:text-lg text-[#143B4F]/65 max-w-xl mx-auto leading-relaxed">
            Un grupo humano comprometido con llevar ayuda y esperanza a quienes más lo necesitan.
          </p>
        </motion.div>

        {/* Leader card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col md:flex-row rounded-3xl overflow-hidden mb-8 border border-[#0A2A3A]/08 shadow-sm bg-white"
        >
          {/* Image side */}
          <div className="relative w-full md:w-[42%] min-h-[300px] md:min-h-[380px] flex-shrink-0">
            <Image
              src={leader.photo_url || '/mock/about.jpeg'}
              alt={`${leader.name} — ${leader.role}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info side */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-xs tracking-[0.22em] font-bold text-[#4FB3DC] uppercase mb-3">
              {leader.role}
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0A2A3A] mb-4">
              {leader.name}
            </h3>
            <p className="text-[#143B4F]/70 text-base md:text-lg leading-relaxed">
              {leader.bio || "Comprometida con la defensa de la vida y la familia."}
            </p>
          </div>
        </motion.div>

        {/* Members grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="relative rounded-2xl overflow-hidden group cursor-default"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={m.photo_url || '/mock/activity-1.jpg'}
                alt={m.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Default bottom label */}
              <div className="absolute inset-x-0 bottom-0 py-3 px-4 bg-gradient-to-t from-[#0A2A3A]/75 to-transparent translate-y-0 group-hover:translate-y-full transition-transform duration-300">
                <p className="text-white text-sm font-semibold">{m.name}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#4FB3DC]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs tracking-[0.2em] font-bold text-white/80 uppercase mb-2">
                  {m.role}
                </span>
                <p className="text-white text-base font-bold">{m.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
