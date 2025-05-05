'use client';
import Preloader from '@/components/layout/preloader';
import Separador from '@/components/layout/separador';
import { motion } from 'framer-motion';
import PortadaSeccion from '@/components/portada';
import VideoCard from '@/components/videos';
import { useVideos } from '@/hook/useVideos';
import React from 'react';
export default function Videos() {
    const { videos, loading, error } = useVideos();
    return (
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-12 font-[family-name:var(--font-geist-sans)] bg-gray-100">
                <PortadaSeccion
                    titulo={'NUESTROS VIDEOS'}
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                />
                <Separador />
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative text-5xl font-montserrat font-extrabold text-primary text-center mb-8 uppercase tracking-wide drop-shadow-xl px-6 py-3 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 20 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        className="w-12 h-1 bg-secondary rounded-full mr-3"
                    ></motion.div>
                    <span className="relative z-10">
                        NUESTROS CONTENIDO AUDIOVISUAL{' '}
                    </span>
                    <motion.div
                        initial={{ x: 20 }}
                        animate={{ x: -20 }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        className="w-12 h-1 bg-secondary rounded-full ml-3"
                    ></motion.div>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {videos.map((video) => (
                        <VideoCard key={video.video_id} video={video} />
                    ))}
                </div>
            </main>
        </Preloader>
    );
}
