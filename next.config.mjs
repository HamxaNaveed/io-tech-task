import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
      bodySizeLimit: "2mb",
    },
  },
  images: {
    domains: ["localhost:3000", "https://io-tech-task-orcin.vercel.app/ar"],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
