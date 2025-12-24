import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable cross-browser compatibility headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Image optimization for different browsers
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'unavatar.io',
        pathname: '/**',
      },
    ],
  },

  // Enable compression for better performance
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Enable strict mode for better error handling
  reactStrictMode: true,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;

