/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['pdf-lib'], // Just in case, though pdf-lib is usually fine
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    async rewrites() {
        return [
            {
                source: '/api/bookings/:path*',
                destination: 'http://localhost:4000/api/bookings/:path*',
            },
            {
                source: '/api/popups/:path*',
                destination: 'http://localhost:4000/api/popups/:path*',
            },
            {
                source: '/api/speakers/:path*',
                destination: 'http://localhost:4000/api/speakers/:path*',
            },
        ];
    },
}

module.exports = nextConfig
