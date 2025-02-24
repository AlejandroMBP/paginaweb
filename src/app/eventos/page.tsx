'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ImageModal from '@/components/ModalInicio';

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
                const response = await fetch('https://serviciopagina.upea.bo/api/eventoAll/10');
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
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
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">
            {/* Sección 1: Título */}
            <section
                className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-4 text-white"
                >
                    <h2 className="text-5xl font-bold drop-shadow-lg">EVENTOS</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                        Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>

            <div className="w-full h-1 bg-primary rounded-full"></div>

            {/* Sección 2: Últimas Publicaciones */}
            <section className="relative max-w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-semibold text-primary text-center mb-6 relative"
                >
                    Los Últimos Eventos
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-center col-span-3">Cargando eventos...</p>
                    ) : eventos.length > 0 ? (
                        eventos.map((evento) => (
                            <motion.div
                                key={evento.evento_id}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleImageClick(`https://serviciopagina.upea.bo/Eventos/${evento.evento_imagen}`, evento.evento_titulo)}
                                className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer"
                            >
                                <Image
                                    src={`https://serviciopagina.upea.bo/Eventos/${evento.evento_imagen}`}
                                    alt={evento.evento_titulo} // Cambié el alt para que sea más descriptivo
                                    width={400}
                                    height={200}
                                    className="rounded-lg"
                                    unoptimized
                                />
                                <h3 className="mt-4 font-semibold text-lg">{evento.evento_titulo}</h3>
                                <p className="text-sm text-gray-500">{evento.evento_lugar}</p>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center col-span-3">No hay eventos disponibles.</p>
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
    );
}
