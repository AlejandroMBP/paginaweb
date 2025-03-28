import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "serviciopagina.upea.bo",
                pathname: "/Publicaciones/**",
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
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
};

export default nextConfig;
