'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from '@/components/ModalInicio'; // Asegúrate de importar el componente Modal

type PublicacionesApi = {
    publicaciones_id: number;
    publicaciones_titulo: string;
    publicaciones_tipo: string;
    publicaciones_imagen: string;
    publicaciones_descripcion: string;
    publicaciones_fecha: string;
    publicaciones_autor: string;
    publicaciones_documento: string;
};

export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [publiPagina, setPubliPagina] = useState<PublicacionesApi[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('todas');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] =
        useState<PublicacionesApi | null>(null);

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/publicacionesAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                console.log('resultado: ', result);
                setPubliPagina(result);
            } catch (error) {
                console.error('Error al obtener publicaciones:', error);
                setPubliPagina([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicacion();
    }, []);

    const categoriasDefinidas = [
        'kardex',
        'centro de estudiantes',
        'postgrado',
        'noticia',
        'invitacion',
    ];

    const filteredPublications =
        selectedCategory === 'todas'
            ? publiPagina
            : selectedCategory === 'otros'
            ? publiPagina.filter(
                  (publi) =>
                      !categoriasDefinidas.includes(
                          publi.publicaciones_tipo.toLowerCase()
                      )
              )
            : publiPagina.filter(
                  (publi) =>
                      publi.publicaciones_tipo.toLowerCase() ===
                      selectedCategory
              );

    // Función para abrir el modal
    const openModal = (publication: PublicacionesApi) => {
        setSelectedPublication(publication);
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedPublication(null);
    };

    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 bg-gray-100">
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
                    <h1 className="text-5xl font-bold">Publicaciones</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto">
                        Formación académica con enfoque en liderazgo,
                        emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>

            <nav className="sticky top-20 z-50 flex justify-center space-x-4 flex-wrap mb-6 bg-white p-4 rounded-lg shadow-md transition-all duration-300">
                {['todas', ...categoriasDefinidas, 'otros'].map((category) => (
                    <motion.button
                        key={category}
                        onClick={() =>
                            setSelectedCategory(category.toLowerCase())
                        }
                        className={`text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out ${
                            selectedCategory === category.toLowerCase()
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white text-secondary hover:bg-primary hover:text-white hover:shadow-2xl hover:scale-105'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                ))}
            </nav>

            <div className="w-full h-1 bg-primary rounded-full mb-6"></div>

            <section className="relative max-w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-semibold text-primary text-center mb-6 relative"
                >
                    Publicaciones
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>
                {loading ? (
                    <p className="text-center text-gray-600">
                        Cargando publicaciones...
                    </p>
                ) : filteredPublications.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <Image
                            src="/gifs/trabajando.gif"
                            alt="No hay publicaciones"
                            width={300}
                            height={300}
                            unoptimized
                        />
                        <p className="text-center text-gray-600 mt-4">
                            No hay publicaciones por el momento.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {filteredPublications.map((post) => (
                            <motion.div
                                key={post.publicaciones_id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white shadow-xl rounded-3xl overflow-hidden p-6 border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer"
                                onClick={() => openModal(post)} // Abre el modal al hacer clic
                            >
                                <Image
                                    src={`https://serviciopagina.upea.bo/Publicaciones/${post.publicaciones_imagen}`}
                                    alt={post.publicaciones_titulo}
                                    width={400}
                                    height={250}
                                    className="rounded-lg"
                                    unoptimized
                                />
                                <h3 className="mt-4 text-xl font-semibold text-primary">
                                    {post.publicaciones_titulo}
                                </h3>
                                <p
                                    className="text-sm text-gray-500"
                                    dangerouslySetInnerHTML={{
                                        __html: post.publicaciones_descripcion,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal para mostrar la publicación seleccionada */}
            {modalOpen && selectedPublication && (
                <Modal
                    onClose={closeModal}
                    imageSrc={`https://serviciopagina.upea.bo/Publicaciones/${selectedPublication.publicaciones_imagen}`}
                    title={selectedPublication.publicaciones_titulo}
                >
                    <div className="p-4">
                        <p
                            className="text-sm text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html: selectedPublication.publicaciones_descripcion,
                            }}
                        />
                    </div>
                </Modal>
            )}
        </main>
    );
}
