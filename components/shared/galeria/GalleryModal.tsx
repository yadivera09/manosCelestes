"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface GalleryModalProps {
  image: string;
  activity: string;
  year: number;
  onClose: () => void;
}

export default function GalleryModal({ image, activity, year, onClose }: GalleryModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-primary-dark/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Content */}
      <motion.div
        className="relative w-full max-w-5xl max-h-full flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="relative w-full aspect-auto h-[70vh] pointer-events-auto rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={image}
            alt={`${activity} - ${year}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        
        <div className="mt-4 text-center pointer-events-auto">
          <h3 className="text-xl font-medium text-neutral-white">{activity}</h3>
          <p className="text-neutral-white/70">{year}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-3 -mt-12 md:-mt-10 md:-mr-10 text-neutral-white/80 hover:text-neutral-white transition-colors pointer-events-auto"
          aria-label="Cerrar modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
