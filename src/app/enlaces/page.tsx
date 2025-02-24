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
                    `${process.env.NEXT_PUBLIC_API_SERVICE}linksIntExtAll/${process.env.NEXT_PUBLIC_ID_INSTITUCION}`
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();

                // Filtrar enlaces duplicados
                const seenLinks = new Set();
                const uniqueEnlaces = result.filter((enlace: Enlaces) => {
                    if (!seenLinks.has(enlace.ei_link)) {
                        seenLinks.add(enlace.ei_link);
                        return true; // Mantener este enlace
                    }
                    return false; // Ignorar enlaces duplicados
                });

                setEnlaces(uniqueEnlaces);
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
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative text-5xl font-montserrat font-extrabold text-primary text-center mb-8 uppercase tracking-wide drop-shadow-xl px-6 py-3 flex items-center justify-center"
                >
                    <motion.div initial={{ x: -20 }} animate={{ x: 20 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} className="w-12 h-1 bg-secondary rounded-full mr-3"></motion.div>
                    <span className="relative z-10">Enlaces</span>
                    <motion.div initial={{ x: 20 }} animate={{ x: -20 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} className="w-12 h-1 bg-secondary rounded-full ml-3"></motion.div>
                </motion.h2>
                <br />
                {loading ? (
                    <p className="text-center text-gray-600">
                        Cargando enlaces...
                    </p>
                ) : enlaces.length > 0 ? (
                    <div className="grid gap-16 sm:grid-cols-2 md:grid-cols-3">
                        {enlaces.map((enlace) => (
                            <motion.a
                                key={enlace.ei_id}
                                href={enlace.ei_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative block group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.1, y: -30 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-[17rem] h-[17rem] mx-auto overflow-hidden rounded-full border-4 border-primary shadow-lg"
                                >
                                    <Image
                                        src={
                                            enlace.ei_link === "http://repositorio.upea.bo/"
                                                ? "/image/repositorioUniversitario.jpg"
                                                : enlace.ei_link === "https://biblioteca.upea.bo/"
                                                    ? "/image/hoha.webp"
                                                    : `https://serviciopagina.upea.bo/InstitucionUpea/LinksExternos/${enlace.ei_imagen}`
                                        }
                                        alt={enlace.ei_nombre}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
                                        unoptimized
                                        onError={(e) => {
                                            e.currentTarget.src = `https://serviciopagina.upea.bo/InstitucionUpea/LinksExternos/${enlace.ei_imagen}`;
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent to-secondary">
                                        <motion.div
                                            initial={{ x: -50 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="flex items-center"
                                        >
                                            <span className="text-white text-lg font-bold">Ir al enlace</span>
                                            <motion.div
                                                className="ml-2 w-4 h-4 bg-white rounded-full"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-md shadow-md mt-4">
                                    <h3 className="text-lg font-medium text-primary text-center">
                                        {enlace.ei_nombre}
                                    </h3>
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
