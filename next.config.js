/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // images: { unoptimized: true },
    // trailingSlash: true,
};

const withPWA = require('next-pwa')({
    dest: 'out',
    // scope: '/out',
    // cacheOnFrontEndNav: true,
    // register: true,
    // mode: 'production'
    // other PWA options...
});

// Combine both configurations
module.exports = withPWA({
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,

})
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



