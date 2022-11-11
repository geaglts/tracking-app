const withPwa = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

const withPwaConfig = withPwa({
    dest: 'public',
    include: ['production'],
    register: true,
});

module.exports = withPwaConfig(nextConfig);
