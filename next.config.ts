import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'serviciopagina.upea.bo',
                pathname: '/Publicaciones/**',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            canvas: false,
        };
        return config;
    },

    devIndicators: {
        buildActivity: false, // Oculta el indicador de construcción
    },
    // Opcional: Deshabilita el overlay de errores en desarrollo también
    onDev: {
        overlay: false,
    },
};

export default nextConfig;
