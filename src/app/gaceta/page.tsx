'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Preloader from '@/components/layout/preloader';
import PortadaSeccion from '@/components/portada';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Gaceta = {
    gaceta_id: number;
    gaceta_titulo: string;
    gaceta_fecha: string;
    gaceta_tipo: string;
    gaceta_documento: string;
};

export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [gacetas, setGaceta] = useState<Gaceta[]>([]);

    useEffect(() => {
        const fetchGaceta = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/gacetaunivAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                setGaceta(result);
            } catch (error) {
                setGaceta([]);
            } finally {
                setLoading(false);
            }
        };
        fetchGaceta();
    }, []);
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options); // Cambia 'es-ES' por el código de idioma que desees
    };
    return (
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-100">
                {/* Sección 1: Título */}
                <PortadaSeccion
                    titulo={'GACETA'}
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
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
                            LO ÚLTIMO DE LAS PUBLICACIONES DE LA GACETA
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
                    <div className="grid md:grid-cols-4 gap-6">
                        {loading ? (
                            <p className="text-center col-span-3">
                                Cargando gaceta...
                            </p>
                        ) : gacetas.length > 0 ? (
                            gacetas.map((gaceta) => (
                                <motion.div
                                    key={gaceta.gaceta_id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white shadow-lg rounded-xl overflow-hidden transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer w-full md:w-80 h-[30rem] flex flex-col relative group"
                                >
                                    {/* Vista previa del PDF */}
                                    <div className="w-full h-[30rem] border-b border-gray-300 overflow-hidden bg-gray-100 flex justify-center items-center relative group">
                                        <Document
                                            file={`https://serviciopagina.upea.bo/Gaceta/${gaceta.gaceta_documento}`}
                                            loading="Cargando PDF..."
                                        >
                                            <Page
                                                pageNumber={1}
                                                renderTextLayer={false}
                                                width={290}
                                                height={350}
                                            />
                                        </Document>

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2793F2] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

                                        <a
                                            href={`https://serviciopagina.upea.bo/Gaceta/${gaceta.gaceta_documento}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                        >
                                            <FaExternalLinkAlt className="text-4xl text-primary" />
                                            <h3 className="text-xl font-semibold mt-2 text-white">
                                                Abrir documento
                                            </h3>
                                        </a>
                                    </div>

                                    {/* Contenido del card */}
                                    <div className="p-4 flex flex-col justify-between flex-grow hove:text-white">
                                        <a
                                            href={`https://serviciopagina.upea.bo/Gaceta/${gaceta.gaceta_documento}`}
                                            target="_blank"
                                        >
                                            <h3 className="font-semibold text-lg text-primary truncate">
                                                {gaceta.gaceta_titulo}
                                            </h3>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    {gaceta.gaceta_tipo}
                                                </p>
                                                <p className="text-sm text-gray-600 ">
                                                    {formatDate(
                                                        gaceta.gaceta_fecha
                                                    )}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center col-span-3">
                                No hay gaceta no disponible disponibles.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </Preloader>
    );
}
