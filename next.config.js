/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gamechanger-f5da7.web.app',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
}

