'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopButton() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollPercentage(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 w-16 h-16 flex items-center justify-center rounded-full shadow-xl border-4 z-50 transition-colors duration-300 ${scrollPercentage >= 100 ? 'bg-primary border-primary' : 'bg-white border-primary'
                }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Reloj Circular - SVG */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Fondo del círculo */}
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="gray"
                    strokeWidth="6"
                    opacity="0.2"
                />
                {/* Círculo animado que avanza con el scroll */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={scrollPercentage >= 100 ? 'transparent' : 'blue'}
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '251.2', strokeDashoffset: '251.2' }}
                    animate={{ strokeDashoffset: `${251.2 - (scrollPercentage / 100) * 251.2}` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                />
            </svg>

            {/* Porcentaje en el centro (se oculta al 100%) */}
            {scrollPercentage < 100 && (
                <span className="absolute text-black font-bold text-lg">
                    {Math.round(scrollPercentage)}%
                </span>
            )}

            {/* Flecha parpadeante cuando el scroll está al 100% */}
            {scrollPercentage >= 100 && (
                <motion.div
                    className="absolute text-white text-3xl animate-bounce"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                    <FaArrowUp />
                </motion.div>
            )}
        </motion.button>
    );
}
