'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRegBuilding, FaLightbulb, FaTrophy } from 'react-icons/fa'; // Icons for extra visual appeal
import { useEffect, useState } from 'react';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const [vision, setVision] = useState('Cargando...');
    useEffect(() => {
        const fetchfilosofia = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/InstitucionUPEA/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                console.log('Respuesta de la filosofia:', result); //eliminar al terminar el desarrollo
                setVision(
                    result?.Descripcion?.institucion_vision ||
                        'No se encontro vision.'
                );
            } catch (error) {
                setVision('No se encontro vision');
            } finally {
                setLoading(false);
            }
        };
        fetchfilosofia();
    }, []);
    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">
            {/* Sección 1: Introducción */}
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

            {/* Sección 2: Misión, Visión y Objetivos */}
            <section className="max-w-6xl text-center py-20">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-bold text-primary mb-12"
                >
                    Nuestra Filosofía
                    <span className="block w-24 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            title: 'Misión',
                            text: 'Formar profesionales íntegros en gestión empresarial.',
                            icon: <FaRegBuilding />,
                        },
                        {
                            title: 'Visión',
                            text: loading ? 'Cargando...' : vision,
                            icon: <FaLightbulb />,
                        },
                        {
                            title: 'Objetivos',
                            text: 'Desarrollar innovación, gestión de recursos y toma de decisiones.',
                            icon: <FaTrophy />,
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transform transition-all duration-300"
                        >
                            <div className="text-3xl text-primary mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-primary mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 text-lg">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sección 3: Administración de Empresas */}
            <section className="max-w-6xl py-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-bold text-primary mb-12"
                >
                    Administración de Empresas
                    <span className="block w-24 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row gap-10"
                >
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <Image
                            src="/image/fondo.jpg"
                            alt="Administración de Empresas"
                            width={600}
                            height={400}
                            className="w-full h-72 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                        />
                        <h2 className="text-3xl font-semibold text-primary mt-6 text-center">
                            ADMINISTRACIÓN DE EMPRESAS
                        </h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 bg-white shadow-xl rounded-2xl p-10 border border-gray-200 hover:shadow-2xl transition-all flex flex-col justify-center"
                    >
                        <h2 className="text-3xl font-semibold text-primary text-center mb-6">
                            Historia
                            <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed text-center">
                            La carrera de Administración de Empresas ha
                            evolucionado con el tiempo, adaptándose a los
                            desafíos del entorno global.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}
