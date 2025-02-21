'use client';

import Image from 'next/image';

export function Acreditacion() {
    return (
        <a
            href="https://ceub.edu.bo/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed left-0 top-40 -translate-y-1/2 flex items-center z-50 group hover:scale-105 transition-transform duration-300"
        >
            {/* Recuadro con texto */}
            <div className="bg-primary text-white text-xs font-semibold flex items-center px-2.5 py-1 rounded-r-lg shadow-md">
                <div className="flex flex-col">
                    <span>
                        Carrera Acreditada por <br />
                        Res. CEUB Nº 61/2024
                    </span>
                </div>
            </div>

            {/* Contenedor del logo con animación */}
            <div className="flex items-center justify-center h-[18px] w-[18px] md:h-[76px] md:w-[76px] bg-white rounded-full border-2 border-white -ml-3 transition-transform duration-300 group-hover:scale-110">
                <Image
                    src="/image/logo.jpeg"
                    alt="Logo administración de empresas"
                    width={95} // Reducción del 5%
                    height={95}
                    className="rounded-full"
                />
            </div>
        </a>
    );
}
