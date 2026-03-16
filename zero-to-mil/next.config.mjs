
const withPWA = (await import('next-pwa')).default({
    dest: 'public',
    disable: false,
    register: true,
    skipWaiting: true,

    buildExcludes: [/middleware-manifest\.json$/],
    publicExcludes: ['!robots.txt', '!sitemap.xml'],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    turbopack: {
        
    },
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
            },
            {
                protocol: 'https',
                hostname: 'admin.zerotomil.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'zerotomil.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'api.zerotomil.com',
                pathname: '/**',
            }
        ],
    }
};

export default withPWA(nextConfig);
