"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
type Gaceta = {
    gaceta_id: number,
    gaceta_titulo: string,
    gaceta_fecha: string,
    gaceta_tipo: string,
    gaceta_documento: string
}
export default function InicioPage() {
    const [loading, setLoading] = useState(true);
    const [gacetas, setGaceta] = useState<Gaceta[]>([]);

    useEffect(() => {
        const fetchGaceta = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/gacetaunivAll/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                console.log('Respuesta de la filosofia:', result); //eliminar al terminar el desarrollo

                setGaceta(result);
            } catch (error) {
                setGaceta([]);
            } finally {
                setLoading(false);
            }
        };
        fetchGaceta();
    }, []);

    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">

            {/* Sección 1: Título */}
            <section
                className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                {/* Superposición semi-transparente */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>

                {/* Contenido */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-4 text-white"
                >
                    <h2 className="text-5xl font-bold drop-shadow-lg">
                        GACETA
                    </h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                        Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>

            {/* Separador decorativo */}
            <div className="w-full h-1 bg-secondary rounded-full"></div>

            {/* Sección 2: Últimas Publicaciones */}
            <section className="relative max-w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-semibold text-primary text-center mb-6 relative"
                >
                    Lo ultimo de las publcaciones de la gaceta
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {loading ? (<p className="text-center col-span-3">Cargando gaceta...</p>) : gacetas.length > 0 ? (gacetas.map((gaceta) => (

                        <motion.div
                            key={gaceta.gaceta_id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50"
                        >
                            <Image
                                src={`https://serviciopagina.upea.bo/Gaceta/${gaceta.gaceta_documento}`}
                                alt="Publicación"
                                width={400}
                                height={200}
                                className="rounded-lg"
                                unoptimized
                                onClick={() => window.open(`https://serviciopagina.upea.bo/Gaceta/${gaceta.gaceta_documento}`, '_blank')}
                            />
                            <h3 className="mt-4 font-semibold text-lg">{gaceta.gaceta_titulo}</h3>
                            <p className="text-sm text-gray-500">{gaceta.gaceta_tipo}</p>
                            <p className="text-sm text-gray-500">{gaceta.gaceta_fecha}</p>
                        </motion.div>
                    ))
                    ) : (
                        <p className="text-center col-span-3">No hay gaceta no disponible disponibles.</p>
                    )}
                </div>
            </section>
            <br />
        </main>
    );
}
