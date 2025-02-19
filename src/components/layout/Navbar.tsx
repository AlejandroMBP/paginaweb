"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Links = {
    ei_id: number,
    ei_imagen: string,
    ei_nombre: string,
    ei_link: string,
    ei_tipo: string
};

export function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [enlaces, setEnlaces] = useState<Links[]>([]);

    useEffect(() => {
        const fetchEnlaces = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/linksIntExtAll/10'
                );

                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

                const result = await response.json();
                setEnlaces(result);
            } catch (error) {
                console.error('Error al obtener datos', error);
                setEnlaces([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEnlaces();
    }, []);

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/about", label: "Acerca de" },
        { href: "/publicaciones", label: "Publicaciones" },
        { href: "/oferta", label: "Oferta Académica" },
        { href: "/eventos", label: "Eventos" },
        { href: "/gaceta", label: "Gaceta" },
        { href: "/servicios", label: "Servicios" },
        { href: "/convocatoria", label: "Convocatoria" }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 text-primary-foreground p-6 flex justify-between items-center shadow-lg z-50 border-b border-border transition duration-300 ease-in-out transform hover:shadow-xl">
            <Link href="/" className="text-2xl font-bold tracking-wide text-primary">
                <Image src="/image/logo.jpeg" alt="logo" width={100} height={100} />
            </Link>

            <div className="hidden md:flex gap-6 text-primary">
                {navLinks.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`relative transition duration-200 ease-in-out hover:scale-105 ${pathname === item.href ? "text-secondary font-semibold shadow-md" : "hover:text-secondary"}`}
                    >
                        {item.label}
                    </Link>
                ))}

                <div className="relative">
                    <button onClick={() => setSubmenuOpen(!submenuOpen)} className="flex items-center gap-1 hover:text-secondary transition duration-200 ease-in-out">
                        Enlaces
                        <ChevronDown className={`w-4 h-4 transition-transform text-accent ${submenuOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {submenuOpen && (
                        <div className="absolute right-1 mt-2 w-52 bg-white/90 text-primary shadow-lg rounded-xl overflow-hidden border border-border transition-opacity duration-300 ease-in-out opacity-100">
                            {loading ? (
                                <p className="px-4 py-3 text-gray-500">Cargando...</p>
                            ) : enlaces.length > 0 ? (
                                enlaces.map((item) => (
                                    <a
                                        key={item.ei_id}
                                        href={item.ei_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-3 transition duration-200 ease-in-out hover:bg-secondary/20 hover:text-secondary"
                                    >
                                        {item.ei_nombre}
                                    </a>
                                ))
                            ) : (
                                <p className="px-4 py-3 text-gray-500">No hay enlaces disponibles</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-primary bg-secondary">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white/80 backdrop-blur-lg text-primary p-6 flex flex-col gap-6 shadow-lg md:hidden rounded-b-xl border-b border-border transition transform duration-300 ease-in-out slide-down">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition duration-200 ease-in-out hover:scale-105 ${pathname === item.href ? "text-secondary font-semibold shadow-md" : "hover:text-secondary"}`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <button onClick={() => setSubmenuOpen(!submenuOpen)} className="flex items-center gap-1 hover:text-secondary transition duration-200 ease-in-out">
                        Enlaces
                        <ChevronDown className={`w-4 h-4 transition-transform text-accent ${submenuOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>

                    {submenuOpen && (
                        <div className="flex flex-col gap-2 bg-white/50 backdrop-blur-lg p-4 rounded-lg border border-border text-primary transition-opacity duration-300 ease-in-out opacity-100">
                            {loading ? (
                                <p className="px-4 py-3 text-gray-500">Cargando...</p>
                            ) : enlaces.length > 0 ? (
                                enlaces.map((item) => (
                                    <a
                                        key={item.ei_id}
                                        href={item.ei_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-3 transition duration-200 ease-in-out hover:bg-secondary/20 hover:text-secondary"
                                    >
                                        {item.ei_nombre}
                                    </a>
                                ))
                            ) : (
                                <p className="px-4 py-3 text-gray-500">No hay enlaces disponibles</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
