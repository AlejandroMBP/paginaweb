'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ImageModal from '@/components/ModalInicio';
import { FaEye } from 'react-icons/fa';
import Preloader from '@/components/layout/preloader';
import PortadaSeccion from '@/components/portada';
type Eventos = {
    evento_id: number;
    evento_titulo: string;
    evento_tipo: string;
    evento_imagen: string;
    evento_descripcion: string;
    evento_fecha: string;
    evento_hora: string;
    evento_lugar: string;
};

export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [eventos, setEventos] = useState<Eventos[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string>('');

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/eventoAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                setEventos(result);
            } catch (error) {
                console.error('Error al cargar eventos:', error); // Agrega un manejo de errores más detallado
                setEventos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    const handleImageClick = (imageSrc: string, title: string) => {
        setSelectedImage(imageSrc);
        setSelectedTitle(title);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
        setSelectedTitle('');
    };

    return (
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-100">
                {/* Sección 1: Título */}
                <PortadaSeccion
                    titulo={'EVENTOS'}
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                />
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
                            LOS ÚLTIMOS EVENTOS
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
                                Cargando eventos...
                            </p>
                        ) : eventos.length > 0 ? (
                            eventos.map((evento) => (
                                <motion.div
                                    key={evento.evento_id}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() =>
                                        handleImageClick(
                                            `https://serviciopagina.upea.bo/Eventos/${evento.evento_imagen}`,
                                            evento.evento_titulo
                                        )
                                    }
                                    className="relative bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer group transition-all duration-300 w-[400px] h-[500px] flex flex-col"
                                >
                                    {/* Imagen */}
                                    <Image
                                        src={`https://serviciopagina.upea.bo/Eventos/${evento.evento_imagen}`}
                                        alt={evento.evento_titulo}
                                        width={400}
                                        height={600}
                                        className="rounded-lg w-full h-[22rem] object-cover" // ⬅️ Hice la imagen más alta
                                        unoptimized
                                    />

                                    {/* Efecto de hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Contenido flotante en hover */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all duration-500">
                                        <div className="flex flex-col items-center">
                                            <FaEye className="w-12 h-12 text-primary" />
                                            <h3 className="mt-2 text-lg font-semibold text-center">
                                                VER EVENTO
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Información del evento (más abajo) */}
                                    <div className="p-6 mt-auto">
                                        {' '}
                                        {/* ⬅️ mt-auto empuja el contenido al fondo */}
                                        <h3 className="font-semibold text-lg text-primary">
                                            {evento.evento_titulo}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {evento.evento_lugar}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center col-span-3">
                                No hay eventos disponibles.
                            </p>
                        )}
                    </div>
                </section>

                {modalOpen && (
                    <ImageModal
                        onClose={handleCloseModal}
                        imageSrc={selectedImage!}
                        title={selectedTitle}
                    />
                )}
            </main>
        </Preloader>
    );
}
