'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FaExternalLinkAlt } from 'react-icons/fa';
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
                    <h2 className="text-5xl font-bold drop-shadow-lg">
                        GACETA
                    </h2>
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
                    className="text-3xl font-semibold text-primary text-center mb-6 relative"
                >
                    LO ÚLTIMO DE LAS PUBLICACIONES DE LA GACETA
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
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

                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

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
    );
}
