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
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={onClose} // Cerrar al hacer clic en el fondo
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }} // Efecto de entrada
                animate={{ opacity: 1, scale: 1 }} // Efecto de animación
                exit={{ opacity: 0, scale: 0.8 }} // Efecto de salida
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 flex relative" // Añadido "relative" para posicionar el botón de cierre
                onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer clic en el contenido del modal
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-withe flex items-center justify-center hover:bg-primary transition"
                >
                    <span className="text-primary text-xl hover:text-white">
                        &times;
                    </span>{' '}
                    {/* Símbolo de "X" */}
                </button>
                <Image
                    src={`https://serviciopagina.upea.bo/Convocatorias/${convocatoria.con_foto_portada}`}
                    alt="Publicación"
                    width={300}
                    height={200}
                    className="rounded-lg mr-6"
                    unoptimized
                />
                <div className="flex flex-col justify-between">
                    <h3 className="text-xl font-semibold">
                        {convocatoria.con_titulo}
                    </h3>
                    <p
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: convocatoria.con_descripcion,
                        }}
                    />
                    <div className="flex justify-end mt-4">
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
