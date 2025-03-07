'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ImageModal from '@/components/ModalInicio';
import { FaEye } from 'react-icons/fa';
import Preloader from '@/components/layout/preloader';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PortadaSeccion from '@/components/portada';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const documentos = [
    { file: '/documentos/titulacionCAE.pdf', title: 'Datos de titulación CAE' },
    { file: '/documentos/MALLACURRICULAR2022.pdf', title: 'Malla Curricular' },
    { file: '/documentos/planDeEstudios.pdf', title: 'Plan de Estudios' },
];

type OfertasAcademicas = {
    ofertas_id: number;
    ofertas_titulo: string;
    ofertas_descripcion: string;
    ofertas_inscripciones_ini: string;
    ofertas_inscripciones_fin: string;
    ofertas_fecha_examen: string;
    ofertas_imagen: string;
    ofertas_referencia: string;
    ofertas_estado: number;
    ofertas_fecha_creacion: string;
    ofertas_fecha_update: string;
};

export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [ofertasAcademicas, setOfertasAcademicas] = useState<
        OfertasAcademicas[]
    >([]);
    const [selectedOferta, setSelectedOferta] =
        useState<OfertasAcademicas | null>(null);
    const [selectedDocument, setSelectedDocument] = useState(documentos[0]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/OfertasAcademicasAll/20'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                setOfertasAcademicas(result);
            } catch (error) {
                setOfertasAcademicas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOfertas();
    }, []);

    return (
        <Preloader>
            <main className="flex flex-col items-center min-h-screen gap-16 bg-gray-100">
                {/* Sección 1: Título */}
                <PortadaSeccion
                    titulo={'OFERTAS ACADÉMICAS'}
                    subtitulo="Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional."
                />
                <div
                    id="next-section"
                    className="w-full h-1 bg-primary rounded-full"
                ></div>
                <div>
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
                            DOCUMENTOS IMPORTANTES
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
                </div>

                <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
                    {/* Card con documento seleccionado */}
                    <motion.div
                        key={selectedDocument.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="flex-1 bg-white shadow-lg rounded-xl p-6 border border-gray-200 relative overflow-hidden"
                    >
                        <h3 className="text-lg font-semibold text-primary text-center mb-4 uppercase">
                            {selectedDocument.title}
                        </h3>
                        <div className="flex justify-center relative group">
                            <a
                                href={selectedDocument.file}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Document
                                    file={selectedDocument.file}
                                    onLoadError={() =>
                                        setError('No se pudo cargar el PDF')
                                    }
                                    className="flex justify-center"
                                >
                                    {error ? (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-red-600 text-center"
                                        >
                                            {error}
                                        </motion.p>
                                    ) : (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'easeOut',
                                            }}
                                            className="relative"
                                        >
                                            {/* Página del PDF */}
                                            <Page
                                                pageNumber={1}
                                                renderTextLayer={false}
                                                width={500}
                                                className="shadow-lg rounded-lg"
                                            />

                                            {/* Efecto hover con degradado y botón */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500 bg-gradient-to-t from-[#2793F2] to-transparent rounded-lg">
                                                <FaEye className="w-10 h-10 text-primary" />
                                                <h3 className="mt-2 text-xl font-semibold text-center">
                                                    ABRIR <br />{' '}
                                                    {selectedDocument.title}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    )}
                                </Document>
                            </a>
                        </div>
                    </motion.div>

                    {/* Menú de selección */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-xl font-semibold text-primary text-center mb-4 uppercase">
                            documentos
                        </h3>
                        <ul className="space-y-4">
                            {documentos.map((doc) => (
                                <motion.li
                                    key={doc.title}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`cursor-pointer p-3 rounded-lg text-center transition-all duration-300 ${
                                        selectedDocument.title === doc.title
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                    onClick={() => setSelectedDocument(doc)}
                                >
                                    {doc.title}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="w-full h-1 bg-primary rounded-full"></div>
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
                            LO ÚLTIMO DE LAS OFERTAS ACADÉMICAS
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
                    <div className="grid md:grid-cols-3 gap-6">
                        {loading ? (
                            <p className="text-center col-span-3">
                                Cargando ofertas...
                            </p>
                        ) : ofertasAcademicas.length === 0 ? (
                            <p className="text-center col-span-3">
                                No hay ofertas disponibles.
                            </p>
                        ) : (
                            ofertasAcademicas.map((oferta) => (
                                <motion.div
                                    key={oferta.ofertas_id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50 cursor-pointer relative group"
                                    onClick={() => setSelectedOferta(oferta)}
                                >
                                    <Image
                                        src={`https://serviciopagina.upea.bo/Carrera/OfertasAcademicas/${oferta.ofertas_imagen}`}
                                        alt={oferta.ofertas_titulo}
                                        width={400}
                                        height={200}
                                        className="rounded-lg w-full h-48 object-cover"
                                        unoptimized
                                    />

                                    {/* Efecto de hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2793F2] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                    {/* Contenido en hover */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500">
                                        <FaEye className="w-10 h-10 text-primary" />
                                        <h3 className="mt-2 text-xl font-semibold text-center">
                                            ABRIR <br /> {oferta.ofertas_titulo}
                                        </h3>
                                    </div>

                                    <h3 className="mt-4 font-semibold text-lg text-primary">
                                        {oferta.ofertas_titulo}
                                    </h3>
                                    <p
                                        className="text-sm text-black"
                                        dangerouslySetInnerHTML={{
                                            __html: oferta.ofertas_descripcion,
                                        }}
                                    ></p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </section>

                {/* Modal de imagen */}
                {selectedOferta && (
                    <ImageModal
                        onClose={() => setSelectedOferta(null)}
                        imageSrc={`https://serviciopagina.upea.bo/Carrera/OfertasAcademicas/${selectedOferta.ofertas_imagen}`}
                        title={selectedOferta.ofertas_titulo}
                    />
                )}
            </main>
        </Preloader>
    );
}
