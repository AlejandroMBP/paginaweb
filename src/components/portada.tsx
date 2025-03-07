import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';

type Portada = {
    portada_id: number;
    portada_imagen: string;
};

interface PortadaSectionProps {
    titulo: string;
    subtitulo: string;
}

export default function PortadaSeccion({
    titulo,
    subtitulo,
}: PortadaSectionProps) {
    const [fondos, setFondos] = useState<Portada[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { scrollY } = useScroll();
    const scaleEffect = useTransform(scrollY, [0, 200, 600], [1, 0.8, 0]);
    const opacityEffect = useTransform(scrollY, [0, 200, 600], [1, 0.5, 0]);
    const borderEffect = useTransform(
        scrollY,
        [0, 200, 600],
        ['0px', '20px', '50px']
    );

    useEffect(() => {
        const fetchPortadas = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/PortadaAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result: Portada[] = await response.json();
                setFondos(result);
            } catch (error) {
                console.error('Error al obtener las portadas:', error);
            }
        };
        fetchPortadas();
    }, []);

    useEffect(() => {
        if (fondos.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % fondos.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [fondos]);

    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{
                    scale: scaleEffect,
                    opacity: opacityEffect,
                    borderRadius: borderEffect,
                }}
            >
                <AnimatePresence>
                    {fondos.length > 0 && (
                        <motion.div
                            key={fondos[currentIndex].portada_id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://serviciopagina.upea.bo/InstitucionUpea/Portada/${fondos[currentIndex].portada_imagen})`,
                            }}
                        />
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            </motion.div>
            <motion.div
                className="relative z-10 text-white text-center p-4"
                style={{ opacity: opacityEffect }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-5xl font-bold drop-shadow-lg"
                >
                    {titulo}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md"
                >
                    {subtitulo}
                </motion.p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-1 bg-white/60 rounded-full mt-4"
                />
            </motion.div>
            <div className="absolute bottom-4 flex space-x-2">
                {fondos.map((_, index) => (
                    <div
                        key={index}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? 'bg-white scale-110'
                                : 'bg-gray-400'
                        }`}
                    ></div>
                ))}
            </div>
        </section>
    );
}
