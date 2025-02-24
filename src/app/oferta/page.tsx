'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ImageModal from '@/components/ModalInicio';

type OfertasAcademicas = {
    ofertas_id: number;
    ofertas_titulo: string;
    ofertas_descripcion: string;
    ofertas_inscripciones_ini: string;
    ofertas_inscripciones_fin: string;
    ofertas_fecha_examen: string;
    ofertas_imagen: string;
    ofertas_referencia: string;
    ofertas_estado: number;
    ofertas_fecha_creacion: string;
    ofertas_fecha_update: string;
};

export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [ofertasAcademicas, setOfertasAcademicas] = useState<OfertasAcademicas[]>([]);
    const [selectedOferta, setSelectedOferta] = useState<OfertasAcademicas | null>(null);

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const response = await fetch('https://serviciopagina.upea.bo/api/OfertasAcademicasAll/20');
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                setOfertasAcademicas(result);
            } catch (error) {
                setOfertasAcademicas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOfertas();
    }, []);

    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 bg-gray-100">
            {/* Sección 1: Título */}
            <section
                className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>
                <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 p-4 text-white">
                    <h2 className="text-5xl font-bold drop-shadow-lg">OFERTAS ACADÉMICAS</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                        Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>

            <div className="w-full h-1 bg-primary rounded-full"></div>

            {/* Sección 2: Últimas Publicaciones */}
            <section className="relative max-w-full">
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-semibold text-primary text-center mb-6">
                    Lo último de las Ofertas Académicas
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-center col-span-3">Cargando ofertas...</p>
                    ) : ofertasAcademicas.length === 0 ? (
                        <p className="text-center col-span-3">No hay ofertas disponibles.</p>
                    ) : (
                        ofertasAcademicas.map((oferta) => (
                            <motion.div
                                key={oferta.ofertas_id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer"
                                onClick={() => setSelectedOferta(oferta)}
                            >
                                <Image
                                    src={`https://serviciopagina.upea.bo/Carrera/OfertasAcademicas/${oferta.ofertas_imagen}`}
                                    alt={oferta.ofertas_titulo}
                                    width={400}
                                    height={200}
                                    className="rounded-lg w-full h-48 object-cover"
                                    unoptimized
                                />
                                <h3 className="mt-4 font-semibold text-lg">{oferta.ofertas_titulo}</h3>
                                <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: oferta.ofertas_descripcion }}></p>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* Modal de imagen */}
            {selectedOferta && (
                <ImageModal
                    onClose={() => setSelectedOferta(null)}
                    imageSrc={`https://serviciopagina.upea.bo/Carrera/OfertasAcademicas/${selectedOferta.ofertas_imagen}`}
                    title={selectedOferta.ofertas_titulo}
                />
            )}
        </main>
    );
}