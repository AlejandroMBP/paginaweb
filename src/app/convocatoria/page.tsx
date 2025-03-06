'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import Preloader from '@/components/layout/preloader';
import PortadaSeccion from '@/components/portada';

type Convocatoria = {
    idconvocatorias: number;
    con_foto_portada: string;
    con_titulo: string;
    con_descripcion: string;
    con_estado: string;
    con_fecha_inicio: string;
    con_fecha_fin: string;
    tipo_conv_comun: {
        idtipo_conv_comun: number;
        tipo_conv_comun_titulo: string;
        tipo_conv_comun_estado: string;
    };
};

export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
    const [selectedConvocatoria, setSelectedConvocatoria] =
        useState<Convocatoria | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchConvocatoria = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/convocatoriasAll/20'
                );

                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);

                const result = await response.json();
                setConvocatorias(result);
            } catch (error) {
                console.error('Error al obtener datos', error);
                setConvocatorias([]);
            } finally {
                setLoading(false);
            }
        };

        fetchConvocatoria();
    }, []);

    const handleOpenModal = (convocatoria: Convocatoria) => {
        setSelectedConvocatoria(convocatoria);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedConvocatoria(null);
        setIsModalOpen(false);
    };

    return (
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-100">
                {/* Sección 1: Título */}
                <PortadaSeccion
                    titulo={'CONVOCATORIAS'}
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                    backgroundImage="/image/fondo.jpg"
                />

                {/* Separador decorativo */}
                <div
                    id="next-section"
                    className="w-full h-1 bg-primary rounded-full"
                ></div>
                {/* Sección 2: Últimas Publicaciones */}
                <section className="relative max-w-full">
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
                            CONVOCATORIAS DE LA CARRERA
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

                    <div className="grid md:grid-cols-3 gap-6">
                        {loading ? (
                            <p className="text-center col-span-3">
                                Cargando convocatorias...
                            </p>
                        ) : convocatorias.length > 0 ? (
                            convocatorias.map((convocatoria) => (
                                <motion.div
                                    key={convocatoria.idconvocatorias}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() =>
                                        handleOpenModal(convocatoria)
                                    }
                                    className="relative bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer flex flex-col items-center group w-[450px] h-[550px]"
                                >
                                    {/* Imagen de la convocatoria */}
                                    <Image
                                        src={`https://serviciopagina.upea.bo/Convocatorias/${convocatoria.con_foto_portada}`}
                                        alt="Publicación"
                                        width={400}
                                        height={200}
                                        className="rounded-lg mb-4 w-full h-[25rem] object-cover"
                                        unoptimized
                                    />

                                    {/* Efecto de Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Contenido en Hover */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all duration-500">
                                        <div className="flex flex-col items-center">
                                            <FaEye className="w-12 h-12 text-primary" />
                                            <h3 className="mt-2 text-lg font-semibold text-center">
                                                VER CONVOCATORIA
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Información de la Convocatoria */}
                                    <div>
                                        <h3 className="font-semibold text-lg text-center text-primary">
                                            {convocatoria.con_titulo}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center col-span-3">
                                No hay gaceta no disponible disponibles.
                            </p>
                        )}
                    </div>

                    {/* Modal para mostrar detalles de la convocatoria */}
                    {selectedConvocatoria && (
                        <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            convocatoria={selectedConvocatoria}
                        />
                    )}
                </section>
            </main>
        </Preloader>
    );
}
