import { motion } from 'framer-motion';

interface PortadaSectionProps {
    titulo: string;
    subtitulo: string;
    backgroundImage: string;
}

export default function PortadaSeccion({ titulo, subtitulo, backgroundImage }: PortadaSectionProps) {
    return (
        <section
            className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
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
                    {titulo}
                </h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                    {subtitulo}
                </p>
            </motion.div>
        </section>
    );
}
