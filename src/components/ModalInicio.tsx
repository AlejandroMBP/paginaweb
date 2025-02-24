import { motion } from 'framer-motion';

type ImageModalProps = {
    onClose: () => void;
    imageSrc: string;
    title: string;
    children?: React.ReactNode;
};

export default function ImageModal({
    onClose,
    imageSrc,
    title,
}: ImageModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={onClose} // 🔹 Cierra el modal al hacer clic fuera de él
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full relative"
                onClick={(e) => e.stopPropagation()} // 🔹 Evita que el modal se cierre al hacer clic dentro
            >
                {/* Botón de cerrar circular */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary transition"
                >
                    <span className="text-primary text-2xl font-bold hover:text-white">
                        &times;
                    </span>
                </button>

                {/* Imagen */}
                <img
                    src={imageSrc}
                    alt={title}
                    className="rounded-lg max-w-full max-h-[80vh] object-contain mx-auto"
                />

                {/* Título */}
                <h2 className="text-2xl font-bold text-primary mt-4 text-center">
                    {title}
                </h2>
            </motion.div>
        </div>
    );
}
