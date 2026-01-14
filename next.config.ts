import type { NextConfig } from 'next';

const serverUrl = process.env.SERVER_API_URL || 'http://localhost:3000';

if (!process.env.SERVER_API_URL) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'warn  - SERVER_API_URL is not defined in .env or .env.local. Defaulting to http://localhost:3000',
  );
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${serverUrl}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
