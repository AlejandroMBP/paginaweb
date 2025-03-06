// components/Modal.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Convocatoria = {
    con_titulo: string;
    con_foto_portada: string;
    con_descripcion: string;
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    convocatoria: Convocatoria | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, convocatoria }) => {
    if (!isOpen || !convocatoria) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4 backdrop-blur-md" // 🔹 Agregado efecto de desenfoque
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative flex flex-col md:flex-row gap-6 
               min-h-[70vh] md:min-h-[90vh]" // 🔹 Mantiene altura en escritorio
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cierre circular */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary transition"
                >
                    <span className="text-primary text-2xl font-bold hover:text-white">
                        &times;
                    </span>
                </button>

                {/* Imagen con tamaño responsivo */}
                <div className="w-full md:w-1/2 flex justify-center flex-1">
                    <Image
                        src={`https://serviciopagina.upea.bo/Convocatorias/${convocatoria.con_foto_portada}`}
                        alt="Publicación"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full h-full max-h-[200px] md:max-h-[750px]" // 🔹 Imagen se adapta
                        unoptimized
                    />
                </div>

                {/* Contenido de la convocatoria */}
                <div className="w-full md:w-1/2 flex flex-col flex-1 justify-between">
                    <h3 className="text-xl font-semibold text-primary text-center md:text-left">
                        {convocatoria.con_titulo}
                    </h3>
                    <p
                        className="text-gray-700 text-sm md:text-base overflow-y-auto flex-1 max-h-[100px] md:max-h-[600px]" // 🔹 Ajusta altura y permite scroll si es necesario
                        dangerouslySetInnerHTML={{
                            __html: convocatoria.con_descripcion,
                        }}
                    />{' '}
                    <p
                        className=""
                        dangerouslySetInnerHTML={{
                            __html: convocatoria.con_descripcion,
                        }}
                    />
                    <div className="flex justify-center md:justify-end mt-4">
                        <button
                            onClick={onClose}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
