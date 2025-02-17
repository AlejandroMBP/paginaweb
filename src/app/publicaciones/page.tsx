"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const publicaciones = {
    institutos: [
        { title: "Instituto de Investigación", description: "Descripción del Instituto", imgSrc: "/images/post1.jpg" },
        { title: "Nuevo Proyecto de Investigación", description: "Detalles sobre el proyecto", imgSrc: "/images/post2.jpg" },
    ],
    kardex: [
        { title: "Kardex Académico", description: "Información sobre el kardex", imgSrc: "/images/post3.jpg" },
    ],
    centroEstudiantes: [
        { title: "Centro de Estudiantes", description: "Eventos y noticias del centro", imgSrc: "/images/post4.jpg" },
    ],
    postgrado: [
        { title: "Programas de Postgrado", description: "Oportunidades para estudiar un postgrado", imgSrc: "/images/post5.jpg" },
    ],
    noticias: [
        { title: "Noticias Recientes", description: "Últimas noticias de la institución", imgSrc: "/images/post6.jpg" },
    ],
    investigacion: [
        { title: "Investigación en curso", description: "Proyectos de investigación actuales", imgSrc: "/images/post7.jpg" },
    ],
};

export default function InicioPage() {
    const [selectedCategory, setSelectedCategory] = useState("institutos");

    return (
        <main className="flex flex-col items-center min-h-screen gap-16 px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] bg-gray-100">

            {/* Sección 1: Título */}
            <section
                className="relative w-full text-center h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/image/fondo.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 p-4 text-white"
                >
                    <h1 className="text-5xl font-bold drop-shadow-lg">
                        Publicaciones
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
                        Formación académica con enfoque en liderazgo, emprendimiento y gestión organizacional.
                    </p>
                </motion.div>
            </section>

            {/* Menú de navegación */}
            <nav className="flex justify-center space-x-8 mb-12 flex-wrap">
                {["institutos", "kardex", "centroEstudiantes", "postgrado", "noticias", "investigacion"].map((category) => (
                    <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-lg font-semibold px-6 py-3 rounded-full transition-all duration-300 transform ${selectedCategory === category
                            ? "bg-primary text-white"
                            : "text-primary hover:bg-primary hover:text-white"
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, " $1")}
                    </motion.button>
                ))}
            </nav>

            {/* Separador decorativo */}
            <div className="w-full h-1 bg-primary rounded-full mb-6"></div>

            {/* Sección 2: Publicaciones */}
            <section className="relative max-w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-semibold text-primary text-center mb-6 relative"
                >
                    Publicaciones
                    <span className="block w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {publicaciones[selectedCategory].map((post, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-xl rounded-3xl overflow-hidden p-6 transition-all border border-gray-200 hover:shadow-2xl hover:bg-gray-50"
                        >
                            <Image
                                src={post.imgSrc}
                                alt={post.title}
                                width={400}
                                height={250}
                                className="rounded-lg"
                            />
                            <h3 className="mt-4 text-xl font-semibold text-primary">{post.title}</h3>
                            <p className="text-sm text-gray-500">{post.description}</p>
                        </motion.div>
                    ))}
                </div>
                <br />
            </section>
        </main>
    );
}
