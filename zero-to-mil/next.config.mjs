/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ba5.zerotomil.com',
                pathname: '/**',
            }, {
                protocol: 'https',
                hostname: 'www.zerotomil.com',
                pathname: '/**',
            }
        ],
    }
};

export default nextConfig;