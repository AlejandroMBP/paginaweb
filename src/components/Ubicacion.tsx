import { motion } from 'framer-motion';

interface UbicacionSectionProps {
    mapsUbicacion: string | null;
    direccion: string;
    loading: boolean;
}

export default function UbicacionSection({
    mapsUbicacion,
    direccion,
    loading,
}: UbicacionSectionProps) {
    return (
        <section className="w-full">
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
                <span className="relative z-10">UBICACIÓN</span>
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
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20 blur-lg opacity-50"></div>
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-28 h-1 bg-primary rounded-full"></span>
                <motion.span
                    initial={{ width: '3rem' }}
                    whileHover={{ width: '7rem' }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-1 bg-secondary rounded-full"
                ></motion.span>
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full h-96 overflow-hidden rounded-lg shadow-lg border border-gray-200"
            >
                {loading || !mapsUbicacion ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center text-gray-500 text-lg font-semibold mt-6"
                    >
                        Cargando mapa...
                    </motion.p>
                ) : (
                    <iframe
                        src={mapsUbicacion}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                )}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center text-primary mt-2"
            >
                <strong>{loading ? 'Cargando...' : direccion}</strong>
            </motion.div>
        </section>
    );
}
