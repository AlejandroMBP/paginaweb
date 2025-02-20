'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FaRegBuilding,
    FaLightbulb,
    FaTrophy,
    FaBookOpen,
} from 'react-icons/fa';
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

                setHistoria(
                    result?.Descripcion?.institucion_historia ||
                        'No se encontró historia.'
                );
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

            <section className="max-w-4xl mx-auto text-center py-16">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-bold text-primary mb-12"
                >
                    Nuestra Filosofía
                    <span className="block w-24 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
                </motion.h2>
                <div className="flex flex-col gap-8 items-center">
                    {[
                        {
                            title: 'Misión',
                            text: mision,
                            icon: <FaRegBuilding />,
                        },
                        {
                            title: 'Visión',
                            text: vision,
                            icon: <FaLightbulb />,
                        },
                        {
                            title: 'Objetivos',
                            text: objetivo,
                            icon: <FaTrophy />,
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transform transition-all duration-300"
                        >
                            <div className="text-3xl text-primary mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-primary mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 text-lg text-justify">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <section className="max-w-6xl py-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-bold text-primary mb-12"
                >
                    Nuestra Historia
                    <span className="block w-24 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transform transition-all duration-300 max-w-3xl mx-auto"
                >
                    <div className="text-3xl text-primary mb-4 flex justify-center">
                        <FaBookOpen />
                    </div>
                    <h3 className="text-2xl font-semibold text-primary mb-4">
                        Historia
                    </h3>
                    <p
                        className="text-gray-700 text-lg text-justify leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: historia }}
                    />
                </motion.div>
            </section>
        </main>
    );
}
