'use client';
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
                setContactInfo(result?.Descripcion || null);
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
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6 mt-8 shadow-lg border-t border-gray-700">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 uppercase text-gray-100 border-b border-gray-700 pb-2 hover:text-secondary transition">
                        Contacto
                    </h3>
                    {loading ? (
                        <p className="text-gray-400">Cargando...</p>
                    ) : contactInfo ? (
                        <ul className="space-y-3 text-gray-300">
                            {contactInfo?.institucion_celular1 && (
                                <li
                                    className="flex items-center gap-3 hover:text-secondary transition cursor-pointer"
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
                            {contactInfo?.institucion_celular2 && (
                                <li
                                    className="flex items-center gap-3 hover:text-secondary transition cursor-pointer"
                                    onClick={() =>
                                        copyToClipboard(
                                            contactInfo.institucion_celular2?.toString() ||
                                                ''
                                        )
                                    }
                                >
                                    <FaPhone className="text-blue-400 text-xl" />
                                    <a
                                        href={`https://wa.me/${contactInfo.institucion_celular2}`}
                                        className="text-blue-400 hover:text-secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contactInfo.institucion_celular2}
                                    </a>
                                </li>
                            )}

                            {contactInfo.institucion_correo1 && (
                                <li className="flex items-center gap-3 hover:text-secondary transition cursor-pointer">
                                    <FaEnvelope className="text-yellow-400 text-xl" />
                                    <a
                                        href={`mailto:${contactInfo.institucion_correo1}`}
                                        className="text-yellow-400 hover:text-secondary"
                                    >
                                        {contactInfo.institucion_correo1}
                                    </a>
                                </li>
                            )}
                            {contactInfo.institucion_correo2 && (
                                <li className="flex items-center gap-3 hover:text-secondary transition cursor-pointer">
                                    <FaEnvelope className="text-yellow-400 text-xl" />
                                    <a
                                        href={`mailto:${contactInfo.institucion_correo2}`}
                                        className="text-yellow-400 hover:text-secondary"
                                    >
                                        {contactInfo.institucion_correo2}
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
                    <h3 className="text-xl font-bold mb-4 uppercase text-gray-100 border-b border-gray-700 pb-2 hover:text-secondary transition">
                        Síguenos
                    </h3>
                    {loading ? (
                        <p className="text-gray-400">Cargando...</p>
                    ) : contactInfo ? (
                        <div className="flex space-x-6">
                            {contactInfo.institucion_facebook && (
                                <a
                                    href={contactInfo.institucion_facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-secondary transition duration-300 text-3xl"
                                >
                                    <FaFacebook />
                                </a>
                            )}
                            {contactInfo.institucion_twitter && (
                                <a
                                    href={contactInfo.institucion_twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-secondary transition duration-300 text-3xl"
                                >
                                    <FaTwitter />
                                </a>
                            )}
                            {contactInfo.institucion_youtube && (
                                <a
                                    href={contactInfo.institucion_youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-secondary transition duration-300 text-3xl"
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

                <div className="text-center md:text-right">
                    <p className="text-gray-400 font-semibold text-sm hover:text-secondary transition">
                        © {new Date().getFullYear()}{' '}
                        <a
                            href="#"
                            className="text-gray-300 hover:text-secondary font-bold transition"
                        >
                            Dev - MABP
                        </a>
                        . <br />
                        U-tic Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
