'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserTie, FaEye, FaBullseye } from 'react-icons/fa';
import PortadaSeccion from '@/components/portada';
import HistoriaSection from '@/components/HistoriaSection';
import ImageModal from '@/components/ModalInicio';
export default function AboutPage() {
    const [selectedImage, setSelectedImage] = useState<{
        title: string;
        image: string;
    } | null>(null);

    const cards = [
        {
            title: 'MISIÓN',
            image: '/image/Mision.jpeg',
            icon: <FaBullseye className="text-4xl text-primary" />, // Ícono para misión
        },
        {
            title: 'VISIÓN',
            image: '/image/vision.jpeg',
            icon: <FaEye className="text-4xl text-primary" />, // Ícono para visión
        },
        {
            title: 'PERFIL PROFESIONAL',
            image: '/image/PerfilProfecional.jpeg',
            icon: <FaUserTie className="text-4xl text-primary" />, // Ícono para perfil profesional
        },
    ];

    return (
        <main className="flex flex-col items-center min-h-screen gap-12 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">
            <PortadaSeccion
                titulo={'ACERCA DE NOSOTROS'}
                subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                backgroundImage="/image/fondo.jpg"
            />

            <div className="w-full h-1 bg-primary rounded-full"></div>

            <section className="max-w-7xl mx-auto text-center">
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
                    <span className="relative z-10">NUESTRA FILOSOFÍA</span>
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

                <div className="flex justify-center gap-[20px] flex-wrap max-w-[2500px] mx-auto">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 w-[400px] h-[300px] flex-shrink-0 group cursor-pointer"
                            onClick={() =>
                                setSelectedImage({
                                    title: card.title,
                                    image: card.image,
                                })
                            }
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-white">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    layout="fill"
                                    objectFit="contain"
                                    objectPosition="center"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500">
                                {card.icon}
                                <h2 className="text-xl font-semibold mt-2">
                                    {card.title}
                                </h2>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="w-full h-1 bg-primary rounded-full"></div>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-5xl font-montserrat font-extrabold text-primary text-center mb-4 uppercase tracking-wide drop-shadow-xl px-6 py-3 flex items-center justify-center"
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
                />
                <span className="relative z-10">NUESTRA HISTORIA</span>
                <motion.div
                    initial={{ x: 20 }}
                    animate={{ x: -20 }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                    className="w-12 h-1 bg-secondary rounded-full ml-3"
                />
            </motion.h2>

            <section className="max-w-6xl px-6 flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Logo con animación y mayor tamaño */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex-shrink-0"
                >
                    <Image
                        src={'/image/logo.jpeg'}
                        alt="Logo de la carrera"
                        width={350}
                        height={350}
                        className="rounded-lg shadow-xl w-[450px] h-[350px]"
                        unoptimized
                    />
                    {/* Efecto de brillo alrededor del logo */}
                    <motion.div
                        className="absolute inset-0 rounded-lg border-4 border-secondary opacity-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                </motion.div>
                <HistoriaSection />
            </section>
            {selectedImage && (
                <ImageModal
                    onClose={() => setSelectedImage(null)}
                    imageSrc={selectedImage.image}
                    title={selectedImage.title}
                />
            )}
        </main>
    );
}
