import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Modal from './ModalInicio';
import { Eye } from 'lucide-react';

interface Publicaciones {
    publicaciones_id: number;
    publicaciones_titulo: string;
    publicaciones_tipo: string;
    publicaciones_imagen: string;
    publicaciones_descripcion: string;
    publicaciones_fecha: string;
    publicaciones_autor: string;
    publicaciones_documento: string;
}

interface PublicacionesSectionProps {
    publicaciones: Publicaciones[];
}

export default function PublicacionesSection({
    publicaciones,
}: PublicacionesSectionProps) {
    // Estados para el modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] =
        useState<Publicaciones | null>(null);

    // Función para abrir el modal
    const handleOpenModal = (post: Publicaciones) => {
        setSelectedPublication(post);
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPublication(null);
    };

    // Filtrar las publicaciones actuales
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 720); // Ajusta el número de días según tus necesidades

    const currentPublications = publicaciones.filter((post) => {
        const publicationDate = new Date(post.publicaciones_fecha);
        return publicationDate >= thirtyDaysAgo;
    });

    return (
        <section className="relative max-w-full px-4 md:px-8 bg-white">
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
                <span className="relative z-10">ÚLTIMAS PUBLICACIONES</span>

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
            </motion.h2>

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="w-full"
            >
                {currentPublications.length > 0 ? (
                    currentPublications.map((post) => (
                        <SwiperSlide key={post.publicaciones_id}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleOpenModal(post)}
                                className="relative bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer min-w-[30rem] min-h-[40rem] flex flex-col"
                            >
                                {/* Contenedor de la imagen con grupo para hover */}
                                <div className="relative w-full h-[450px] overflow-hidden rounded-t-xl">
                                    <Image
                                        src={`https://serviciopagina.upea.bo/Publicaciones/${post.publicaciones_imagen}`}
                                        alt={post.publicaciones_titulo}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />

                                    {/* Degradado animado sobre la imagen */}
                                    <motion.div
                                        initial={{ opacity: 0, y: '100%' }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'easeOut',
                                        }}
                                        className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-80"
                                    />

                                    {/* Icono y texto "Click para abrir" */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(to top, rgba(39, 147, 242, 0.8), transparent)',
                                        }}
                                    >
                                        <Eye className="w-12 h-12 text-primary mb-2" />

                                        <span className="text-xl font-extrabold text-white uppercase tracking-wide">
                                            CLICK PARA ABRIR
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Contenido con título y descripción */}
                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {post.publicaciones_titulo}
                                    </h3>
                                    <p
                                        className="text-sm text-gray-600 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: post.publicaciones_descripcion,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-full col-span-3 mt-10">
                        <Image
                            src="/gifs/trabajando.gif"
                            alt="Trabajando"
                            width={300}
                            height={300}
                            className="mb-4"
                        />
                        <p className="text-center text-secondary text-lg font-semibold mt-6 bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md">
                            Pronto nuevas publicaciones
                        </p>
                    </div>
                )}
            </Swiper>

            {/* Modal */}
            {modalOpen && selectedPublication && (
                <Modal
                    onClose={handleCloseModal}
                    imageSrc={`https://serviciopagina.upea.bo/Publicaciones/${selectedPublication.publicaciones_imagen}`}
                    title={selectedPublication.publicaciones_titulo}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 bg-white rounded-lg shadow-lg"
                    >
                        <p
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html: selectedPublication.publicaciones_descripcion,
                            }}
                        />
                    </motion.div>
                </Modal>
            )}
        </section>
    );
}
