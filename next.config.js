/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    deviceSizes: [320, 640, 1024, 1280, 1920],
  },
};

module.exports = nextConfig
