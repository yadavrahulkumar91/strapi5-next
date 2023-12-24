/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true }

}

module.exports = nextConfig

// module.exports = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'gamechanger-f5da7.web.app',
//                 port: '',
//                 pathname: '/uploads/**',
//             },
//         ],
//     },
// }

