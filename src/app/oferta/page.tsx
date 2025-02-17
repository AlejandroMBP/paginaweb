"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function InicioPage() {
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
                        OFERTAS ACADEMICAS
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
                    Lo ultimo de las Ofertas academicas
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((_, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden p-6 transition border border-gray-200 hover:shadow-2xl hover:bg-gray-50"
                        >
                            <Image src="/images/post.jpg" alt="Publicación" width={400} height={200} className="rounded-lg" />
                            <h3 className="mt-4 font-semibold text-lg">Título de la Publicación</h3>
                            <p className="text-sm text-gray-500">Descripción breve de la publicación.</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <br />
        </main>
    );
}
