'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FaRegBuilding,
    FaLightbulb,
    FaTrophy,
    FaBookOpen,
    FaUserTie,
    FaEye,
    FaBullseye,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function AboutPage() {
    // const [loading, setLoading] = useState(true);
    // const [vision, setVision] = useState('Cargando...');
    // const [mision, setMision] = useState('Cargando...');
    // const [objetivo, setObjetivo] = useState('Cargando...');
    // const [historia, setHistoria] = useState('Cargando...');

    // useEffect(() => {
    //     const fetchAcercade = async () => {
    //         try {
    //             const response = await fetch(
    //                 'https://serviciopagina.upea.bo/api/InstitucionUPEA/10'
    //             );
    //             if (!response.ok)
    //                 throw new Error(`Error HTTP: ${response.status}`);
    //             const result = await response.json();

    //             const tempDiv = document.createElement('div');
    //             const tempMisDiv = document.createElement('div');
    //             const tempObjDiv = document.createElement('div');

    //             tempDiv.innerHTML =
    //                 result?.Descripcion?.institucion_vision ||
    //                 'No se encontró contenido de vision.';
    //             setVision(
    //                 tempDiv.textContent ||
    //                     tempDiv.innerText ||
    //                     'No se encontró contenido de vision.'
    //             );

    //             tempMisDiv.innerHTML =
    //                 result?.Descripcion?.institucion_mision ||
    //                 'No se encontró contenido.';
    //             setMision(
    //                 tempMisDiv.textContent ||
    //                     tempMisDiv.innerText ||
    //                     'No se encontró contenido.'
    //             );

    //             tempObjDiv.innerHTML =
    //                 result?.Descripcion?.institucion_objetivos ||
    //                 'No se encontró contenido.';
    //             setObjetivo(
    //                 tempObjDiv.textContent ||
    //                     tempObjDiv.innerText ||
    //                     'No se encontró contenido.'
    //             );

    //             setHistoria(
    //                 result?.Descripcion?.institucion_historia ||
    //                     'No se encontró historia.'
    //             );
    //         } catch (error) {
    //             setVision('No se encontro vision');
    //             setMision('No se encontro mision');
    //             setObjetivo('No se encontro objetivo');
    //             setHistoria('No se encontro historia');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchAcercade();
    // }, []);
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
            <section
                className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-6"
                >
                    <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                        Acerca de Nosotros
                    </h1>
                    <p className="mt-4 text-2xl text-white max-w-3xl mx-auto drop-shadow-md">
                        Cultivamos talento para transformar el horizonte de
                        Bolivia.
                    </p>
                </motion.div>
            </section>

            <div className="w-full h-1 bg-primary rounded-full"></div>

            <section className="max-w-7xl mx-auto text-center py-16">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-extrabold text-primary uppercase tracking-wide mb-12"
                >
                    Nuestra Filosofía
                </motion.h2>

                <div className="flex justify-center gap-[20px] flex-wrap max-w-[2500px] mx-auto">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative bg-gray-200 rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 
                           w-[400px] h-[300px] flex-shrink-0 group"
                        >
                            {/* Imagen de fondo ajustada completamente */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                <Image
                                    src={card.image}
                                    alt={`Imagen ${index + 1}`}
                                    layout="fill"
                                    objectFit="contain" // Ahora la imagen se verá completa dentro del card
                                    objectPosition="center"
                                />
                            </div>

                            {/* Capa de degradado que aparece al hacer hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Contenedor del icono y título con animación de barrido */}
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 
                    group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500"
                            >
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

            <section className="max-w-6xl py-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative text-5xl font-montserrat font-extrabold text-primary text-center mb-8 uppercase tracking-wide drop-shadow-xl px-6 py-3 flex items-center justify-center"
                >
                    {/* Líneas animadas - Izquierda */}
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

                    {/* Texto principal */}
                    <span className="relative z-10">NUESTRA HISTORIA</span>

                    {/* Líneas animadas - Derecha */}
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

                    {/* Fondo degradado decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20 blur-lg opacity-50"></div>

                    {/* Línea decorativa principal */}
                    <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-28 h-1 bg-primary rounded-full"></span>

                    {/* Subrayado animado más llamativo */}
                    <motion.span
                        initial={{ width: '3rem' }}
                        whileHover={{ width: '7rem' }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-1 bg-secondary rounded-full"
                    ></motion.span>

                    {/* Brillo sutil */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0"
                    ></motion.div>

                    {/* Borde resplandeciente */}
                    <motion.div
                        initial={{ borderColor: 'transparent' }}
                        whileHover={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-transparent rounded-lg"
                    ></motion.div>
                </motion.h2>
                <div>
                    <div>
                        <h2>HISTORIA</h2>
                    </div>
                </div>
            </section>
        </main>
    );
}
