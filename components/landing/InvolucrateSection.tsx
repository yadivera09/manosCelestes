"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const leftCircles = [
  { src: "/mock/activity-1.jpg", size:  80, delay: 0.10 },
  { src: "/mock/activity-2.jpg", size: 130, delay: 0.20 },
  { src: "/mock/activity-3.jpg", size: 170, delay: 0.15 },
];

const rightCircles = [
  { src: "/mock/activity-4.jpg", size: 150, delay: 0.25 },
  { src: "/mock/activity-5.jpg", size: 105, delay: 0.10 },
  { src: "/mock/activity-6.jpg", size:  80, delay: 0.30 },
];

interface InvolucrateProps {
  settings?: {
    title?: string
    subtitle?: string
    description?: string
  }
}

export default function InvolucrateSection({ settings }: InvolucrateProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const title = settings?.title || "Únete para hacer la diferencia";
  const subtitle = settings?.subtitle || "¿Listo para dar una Mano Celeste?";
  const description = settings?.description || "Estamos aquí para responder tus inquietudes, escuchar tus propuestas y compartir nuestra visión. Tú también puedes ser parte del cambio.";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="involucrate" className="w-full overflow-hidden">

      {/* ── PART 1: Call to action — 3-column responsive layout ── */}
      <div
        className="w-full py-20 lg:py-28"
        style={{ background: "linear-gradient(180deg, #FDFBF5 0%, #EAF6FC 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 min-h-[520px]">

          {/* Left circles — hidden below lg */}
          <div className="hidden md:flex flex-col items-end gap-6 flex-shrink-0">
            {leftCircles.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: c.delay, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ width: c.size, height: c.size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}
                className="relative shadow-xl"
              >
                <Image src={c.src} alt="" fill className="object-cover" />
              </motion.div>
            ))}
          </div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center z-10 px-4 max-w-xl mx-auto"
          >
            <span className="inline-block px-5 py-1.5 rounded-full bg-[#4FB3DC] text-white text-xs font-bold tracking-[0.18em] uppercase mb-6">
              Toma Acción
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A2A3A] leading-tight mb-8">
              {title}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#contacto" className="btn-primary">Voluntario Ahora</a>
              <a href="#quienes-somos" className="btn-ghost">
                Aprende Más
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right circles — hidden below lg */}
          <div className="hidden md:flex flex-col items-start gap-6 flex-shrink-0">
            {rightCircles.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: c.delay, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ width: c.size, height: c.size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}
                className="relative shadow-xl"
              >
                <Image src={c.src} alt="" fill className="object-cover" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ── PART 2: Contact ── */}
      <div
        id="contacto"
        className="w-full py-24 px-4 md:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.22em] font-bold text-[#4FB3DC] uppercase mb-3 block">
              Conecta con nosotros
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0A2A3A] mb-5">
              {subtitle}
            </h3>
            <p className="text-base md:text-lg text-[#143B4F]/65 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4FB3DC]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.18em] font-bold text-[#4FB3DC] uppercase mb-1">
                    Correo Electrónico
                  </p>
                  <a href="mailto:manoscelestes@email.com" className="text-[#0A2A3A] font-semibold hover:text-[#4FB3DC] transition-colors text-lg">
                    manoscelestes@email.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4FB3DC]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs tracking-[0.18em] font-bold text-[#4FB3DC] uppercase mb-1">
                    Teléfono
                  </p>
                  <a href="tel:+12345678890" className="text-[#0A2A3A] font-semibold hover:text-[#4FB3DC] transition-colors text-lg">
                    +1 234 567 890
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {sent ? (
                <div className="rounded-3xl bg-[#EAF6FC] border border-[#4FB3DC]/30 p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#4FB3DC] flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-[#0A2A3A] mb-2">¡Mensaje enviado!</h4>
                  <p className="text-[#143B4F]/65">Nos pondremos en contacto contigo pronto.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl bg-[#FDFBF5] border border-[#0A2A3A]/08 p-8 md:p-10 flex flex-col gap-5 shadow-sm"
                >
                  <h4 className="text-xl font-bold text-[#0A2A3A] mb-1">Envíanos un mensaje</h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#143B4F]/60 uppercase tracking-widest">
                        Nombre completo
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                        className="rounded-xl border border-[#0A2A3A]/12 bg-white px-4 py-3 text-sm text-[#0A2A3A] placeholder-[#143B4F]/30 focus:outline-none focus:border-[#4FB3DC] transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#143B4F]/60 uppercase tracking-widest">
                        Correo electrónico
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@correo.com"
                        className="rounded-xl border border-[#0A2A3A]/12 bg-white px-4 py-3 text-sm text-[#0A2A3A] placeholder-[#143B4F]/30 focus:outline-none focus:border-[#4FB3DC] transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#143B4F]/60 uppercase tracking-widest">
                      Asunto
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="¿En qué podemos ayudarte?"
                      className="rounded-xl border border-[#0A2A3A]/12 bg-white px-4 py-3 text-sm text-[#0A2A3A] placeholder-[#143B4F]/30 focus:outline-none focus:border-[#4FB3DC] transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#143B4F]/60 uppercase tracking-widest">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Escribe tu mensaje aquí..."
                      className="rounded-xl border border-[#0A2A3A]/12 bg-white px-4 py-3 text-sm text-[#0A2A3A] placeholder-[#143B4F]/30 focus:outline-none focus:border-[#4FB3DC] transition resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary self-start mt-1">
                    Enviar mensaje
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
