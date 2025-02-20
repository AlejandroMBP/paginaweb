'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Enlaces = {
    ei_id: number;
    ei_imagen: string;
    ei_nombre: string;
    ei_link: string;
    ei_tipo: string;
};

export default function EnlacesPage() {
    const [loading, setLoading] = useState(true);
    const [enlaces, setEnlaces] = useState<Enlaces[]>([]);

    useEffect(() => {
        const fetchEnlaces = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/linksIntExtAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                setEnlaces(result);
            } catch (error) {
                setEnlaces([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEnlaces();
    }, []);

    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 bg-gray-100">
            {/* Sección de encabezado */}
            <section
                className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-4 text-white"
                >
                    <h1 className="text-5xl font-bold">Enlaces</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto">
                        Formación académica con enfoque en liderazgo,
                        emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>
            <div className="w-full h-1 bg-primary rounded-full"></div>
            {/* Sección de enlaces */}
            <section className="w-full max-w-6xl px-4 pb-16">
                <h2 className="text-3xl font-semibold text-center text-primary mb-10">
                    RECURSOS Y ENLACES
                </h2>
                {loading ? (
                    <p className="text-center text-gray-600">
                        Cargando enlaces...
                    </p>
                ) : enlaces.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {enlaces.map((enlace) => (
                            <motion.a
                                key={enlace.ei_id}
                                href={enlace.ei_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 p-6 border border-gray-200 overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="relative w-full h-40 overflow-hidden rounded-lg border border-white shadow-md">
                                    <Image
                                        src={`https://serviciopagina.upea.bo/InstitucionUpea/LinksExternos/${enlace.ei_imagen}`}
                                        alt={enlace.ei_nombre}
                                        layout="fill"
                                        objectFit="cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="mt-4 w-full text-center bg-white p-2 rounded-md shadow-md">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {enlace.ei_nombre}
                                    </h3>
                                </div>
                                <div className="absolute inset-0 bg-primary bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <span className="text-white text-lg font-semibold">
                                        Ir al enlace de {enlace.ei_nombre}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">
                        No hay enlaces disponibles.
                    </p>
                )}
            </section>
        </main>
    );
}
