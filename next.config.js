/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    async rewrites() {
        return [
            {
                source: '/api/tickets/:path*',
                destination: 'http://localhost:4000/api/tickets/:path*',
            },
            {
                source: '/api/payments/:path*',
                destination: 'http://localhost:4000/api/payments/:path*',
            },
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
    env: {
        NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: 'pk_test_d96e04b83fe2aa7577fe6faa723ea76a320eb10b',
    },
}

module.exports = nextConfig
