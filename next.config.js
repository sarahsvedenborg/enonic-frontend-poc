/** @type {import('next').NextConfig} */
const path = require('path');

function getEnonicWebpackConfig(config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        // client-side resolution for node modules
        fs: false
    }
    config.resolve.alias = {
        ...config.resolve.alias,
        "@phrases": path.resolve(__dirname, "./src/phrases"),
    }
    return config;
}

async function getEnonicHeaders() {
    return [
        {
            // Apply these headers to all routes in your application.
            source: '/:path*',
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: `script-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src-elem 'self' 'unsafe-inline' 'https://eu-assets.i.posthog.com' 'https://cp-assets.i.posthog.com' 'https://static.posthog.com' 'https://eu.i.posthog.com';`
                }
            ],
        },
    ]
}

const config = {
    reactStrictMode: true,
    trailingSlash: false,
    transpilePackages: ['@enonic/nextjs-adapter'],
    webpack: getEnonicWebpackConfig,
    headers: getEnonicHeaders,
};

module.exports = config;
