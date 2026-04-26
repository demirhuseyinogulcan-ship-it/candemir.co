import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js Image optimization — otomatik WebP/AVIF dönüşümü
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints — 4K desteği dahil
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Kalite — hero ve detay görselleri için yüksek kalite
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün cache
  },
};

export default nextConfig;
