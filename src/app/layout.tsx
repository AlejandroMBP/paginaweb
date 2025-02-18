import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

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

export const metadata: Metadata = {
    title: 'Ciencias de la Educación',
    description:
        'Carrera de Ciencias de la Educación perteneciente a la Universidad Pública de El Alto.',
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
                {children}
                <Footer />
            </body>
        </html>
    );
}
