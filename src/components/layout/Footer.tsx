'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaPhone,
    FaEnvelope,
} from 'react-icons/fa';

type ContactInfo = {
    institucion_celular1?: string;
    institucion_celular2?: string;
    institucion_telefono1?: string | null;
    institucion_telefono2?: string | null;
    institucion_correo1: string;
    institucion_correo2: string;
    institucion_facebook: string;
    institucion_youtube: string;
    institucion_twitter: string;
};

export function Footer() {
    const [loading, setLoading] = useState(true);
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await fetch(
                    'https://serviciopagina.upea.bo/api/InstitucionUPEA/10'
                );
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                const result = await response.json();
                let data = result?.Descripcion || null;

                // Filtrar duplicados y mostrar solo el último
                if (data) {
                    if (
                        data.institucion_celular1 === data.institucion_celular2
                    ) {
                        data.institucion_celular1 = data.institucion_celular2;
                    }
                    if (data.institucion_correo1 === data.institucion_correo2) {
                        data.institucion_correo1 = data.institucion_correo2;
                    }
                }

                setContactInfo(data);
            } catch (error) {
                console.error('Error al obtener datos', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactos();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log('Texto copiado al portapapeles');
            })
            .catch((err) => {
                console.error('Error al copiar al portapapeles', err);
            });
    };

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6 mt-8 shadow-lg border-t border-gray-700 transition-all duration-500 ease-in-out hover:shadow-2xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 uppercase text-gray-100 border-b border-gray-700 pb-2 hover:text-secondary transition-transform duration-300 ease-in-out transform hover:scale-105">
                        Contacto
                    </h3>
                    {loading ? (
                        <p className="text-gray-400 animate-pulse">
                            Cargando...
                        </p>
                    ) : contactInfo ? (
                        <ul className="space-y-3 text-gray-300">
                            {contactInfo?.institucion_celular1 && (
                                <li
                                    className="flex items-center gap-3 hover:text-secondary transition-transform duration-300 cursor-pointer transform hover:scale-105"
                                    onClick={() =>
                                        copyToClipboard(
                                            contactInfo.institucion_celular1?.toString() ||
                                                ''
                                        )
                                    }
                                >
                                    <FaPhone className="text-blue-400 text-xl" />
                                    <a
                                        href={`https://wa.me/${contactInfo.institucion_celular1}`}
                                        className="text-blue-400 hover:text-secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contactInfo.institucion_celular1}
                                    </a>
                                </li>
                            )}
                            {contactInfo?.institucion_correo1 && (
                                <li className="flex items-center gap-3">
                                    <FaEnvelope className="text-red-400 text-xl" />
                                    <a
                                        href={`mailto:${contactInfo.institucion_correo1}`}
                                        className="hover:text-secondary"
                                    >
                                        {contactInfo.institucion_correo1}
                                    </a>
                                </li>
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-400">
                            No hay información disponible.
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 uppercase text-gray-100 border-b border-gray-700 pb-2 hover:text-secondary transition-transform duration-300 ease-in-out transform hover:scale-105">
                        Síguenos
                    </h3>
                    {loading ? (
                        <p className="text-gray-400 animate-pulse">
                            Cargando...
                        </p>
                    ) : contactInfo ? (
                        <div className="flex space-x-6">
                            {contactInfo.institucion_facebook && (
                                <a
                                    href={contactInfo.institucion_facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-secondary transition-transform duration-300 text-3xl transform hover:scale-110"
                                >
                                    <FaFacebook />
                                </a>
                            )}
                            {contactInfo.institucion_twitter && (
                                <a
                                    href={contactInfo.institucion_twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-secondary transition-transform duration-300 text-3xl transform hover:scale-110"
                                >
                                    <FaTwitter />
                                </a>
                            )}
                            {contactInfo.institucion_youtube && (
                                <a
                                    href={contactInfo.institucion_youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-secondary transition-transform duration-300 text-3xl transform hover:scale-110"
                                >
                                    <FaYoutube />
                                </a>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-400">
                            No hay información disponible.
                        </p>
                    )}
                </div>
                <div className="flex justify-center md:justify-start items-center space-x-6">
                    <a href="/">
                        <Image
                            src="/image/logo.jpeg"
                            alt="logo"
                            width={130} // Ajustado para mejor proporción
                            height={80}
                            unoptimized
                            className="hover:scale-110 transition-transform duration-300 max-h-20 object-contain"
                        />
                    </a>
                    <a href="https://utic.upea.bo" target="_blank">
                        <Image
                            src="/image/uticAlt.webp"
                            alt="logo"
                            width={120} // Ajustado para mejor proporción
                            height={80}
                            unoptimized
                            className="hover:scale-110 transition-transform duration-300 max-h-20 object-contain"
                        />
                    </a>
                </div>
            </div>
            <div className="text-center text-gray-400 mt-8 border-t border-gray-700 pt-4 animate-fade-in">
                © {new Date().getFullYear()}
                <a
                    href="https://www.linkedin.com/in/marcos-alejandro-berrios-pancata-33a811317/"
                    className="hover:text-white transition-colors duration-300"
                    target="_blank"
                >
                    Dev - MABP
                </a>
                . U-tic Todos los derechos reservados.
            </div>
        </footer>
    );
}
