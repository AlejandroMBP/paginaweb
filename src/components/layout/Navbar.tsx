"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white text-primary-foreground p-6 flex justify-between items-center shadow-lg z-50 border-b border-border">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-wide text-primary">
                <Image
                    src="/image/logo.jpeg"
                    alt="logo administracion de empreas"
                    width={100}
                    height={100}
                />
            </Link>

            {/* Menú Desktop */}
            <div className="hidden md:flex gap-6 text-primary">
                {[
                    { href: "/", label: "Inicio" },
                    { href: "/about", label: "Acerca de" },
                    { href: "/publicaciones", label: "Publicaciones" },
                    { href: "/oferta", label: "Oferta Académica" },
                    { href: "/eventos", label: "Eventos" },
                    { href: "/gaceta", label: "Gaceta" },
                    { href: "/servicios", label: "Servicios" },
                    { href: "/convocatoria", label: "Convocatoria" }
                ].map((item) => (
                    <Link key={item.href} href={item.href} className="relative hover:text-secondary transition">
                        {item.label}
                    </Link>
                ))}

                {/* Submenú */}
                <div className="relative">
                    <button
                        onClick={() => setSubmenuOpen(!submenuOpen)}
                        className="flex items-center gap-1 hover:text-secondary transition"
                    >
                        Enlaces <ChevronDown className="w-4 h-4 transition-transform text-accent" style={{ transform: submenuOpen ? "rotate(180deg)" : "rotate(0)" }} />
                    </button>
                    {submenuOpen && (
                        <div className="absolute right-1 mt-2 w-52 bg-white text-primary shadow-lg rounded-xl overflow-hidden border border-border">
                            {[
                                { href: "/bibliotecas", label: "Bibliotecas" },
                                { href: "/inscripcion", label: "Inscripción" },
                                { href: "/matriculacion", label: "Matriculación" }
                            ].map((item) => (
                                <Link key={item.href} href={item.href} className="block px-4 py-3 transition hover:bg-secondary/20 hover:text-secondary">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Menú Mobile */}
            <Button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-primary bg-secondary">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white/50 backdrop-blur-lg text-primary p-6 flex flex-col gap-4 shadow-lg md:hidden rounded-b-xl border-b border-border">
                    {[
                        { href: "/", label: "Inicio" },
                        { href: "/about", label: "Acerca de" },
                        { href: "/publicaciones", label: "Publicaciones" },
                        { href: "/oferta", label: "Oferta Académica" },
                        { href: "/eventos", label: "Eventos" },
                        { href: "/gaceta", label: "Gaceta" },
                        { href: "/servicios", label: "Servicios" },
                        { href: "/convocatoria", label: "Convocatoria" }
                    ].map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-secondary transition">
                            {item.label}
                        </Link>
                    ))}

                    {/* Submenú Mobile */}
                    <button onClick={() => setSubmenuOpen(!submenuOpen)} className="flex items-center gap-1 hover:text-secondary transition">
                        Enlaces <ChevronDown className="w-4 h-4 transition-transform text-accent" style={{ transform: submenuOpen ? "rotate(180deg)" : "rotate(0)" }} />
                    </button>

                    {submenuOpen && (
                        <div className="flex flex-col gap-2 bg-withe p-4 rounded-lg border border-border text-primary">
                            {[
                                { href: "/bibliotecas", label: "Bibliotecas" },
                                { href: "/inscripcion", label: "Inscripción" },
                                { href: "/matriculacion", label: "Matriculación" }
                            ].map((item) => (
                                <Link key={item.href} href={item.href} className="block px-4 py-3 transition hover:bg-secondary/20 hover:text-secondary">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
