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

            {/* Contenedor de animación */}
            <div className="relative z-10 p-4 text-white flex flex-col items-center">
                {/* Línea expansiva antes del texto */}


                {/* Contenido animado (sube después de la línea) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className="text-center"
                >
                    <h1 className="font-montserrat text-5xl font-bold drop-shadow-lg">
                        {titulo}
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                        {subtitulo}
                    </p>
                </motion.div>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-1 bg-white/60 rounded-full mb-4"
                />
            </div>
        </section>
    );
}
