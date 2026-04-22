"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/shared/index";

// ─── Number Counter Component ───────────────────────────────────────────────
function AnimatedCounter({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    // Reset to 0 when value changes, then animate to new value
    motionValue.set(0);
    setTimeout(() => {
      motionValue.set(value);
    }, 100);
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
}

export default function ImpactSection({ stats }: { stats: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrar solo las activas y formatear asegurando que el conteo sea un número
  const activeStats = stats.filter(s => s.is_active).map(s => ({
    number: Number(s.value) || 0,
    label: s.label
  }));

  // Fallback si no hay estadísticas cargadas aún
  const displayStats = activeStats.length > 0 ? activeStats : [
    { number: 500, label: "niños en total" },
    { number: 50, label: "ancianos ayudados" },
    { number: 50, label: "mujeres embarazadas apoyadas" },
  ];

  useEffect(() => {
    if (displayStats.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayStats.length);
    }, 4500); 
    
    return () => clearInterval(timer);
  }, [displayStats.length]);

  return (
    <section id="impacto" className="relative w-full bg-white pt-24 pb-48 overflow-hidden z-10">
      <Container>
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-lg bg-[#EAF6FC] text-[#143B4F] text-xs font-bold tracking-widest uppercase mb-6">
              Nuestro Impacto
            </span>

            {/* Big Title */}
            <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-[#0A2A3A] max-w-4xl leading-tight mb-16">
              Juntos, estamos haciendo{" "}
              <br className="hidden md:block" />
              la diferencia
            </h2>
          </motion.div>

          {/* Animated Stats Carousel */}
          <div className="relative h-[250px] w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute flex flex-col items-center"
              >
                {/* Big Number */}
                <div className="text-[7rem] md:text-[9rem] font-black text-[#4FB3DC] leading-none mb-4 display-title tracking-tighter drop-shadow-sm">
                  <AnimatedCounter value={displayStats[currentIndex].number} />
                  <span className="text-4xl md:text-6xl align-top text-[#2E8EBA] ml-1">+</span>
                </div>
                
                {/* Subtitle */}
                <div className="text-2xl md:text-3xl font-bold text-[#143B4F]/80 capitalize">
                  {displayStats[currentIndex].label}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </Container>

      {/* Decorative Bottom Curve mimicking the design (transitions into the cream background of the next section) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-[-1] pointer-events-none transform translate-y-[2px]">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto min-w-[200vw] lg:min-w-[100vw] text-[#FDFBF5] block"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,320L1440,0L1440,320L0,320Z"
            className="hidden lg:block lg:d-path"
          />
          {/* Using a nice curved dome shape connecting perfectly to background #FDFBF5 */}
          <path
            fill="currentColor"
            d="M0,320C480,120,960,120,1440,320L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
