/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/database"],
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Enable SWC minification
  swcMinify: true,
  // Webpack configuration for optional dependencies
  webpack: (config, { isServer }) => {
    // Ignore optional monitoring packages during build
    // This allows the app to work even if these packages aren't installed
    config.resolve.alias = {
      ...config.resolve.alias,
      "@sentry/nextjs": false,
      "posthog-js": false,
    };
    return config;
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
