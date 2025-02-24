"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";

// Importar los estilos de react-pdf
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

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
                {/* Vista previa del PDF */}
                <div className="w-full mt-4 border rounded-lg overflow-hidden shadow bg-gray-100 flex justify-center">
                    <Document
                        file="/documentos/HISTORIACARRERA.pdf"
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        onLoadError={() => setError("No se pudo cargar el PDF")}
                        className="p-4"
                    >
                        {error ? (
                            <p className="text-red-600">{error}</p>
                        ) : (
                            <Page pageNumber={1} width={350} />
                        )}
                    </Document>
                </div>
            </motion.div>
        </>
    );
}
