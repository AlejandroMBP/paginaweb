import { motion } from 'framer-motion';

type ModalProps = {
    onClose: () => void;
    imageSrc: string;
    title: string;
    children?: React.ReactNode;
};

export default function Modal({
    onClose,
    imageSrc,
    title,
    children,
}: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            {/* Contenedor del Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full relative"
            >
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
                >
                    ✖
                </button>

                {/* Imagen */}
                <img src={imageSrc} alt={title} className="rounded-lg w-full" />

                {/* Título */}
                <h2 className="text-2xl font-bold text-primary mt-4">
                    {title}
                </h2>

                {/* Contenido extra */}
                <div className="mt-4">{children}</div>
            </motion.div>
        </div>
    );
}
