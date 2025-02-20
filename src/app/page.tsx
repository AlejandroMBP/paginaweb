'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from '@/components/ModalInicio';
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
                    className="text-3xl font-montserrat font-semibold text-primary text-center mb-6 relative"
                >
                    ÚLTIMAS PUBLICACIONES
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6 min-h-[150px] justify-center">
                    {publicaciones.length > 0 ? (
                        publicaciones.map((post) => (
                            <motion.div
                                key={post.publicaciones_id}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => openModal(post)}
                                className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer"
                            >
                                <Image
                                    src={`https://serviciopagina.upea.bo/Publicaciones/${post.publicaciones_imagen}`}
                                    alt={post.publicaciones_titulo}
                                    width={400}
                                    height={200}
                                    className="rounded-lg"
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
                        ))
                    ) : (
                        <div className="flex justify-center items-center w-full col-span-3">
                            <p className="text-center text-gray-500 text-lg font-semibold mt-6">
                                Cargando publicaciones...
                            </p>
                        </div>
                    )}
                </div>
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
                        <h2 className="text-2xl font-bold mb-4">
                            {selectedPublication.publicaciones_titulo}
                        </h2>
                        <Image
                            src={`https://serviciopagina.upea.bo/Publicaciones/${selectedPublication.publicaciones_imagen}`}
                            alt={selectedPublication.publicaciones_titulo}
                            width={500}
                            height={300}
                            className="rounded-lg"
                            unoptimized
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
                    className="text-3xl font-montserrat font-semibold text-primary text-center mb-6 relative"
                >
                    AUTORIDADES
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                {data && data.Descripcion && data.Descripcion.autoridad ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.Descripcion.autoridad.map((autoridad) => (
                            <motion.div
                                key={autoridad.id_autoridad}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="p-4 border rounded-lg shadow-lg transform hover:shadow-xl transition-shadow duration-300 bg-white"
                            >
                                <img
                                    src={`https://serviciopagina.upea.bo/InstitucionUpea/Autoridad/${autoridad.foto_autoridad}`}
                                    alt={autoridad.nombre_autoridad}
                                    className="w-32 h-32 rounded-full border-4 border-primary mx-auto shadow-md"
                                />
                                <h3 className="text-lg font-bold text-center mt-4 text-primary">
                                    {autoridad.nombre_autoridad}
                                </h3>
                                <p className="text-sm text-center text-gray-600">
                                    {autoridad.cargo_autoridad}
                                </p>
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
                    className="text-3xl font-semibold text-primary mb-6 text-center relative"
                >
                    UBICACIÓN
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg border border-gray-200">
                    {loading || !mapsUbicacion ? (
                        <p className="text-center text-gray-500 text-lg font-semibold mt-6">
                            Cargando mapa...
                        </p>
                    ) : (
                        <iframe
                            src={mapsUbicacion}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    )}
                </div>
                <div className="text-center text-primary">
                    <strong>{loading ? 'Cargando...' : direccion}</strong>
                </div>
                <br />
            </section>
        </main>
    );
}
