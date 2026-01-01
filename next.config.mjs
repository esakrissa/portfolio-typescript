/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Optimized for Cloudflare Pages */
  output: 'export',
  trailingSlash: true,
  
  /* Image optimization for static export */
  images: {
    unoptimized: true,
  },

  /* TypeScript strict mode */
  typescript: {
    ignoreBuildErrors: false,
  },

  /* ESLint strict mode */
  eslint: {
    ignoreDuringBuilds: false,
  },

  /* Performance optimizations */
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
