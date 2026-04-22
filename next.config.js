/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'shopleuco.com' },
    ],
  },
  async redirects() {
    return [
      // ─── Product duplicate "-copy" slugs ────────────────────────────────
      // These were Shopify duplicate artifacts that ended up indexed by Google.
      // Each redirects to the canonical product (without "-copy").
      {
        source: '/products/solid-tungsten-carbide-2-flute-70mm-mosquito-dowel-bit-copy',
        destination: '/products/solid-tungsten-carbide-2-flute-70mm-mosquito-dowel-bit',
        permanent: true,
      },
      {
        source: '/products/solid-tungsten-carbide-2-flute-70mm-mosquito-through-hole-bit-copy',
        destination: '/products/solid-tungsten-carbide-2-flute-70mm-mosquito-through-hole-bit',
        permanent: true,
      },
      {
        source: '/products/solid-tungsten-carbide-2-flute-8x10x35x70mm-mosquito-dowel-bit-copy',
        destination: '/products/solid-tungsten-carbide-2-flute-8x10x35x70mm-mosquito-dowel-bit',
        permanent: true,
      },
      {
        source: '/products/highlinexp-carbide-sawblade-for-fine-finish-rips-crosscuts-copy',
        destination: '/products/10-highlinexp-carbide-sawblade-for-fine-finish-rips-crosscuts',
        permanent: true,
      },
      {
        source: '/products/highlinexp-carbide-sawblade-for-combination-rips-crosscuts-copy',
        destination: '/products/10-highlinexp-carbide-sawblade-for-fine-finish-rips-crosscuts',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
