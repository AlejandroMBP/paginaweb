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
            .then(() => {})
            .catch((err) => {});
    };

    return (
        <footer
            className="bg-cover bg-center text-white py-14 px-6 mt-12 shadow-2xl border-t border-gray-600 transition-all duration-300 hover:shadow-3xl"
            style={{
                backgroundImage: 'url("/image/assets/fondo.jpg")',
                backgroundBlendMode: 'overlay',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Oscurecer con fondo negro
                background:
                    'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(139, 0, 0, 0.7)), url("/image/assets/fondo.jpg")', // Degradado con color rojo oscuro
            }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-6 uppercase text-gray-200 border-b-4 border-indigo-500 pb-3 hover:text-indigo-400 transition-all duration-300 transform hover:scale-105">
                        Contacto
                    </h3>
                    {loading ? (
                        <p className="text-gray-400 animate-pulse">
                            Cargando...
                        </p>
                    ) : contactInfo ? (
                        <ul className="space-y-4 text-gray-300">
                            {contactInfo?.institucion_celular1 && (
                                <li
                                    className="flex items-center gap-3 hover:text-indigo-400 transition-all duration-300 cursor-pointer transform hover:scale-105"
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
                                        className="text-blue-400 hover:text-indigo-400"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contactInfo.institucion_celular1}
                                    </a>
                                </li>
                            )}
                            {contactInfo?.institucion_correo1 && (
                                <li className="flex items-center gap-3 hover:text-indigo-400 transition-all duration-300">
                                    <FaEnvelope className="text-red-400 text-xl" />
                                    <a
                                        href={`mailto:${contactInfo.institucion_correo1}`}
                                        className="hover:text-indigo-400"
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
                    <h3 className="text-2xl font-bold mb-6 uppercase text-gray-200 border-b-4 border-indigo-500 pb-3 hover:text-indigo-400 transition-all duration-300 transform hover:scale-105">
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
                                    className="text-blue-500 hover:text-indigo-400 transition-transform duration-300 text-3xl transform hover:scale-125"
                                >
                                    <FaFacebook />
                                </a>
                            )}
                            {contactInfo.institucion_twitter && (
                                <a
                                    href={contactInfo.institucion_twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-indigo-400 transition-transform duration-300 text-3xl transform hover:scale-125"
                                >
                                    <FaTwitter />
                                </a>
                            )}
                            {contactInfo.institucion_youtube && (
                                <a
                                    href={contactInfo.institucion_youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-indigo-400 transition-transform duration-300 text-3xl transform hover:scale-125"
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
                            width={130}
                            height={80}
                            unoptimized
                            className="hover:scale-110 transition-all duration-300 max-h-20 object-contain"
                        />
                    </a>
                    <a href="https://utic.upea.bo" target="_blank">
                        <Image
                            src="/image/uticAlt.webp"
                            alt="logo"
                            width={120}
                            height={80}
                            unoptimized
                            className="hover:scale-110 transition-all duration-300 max-h-20 object-contain"
                        />
                    </a>
                </div>
            </div>
            <div className="text-center text-gray-400 mt-8 border-t border-gray-600 pt-6 animate-fade-in">
                © {new Date().getFullYear()}
                <a
                    href="https://www.linkedin.com/in/"
                    className="hover:text-white transition-colors duration-300"
                    target="_blank"
                >
                    {' '}
                    Dev(v1) - CVM{' '}
                </a>
                <a
                    href="https://www.linkedin.com/in/marcos-alejandro-berrios-pancata-33a811317/"
                    className="hover:text-white transition-colors duration-300"
                    target="_blank"
                >
                    Dev(v2) - MABP
                </a>
            </div>
        </footer>
    );
}
