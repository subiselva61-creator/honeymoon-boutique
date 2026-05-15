import type { NextConfig } from 'next'

const remotePatterns: NonNullable<NonNullable<NextConfig['images']>['remotePatterns']> = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3002',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'utfs.io',
    pathname: '/**',
  },
]

try {
  const base = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (base) {
    const u = new URL(base)
    remotePatterns.push({
      protocol: u.protocol.replace(':', '') as 'http' | 'https',
      hostname: u.hostname,
      pathname: '/**',
    })
  }
} catch {
  // ignore invalid NEXT_PUBLIC_PAYLOAD_URL at build time
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
}

export default nextConfig
