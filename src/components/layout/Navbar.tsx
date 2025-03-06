'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

type Links = {
    ei_id: number;
    ei_imagen: string;
    ei_nombre: string;
    ei_link: string;
    ei_tipo: string;
};

export function Navbar() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [enlaces, setEnlaces] = useState<Links[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchEnlaces = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/linksIntExtAll/10'
                );

                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);

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
        { href: '/', label: 'Inicio' },
        { href: '/about', label: 'Acerca de' },
        { href: '/publicaciones', label: 'Publicaciones' },
        { href: '/oferta', label: 'Admisión' },
        { href: '/eventos', label: 'Eventos' },
        { href: '/gaceta', label: 'Gaceta' },
        { href: '/convocatoria', label: 'Convocatoria' },
        { href: '/enlaces', label: 'Enlaces' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 text-secondary-foreground p-4 md:p-6 shadow-lg z-50 border-b border-border transition duration-200 ease-in-out hover:shadow-xl px-8 md:px-16">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/image/logo.jpeg"
                        alt="logo"
                        width={80}
                        height={80}
                        className="rounded-lg"
                    />
                </Link>

                {/* Menú para pantallas grandes */}
                <div className="hidden md:flex gap-8 text-lg text-secondary">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative transition-all duration-200 ease-in-out hover:scale-105 
                                ${
                                    pathname === item.href
                                        ? 'text-primary font-semibold'
                                        : 'hover:text-primary'
                                }
                                after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full
                            `}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Botón menú hamburguesa */}
                <button
                    className="md:hidden p-2 rounded-md text-secondary hover:text-primary focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Menú móvil */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <button
                    className="absolute top-5 right-5 p-2 text-secondary hover:text-primary"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={32} />
                </button>
                <div className="flex flex-col gap-6 text-xl text-secondary">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-2xl font-medium transition-all duration-200 ease-in-out hover:scale-110 
                                ${
                                    pathname === item.href
                                        ? 'text-primary font-bold'
                                        : 'hover:text-primary'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
