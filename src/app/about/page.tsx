'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRegBuilding, FaLightbulb, FaTrophy } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const [vision, setVision] = useState('Cargando...');
    const [mision, setMision] = useState('Cargando...');
    const [objetivo, setObjetivo] = useState('Cargando...');
    const [historia, setHistoria] = useState('Cargando...');

    useEffect(() => {
        const fetchAcercade = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/InstitucionUPEA/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();

                const tempDiv = document.createElement('div');
                const tempMisDiv = document.createElement('div');
                const tempObjDiv = document.createElement('div');

                tempDiv.innerHTML =
                    result?.Descripcion?.institucion_vision ||
                    'No se encontró contenido de vision.';
                setVision(
                    tempDiv.textContent ||
                    tempDiv.innerText ||
                    'No se encontró contenido de vision.'
                );

                tempMisDiv.innerHTML =
                    result?.Descripcion?.institucion_mision ||
                    'No se encontró contenido.';
                setMision(
                    tempMisDiv.textContent ||
                    tempMisDiv.innerText ||
                    'No se encontró contenido.'
                );

                tempObjDiv.innerHTML =
                    result?.Descripcion?.institucion_objetivos ||
                    'No se encontró contenido.';
                setObjetivo(
                    tempObjDiv.textContent ||
                    tempObjDiv.innerText ||
                    'No se encontró contenido.'
                );

                const historiaHtml =
                    result?.Descripcion?.institucion_historia ||
                    'No se encontró historia.';
                setHistoria(DOMPurify.sanitize(historiaHtml));
            } catch (error) {
                setVision('No se encontro vision');
                setMision('No se encontro mision');
                setObjetivo('No se encontro objetivo');
                setHistoria('No se encontro historia');
            } finally {
                setLoading(false);
            }
        };
        fetchAcercade();
    }, []);

    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">
            {/* Sección 1: Introducción */}
            <section className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image/fondo.jpg')" }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-6"
                >
                    <h1 className="text-6xl font-bold text-white drop-shadow-lg">Acerca de Nosotros</h1>
                    <p className="mt-4 text-2xl text-white max-w-3xl mx-auto drop-shadow-md">
                        Cultivamos talento para transformar el horizonte de Bolivia.
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
                            text: loading ? 'Cargando...' : DOMPurify.sanitize(mision),
                            icon: <FaRegBuilding />,
                        },
                        {
                            title: 'Visión',
                            text: loading ? 'Cargando...' : DOMPurify.sanitize(vision),
                            icon: <FaLightbulb />,
                        },
                        {
                            title: 'Objetivos',
                            text: loading ? 'Cargando...' : DOMPurify.sanitize(objetivo),
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
                            <h3 className="text-2xl font-semibold text-primary mb-4">{item.title}</h3>
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
                        className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-300 p-10 border border-gray-200 hover:shadow-2xl transition-all flex flex-col justify-center rounded-2xl"
                    >
                        <h2 className="text-3xl font-semibold text-primary text-center mb-6">
                            Historia
                            <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                        </h2>
                        <div
                            className="text-lg text-gray-700 leading-relaxed text-center"
                            dangerouslySetInnerHTML={{ __html: historia }}
                        />
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}
