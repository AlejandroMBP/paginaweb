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
};

export default nextConfig;
