'use client';

import Image from 'next/image';

export function Acreditacion() {
    return (
        <div className="fixed left-0 top-40 -translate-y-1/2 flex items-center z-50">
            <div className="bg-primary text-white text-lg font-semibold flex items-center px-4 py-2 rounded-r-lg shadow-lg">
                {' '}
                {/* Recuadro con texto */}
                <div className="flex flex-col">
                    <span>
                        Carrera Acreditada por <br />
                        Res. CEUB Nº 61/2024
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center h-20 w-20 bg-white rounded-full border-4 border-white -ml-4">
                {' '}
                {/* Juntar el logo al cuadro */}
                <Image
                    src="/image/logo.jpeg" // Ruta de la imagen
                    alt="Logo administracion de empresas"
                    width={70} // Ajusta el tamaño según sea necesario
                    height={70}
                    className="rounded-full" // Hace que la imagen sea circular
                />
            </div>
        </div>
    );
}
