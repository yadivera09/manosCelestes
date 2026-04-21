import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo ocupando toda la pantalla */}
      <Image 
        src="/mock/hero.jpeg" 
        alt="Fondo Manos Celestes" 
        fill 
        priority 
        className="object-cover z-0" 
      />
      {/* Overlay para garantizar lectura del texto */}
      <div className="absolute inset-0 bg-[#EAF6FC]/85 z-[1]"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-[1240px] flex flex-col justify-between h-screen min-h-[600px] py-6 md:py-10 px-6 md:px-12">
        {/* Top navigation */}
        <nav className="relative z-10 flex items-center justify-between w-full pt-8">
          <div className="flex items-center gap-3 fade-up fade-up-1">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image 
                src="/mock/logo.png" 
                alt="Logo Manos Celestes" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-sm tracking-[0.22em] font-semibold text-[#0A2A3A]">
              MANOS CELESTES
            </span>
          </div>

          <ul className="hidden lg:flex items-center gap-10 fade-up fade-up-2">
            <li><a className="nav-link" href="#quienes-somos">Quiénes Somos</a></li>
            <li><a className="nav-link" href="#actividades">Qué Hacemos</a></li>
            <li><a className="nav-link" href="#team">Team</a></li>
            <li><a className="nav-link" href="#involucrate">Involúcrate</a></li>
          </ul>

          <div className="flex items-center gap-3 fade-up fade-up-2">
            <button
              aria-label="Contacto"
              className="w-11 h-11 rounded-full border border-[#0A2A3A]/15 flex items-center justify-center hover:border-[#2E8EBA] transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
            <a href="#donar" className="btn-primary hidden sm:inline-block">Donar</a>
          </div>
        </nav>

        {/* Título principal */}
        <div className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-12 pb-10">
          <h1 className="display-title text-center text-[18vw] md:text-[14vw] lg:text-[11rem] xl:text-[13rem] leading-[0.88] fade-up fade-up-3">
            <span className="block">Manos</span>
            <span className="block mt-2 fade-up fade-up-4">Celestes</span>
          </h1>

          {/* Frase de apoyo */}
          <p className="mt-10 md:mt-12 text-center max-w-2xl mx-auto text-base md:text-lg text-[#143B4F]/80 leading-relaxed fade-up fade-up-4">
            Somos la mano que se extiende cuando nadie mira.
            <br className="hidden md:block" />
            Transformamos gestos pequeños en sonrisas enormes.
          </p>

          {/* Botones */}
          <div className="mt-10 flex items-center justify-center gap-4 fade-up fade-up-5">
            <a href="#donar" className="btn-primary">Donar Ahora</a>
            <a href="#ayuda" className="btn-ghost">
              Necesito Ayuda
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer del hero con aliados y scroll */}
        <div className="border-t border-[#0A2A3A]/10 py-6 flex flex-wrap items-center justify-between gap-6 fade-up fade-up-5 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md border border-[#0A2A3A]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="text-xs tracking-[0.2em] font-semibold text-[#143B4F]">
              DONACIÓN RÁPIDA
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 opacity-80">
            <span className="italic font-serif text-xl text-[#143B4F]">
              aliados<span className="text-[#4FB3DC]">+</span>
            </span>
            <span className="text-sm tracking-[0.18em] font-semibold text-[#143B4F]">
              FUNDACIÓN · LUZ
            </span>
            <span className="text-sm tracking-[0.18em] font-semibold text-[#143B4F]">
              UNICEF
            </span>
            <span className="text-sm tracking-[0.18em] font-semibold text-[#143B4F]">
              RED SOLIDARIA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] font-semibold text-[#143B4F]">
              DESLIZA
            </span>
            <div className="w-9 h-9 rounded-full border border-[#0A2A3A]/20 flex items-center justify-center soft-float">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
