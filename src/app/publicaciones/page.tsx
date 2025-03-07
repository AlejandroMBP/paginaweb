'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from '@/components/ModalInicio'; // Asegúrate de importar el componente Modal
import { FaEye } from 'react-icons/fa';
import Preloader from '@/components/layout/preloader';
import PortadaSeccion from '@/components/portada';
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
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-16 bg-gray-100">
                <PortadaSeccion
                    titulo={'PUBLICACIONES'}
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                />
                <div
                    id="next-section"
                    className="w-full h-1 bg-primary rounded-full mb-6"
                ></div>

                <section className="relative max-w-full">
                    <div className="w-full flex justify-center">
                        <nav className="sticky top-20 z-40 inline-flex justify-center space-x-4 flex-wrap mb-6 bg-white px-4 md:px-6 lg:px-8 py-4 rounded-lg shadow-md transition-all duration-300">
                            {['todas', ...categoriasDefinidas, 'otros'].map(
                                (category) => (
                                    <motion.button
                                        key={category}
                                        onClick={() =>
                                            setSelectedCategory(
                                                category.toLowerCase()
                                            )
                                        }
                                        className={`text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out ${
                                            selectedCategory ===
                                            category.toLowerCase()
                                                ? 'bg-primary text-white shadow-lg scale-105'
                                                : 'bg-white text-secondary hover:bg-primary hover:text-white hover:shadow-2xl hover:scale-105'
                                        }`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {category.charAt(0).toUpperCase() +
                                            category.slice(1)}
                                    </motion.button>
                                )
                            )}
                        </nav>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative text-5xl font-montserrat font-extrabold text-primary text-center mb-8 uppercase tracking-wide drop-shadow-xl px-6 py-3 flex items-center justify-center"
                    >
                        {/* Líneas animadas - Izquierda */}
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

                        {/* Texto principal */}
                        <span className="relative z-10">PUBLICACIONES</span>

                        {/* Líneas animadas - Derecha */}
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

                        {/* Fondo degradado decorativo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20 blur-lg opacity-50"></div>

                        {/* Línea decorativa principal */}
                        <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-28 h-1 bg-primary rounded-full"></span>

                        {/* Subrayado animado más llamativo */}
                        <motion.span
                            initial={{ width: '3rem' }}
                            whileHover={{ width: '7rem' }}
                            transition={{ duration: 0.5 }}
                            className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-1 bg-secondary rounded-full"
                        ></motion.span>

                        {/* Brillo sutil */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0"
                        ></motion.div>

                        {/* Borde resplandeciente */}
                        <motion.div
                            initial={{ borderColor: 'transparent' }}
                            whileHover={{
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 border-2 border-transparent rounded-lg"
                        ></motion.div>
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
                                    className="bg-white shadow-xl rounded-3xl overflow-hidden p-6 border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer relative group"
                                    onClick={() => openModal(post)}
                                >
                                    <Image
                                        src={`https://serviciopagina.upea.bo/Publicaciones/${post.publicaciones_imagen}`}
                                        alt={post.publicaciones_titulo}
                                        width={400}
                                        height={250}
                                        className="rounded-lg"
                                        unoptimized
                                    />

                                    {/* Efecto de hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Contenido en hover */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500">
                                        <FaEye className="w-10 h-10 text-primary" />
                                        <h3 className="mt-2 text-xl font-semibold text-center">
                                            ABRIR <br />{' '}
                                            {post.publicaciones_titulo}
                                        </h3>
                                    </div>

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
        </Preloader>
    );
}
