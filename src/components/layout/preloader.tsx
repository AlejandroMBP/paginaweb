'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      setTimeout(() => {
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });

          // 🔹 Ajuste para detenerse 20px más arriba
          setTimeout(() => {
            window.scrollBy({ top: -20, behavior: 'smooth' });
          }, 500);
        }
      }, 3500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-[#00284F] z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* 🔹 Imagen de fondo */}
            <motion.img
              src="/image/logo.jpeg"
              alt="Logo"
              className="absolute w-60 h-auto opacity-30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1 }}
            />

            {/* 🔹 Video encima de la imagen */}
            <motion.video
              src="/gifs/anim.webm"
              autoPlay
              loop
              muted
              className="w-[30rem] h-[30rem] relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children}
    </>
  );
}
