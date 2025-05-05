import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Acreditacion } from '@/components/Acreditacion';
import ScrollToTopButton from '@/components/layout/ScrollToTop';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-montserrat',
});

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#260D40',
    // Opcional: configuración para modo oscuro/claro
    // themeColor: [
    //   { media: '(prefers-color-scheme: light)', color: '#260D40' },
    //   { media: '(prefers-color-scheme: dark)', color: '#1a0930' }
    // ]
};
export const metadata: Metadata = {
    title: 'Administración de Empresas',
    description:
        'La carrera de Administración de Empresas forma parte de la Universidad Pública de El Alto.',
    keywords: [
        'Administración de Empresas',
        'UPEA',
        'Universidad Pública de El Alto',
        'Ciencias Empresariales',
        'Carrera de Administración',
    ],
    authors: [
        {
            name: 'v1-Cristhian Villca Mamani v2-Marcos Alejandro Berrios Pancata',
        },
    ],
    openGraph: {
        title: 'Administración de Empresas - UPEA',
        description:
            'Conoce la carrera de Administración de Empresas de la UPEA. Formación profesional de calidad con enfoque en el desarrollo empresarial.',
        url: 'https://admemp.upea.edu.bo/',
        siteName: 'Administración de Empresas - UPEA',
        locale: 'es_BO',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Administración de Empresas - UPEA',
        description:
            'Conoce la carrera de Administración de Empresas de la UPEA. Formación profesional de calidad con enfoque en el desarrollo empresarial.',
        creator: '@UPEA_Oficial',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar />
                <Acreditacion />
                {children}
                <ScrollToTopButton />
                <Footer />
            </body>
        </html>
    );
}
