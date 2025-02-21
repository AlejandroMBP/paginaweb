'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from '@/components/ModalInicio';
import { ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

type InstitucionData = {
    Descripcion?: {
        institucion_nombre?: string;
        institucion_api_google_map?: string;
        institucion_direccion?: string;
        autoridad?: {
            id_autoridad: number;
            nombre_autoridad: string;
            cargo_autoridad: string;
            foto_autoridad: string;
        }[];
    };
};
type Publicaciones = {
    publicaciones_id: number;
    publicaciones_titulo: string;
    publicaciones_tipo: string;
    publicaciones_imagen: string;
    publicaciones_descripcion: string;
    publicaciones_fecha: Date;
    publicaciones_autor: string;
    publicaciones_documento: string;
};
export default function InicioPage() {
    const [institucionNombre, setInstitucionNombre] = useState('Cargando...');
    const [data, setData] = useState<InstitucionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mapsUbicacion, setmapsUbicacion] = useState('Cargando...');
    const [direccion, setDireccion] = useState('Cargando...');
    const [publicaciones, setPublicaciones] = useState<Publicaciones[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] =
        useState<Publicaciones | null>(null);

    useEffect(() => {
        const fetchInstitucion = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/InstitucionUPEA/10'
                );

                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);

                const result = await response.json();
                console.log('Respuesta de la API1:', result); // Verifica los datos en consola

                setData(result); // Guardamos la respuesta completa en data
                setInstitucionNombre(
                    result?.Descripcion?.institucion_nombre ||
                        'Nombre no disponible'
                );
                setmapsUbicacion(
                    result?.Descripcion?.institucion_api_google_map ||
                        'https://www.google.com/maps/embed?...'
                );
                setDireccion(
                    result?.Descripcion?.institucion_direccion ||
                        'Direccion no definida'
                );
            } catch (error) {
                console.error('Error al obtener datos', error);
                setInstitucionNombre('Carrera no disponible');
                setmapsUbicacion('https://www.google.com/maps/embed?...');
                setDireccion('Direccion no definida');
            } finally {
                setLoading(false);
            }
        };

        // fetch de publicaciones
        const fetchPublicaciones = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/publicacionesAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                console.log('Respuesta de la API:', result);
                setPublicaciones(result);
            } catch (error) {
                console.error('Error al obtener publicaciones', error);
                setPublicaciones([]);
            } finally {
                setLoading(false);
            }
        };
        fetchInstitucion();
        fetchPublicaciones();
    }, []);
    // Función para abrir el modal
    const openModal = (publication: Publicaciones) => {
        setSelectedPublication(publication);
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        setModalOpen(false);
        setSelectedPublication(null);
    };
    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">
            {/* Sección 1: Título */}
            <section
                className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                {/* Superposición semi-transparente */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                {/* Contenido */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-4 text-white"
                >
                    <h1 className="font-montserrat text-5xl font-bold drop-shadow-lg">
                        {loading
                            ? 'Cargando...'
                            : institucionNombre.toUpperCase()}
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                        Formación académica con enfoque en liderazgo,
                        emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>
            {/* Separador decorativo */}
            <div className="w-full h-1 bg-primary rounded-full"></div>
            {/* Sección 2: Últimas Publicaciones */}
            <section className="relative max-w-full">
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
                        whileHover={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-transparent rounded-lg"
                    ></motion.div>
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
                    {publicaciones.length > 0 ? (
                        publicaciones.map((post) => (
                            <SwiperSlide key={post.publicaciones_id}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => openModal(post)}
                                    className="relative bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer min-w-[30rem] min-h-[40rem]"
                                >
                                    <Image
                                        src={`https://serviciopagina.upea.bo/Publicaciones/${post.publicaciones_imagen}`}
                                        alt={post.publicaciones_titulo}
                                        width={400} // Ancho fijo
                                        height={400} // Alto fijo
                                        className="rounded-lg w-full h-[450px] object-cover" // Tamaño fijo
                                        unoptimized
                                    />
                                    <h3 className="mt-4 font-semibold text-lg">
                                        {post.publicaciones_titulo}
                                    </h3>
                                    <p
                                        className="text-sm text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: post.publicaciones_descripcion,
                                        }}
                                    />
                                </motion.div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="flex justify-center items-center w-full col-span-3">
                            <p className="text-center text-gray-500 text-lg font-semibold mt-6">
                                Cargando publicaciones...
                            </p>
                        </div>
                    )}
                </Swiper>
            </section>

            {/* Modal para Publicaciones */}
            {modalOpen && selectedPublication && (
                <Modal
                    onClose={handleClose}
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

            {/* Separador decorativo */}
            <div className="w-full h-1 bg-primary rounded-full"></div>
            {/* Sección 3: Autoridades */}
            <section className="relative max-w-full">
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
                    <span className="relative z-10">AUTORIDADES</span>

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
                        whileHover={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-transparent rounded-lg"
                    ></motion.div>
                </motion.h2>

                {data?.Descripcion?.autoridad ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.Descripcion.autoridad.map((autoridad) => (
                            <motion.div
                                key={autoridad.id_autoridad}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                                    borderColor: '#C20317',
                                }}
                                transition={{ duration: 0.3 }}
                                className="relative border-4 border-white rounded-lg shadow-lg overflow-hidden min-w-[30rem] min-h-[40rem] transition-all duration-300 group"
                            >
                                {/* Imagen de fondo */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                                    style={{
                                        backgroundImage: `url(https://serviciopagina.upea.bo/InstitucionUpea/Autoridad/${autoridad.foto_autoridad})`,
                                    }}
                                />

                                {/* Overlay degradado (solo aparece en hover) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0511F2] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

                                {/* Información */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 text-center p-4">
                                    <h3 className="text-lg font-bold text-primary">
                                        {autoridad.nombre_autoridad}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {autoridad.cargo_autoridad}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg font-semibold mt-6">
                        Cargando autoridad...
                    </p>
                )}
            </section>

            {/* Separador decorativo */}
            <div className="w-full h-1 bg-primary rounded-full"></div>
            {/* Sección 4: Ubicación */}
            <section className="w-full">
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
                    <span className="relative z-10">UBICACIÓN</span>

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
                        whileHover={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-transparent rounded-lg"
                    ></motion.div>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full h-96 overflow-hidden rounded-lg shadow-lg border border-gray-200"
                >
                    {loading || !mapsUbicacion ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center text-gray-500 text-lg font-semibold mt-6"
                        >
                            Cargando mapa...
                        </motion.p>
                    ) : (
                        <iframe
                            src={mapsUbicacion}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center text-primary mt-2"
                >
                    <strong>{loading ? 'Cargando...' : direccion}</strong>
                </motion.div>
            </section>
        </main>
    );
}
