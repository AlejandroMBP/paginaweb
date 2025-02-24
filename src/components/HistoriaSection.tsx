'use client';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';

// Importar los estilos de react-pdf
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function HistoriaSection() {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    return (
        <>
            {/* Contenido */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
                <a
                    href="/documentos/HISTORIACARRERA.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 border rounded-lg overflow-hidden shadow bg-gray-100 flex justify-center relative group cursor-pointer"
                >
                    {/* Vista previa del PDF */}
                    <div className="w-full mt-4 border rounded-lg overflow-hidden shadow bg-gray-100 flex justify-center relative group">
                        <Document
                            file="/documentos/HISTORIACARRERA.pdf"
                            onLoadSuccess={({ numPages }) =>
                                setNumPages(numPages)
                            }
                            onLoadError={() =>
                                setError('No se pudo cargar el PDF')
                            }
                            className="p-4"
                        >
                            {error ? (
                                <p className="text-red-600">{error}</p>
                            ) : (
                                <Page
                                    pageNumber={1}
                                    renderTextLayer={false}
                                    width={350}
                                />
                            )}
                        </Document>

                        {/* Efecto de hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Contenido en hover */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500">
                            {/* Icono de abrir documento */}
                            <FaEye className="w-10 h-10 text-primary" />
                            <h2 className="text-xl font-semibold mt-2">
                                ABRIR DOCUMENTO
                            </h2>
                        </div>
                    </div>
                </a>
            </motion.div>
        </>
    );
}
