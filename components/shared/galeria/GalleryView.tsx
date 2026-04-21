"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import GalleryItem from "./GalleryItem";
import GalleryModal from "./GalleryModal";

interface GalleryItemData {
  id: string;
  activity: string;
  year: number;
  image: string;
}

interface GalleryViewProps {
  items: GalleryItemData[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

export default function GalleryView({ items }: GalleryViewProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItemData | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-text/40">
        <p className="text-lg font-medium">No hay fotos registradas para este periodo.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <GalleryItem
                image={item.image}
                activity={item.activity}
                year={item.year}
                onClick={() => setSelectedImage(item)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <GalleryModal
            key="gallery-modal"
            image={selectedImage.image}
            activity={selectedImage.activity}
            year={selectedImage.year}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
