/** @type {import('next').NextConfig} */

// Permanent Shopify store domain — checkout, accounts, and app-proxy paths
// live here after shopleuco.com points at this app.
const SHOP = 'https://leucotool2000.myshopify.com';

// ─── Domain-cutover legacy redirects ──────────────────────────────────────────
// Every URL from the old Shopify site's sitemap that has no 1:1 page on this
// app (verified by parity crawl on 2026-07-27). Grouped by destination.
// The per-category sharpening landing pages 301 to the main sharpening page
// for cutover; they can be rebuilt later at the same URLs (just remove the
// redirect entry when a real page ships).
const LEGACY_301 = {
  // Old sharpening landing pages + bundle-era pages → native sharpening page
  '/pages/boring-machine-tool-sharpening': '/pages/sharpening-services',
  '/pages/circular-saw-blade-sharpening': '/pages/sharpening-services',
  '/pages/cnc-tool-sharpening': '/pages/sharpening-services',
  '/pages/cutterhead-tool-sharpening': '/pages/sharpening-services',
  '/pages/diamond-tool-sharpening': '/pages/sharpening-services',
  '/pages/dividing-tool-sharpening': '/pages/sharpening-services',
  '/pages/drill-bit-sharpening': '/pages/sharpening-services',
  '/pages/edge-rounding-tool-sharpening': '/pages/sharpening-services',
  '/pages/edge-shaping-tool-sharpening': '/pages/sharpening-services',
  '/pages/edge-trimming-tool-sharpening': '/pages/sharpening-services',
  '/pages/jointing-tool-sharpening': '/pages/sharpening-services',
  '/pages/mdf-cutting-tool-sharpening': '/pages/sharpening-services',
  '/pages/miter-chop-saw-blade-sharpening': '/pages/sharpening-services',
  '/pages/panel-saw-blade-sharpening': '/pages/sharpening-services',
  '/pages/profiling-tool-sharpening': '/pages/sharpening-services',
  '/pages/rip-saw-blade-sharpening': '/pages/sharpening-services',
  '/pages/sizing-tool-sharpening': '/pages/sharpening-services',
  '/pages/sliding-table-saw-blade-sharpening': '/pages/sharpening-services',
  '/pages/spiral-tool-sharpening': '/pages/sharpening-services',
  '/pages/table-saw-blade-sharpening': '/pages/sharpening-services',
  '/pages/sample-bundle': '/pages/sharpening-services',
  '/collections/mdf-cutting-tool-sharpening': '/pages/sharpening-services',
  '/collections/sharpening-services': '/pages/sharpening-services',
  '/collections/fees-products': '/pages/sharpening-services',

  // Misc pages
  '/pages/highline-xp': '/collections/highlinexp-industrial-series',
  '/pages/highline-xp-overview': '/collections/highlinexp-industrial-series',
  '/pages/search-results': '/search',
  '/pages/dnr-resources': '/pages/tools',
  '/pages/diamond-tooling-solutions': '/pages/custom-tooling',
  '/pages/mass-timber-solid-wood-tooling': '/pages/custom-tooling',
  '/pages/u-cut-circular-blade-bundles': '/collections/circular-saw-blades',

  // Saw / panel-saw machine collections → circular saw blades
  '/collections/saw-blades': '/collections/circular-saw-blades',
  '/collections/table-saws': '/collections/circular-saw-blades',
  '/collections/table-and-sizing-saws': '/collections/circular-saw-blades',
  '/collections/rip-saws': '/collections/circular-saw-blades',
  '/collections/miter-saws': '/collections/circular-saw-blades',
  '/collections/miter-chop-saws': '/collections/circular-saw-blades',
  '/collections/panel-saws': '/collections/circular-saw-blades',
  '/collections/sliding-table-saws': '/collections/circular-saw-blades',
  '/collections/portable-saws': '/collections/circular-saw-blades',
  '/collections/sawing-machines': '/collections/circular-saw-blades',
  '/collections/holzma-hkl-300': '/collections/circular-saw-blades',
  '/collections/holzma-hpl-300': '/collections/circular-saw-blades',
  '/collections/holzma-hpp-230': '/collections/circular-saw-blades',
  '/collections/holzma-hpp-250': '/collections/circular-saw-blades',
  '/collections/holzma-hpp-300': '/collections/circular-saw-blades',
  '/collections/holzma-hpp-400': '/collections/circular-saw-blades',
  '/collections/holzma-hqp-11': '/collections/circular-saw-blades',
  '/collections/homag-hkl-400': '/collections/circular-saw-blades',
  '/collections/homag-hpl-400': '/collections/circular-saw-blades',
  '/collections/homag-sawteq-b-300': '/collections/circular-saw-blades',
  '/collections/homag-sawteq-b-400': '/collections/circular-saw-blades',

  // CNC / boring / spiral collections → spiral tools
  '/collections/cnc-machines': '/collections/spiral-tools',
  '/collections/cnc-machining-centers': '/collections/spiral-tools',
  '/collections/cnc-point-to-point-machines': '/collections/spiral-tools',
  '/collections/cnc-routers': '/collections/spiral-tools',
  '/collections/boring-machines': '/collections/spiral-tools',
  '/collections/boring-tools': '/collections/spiral-tools',
  '/collections/stationary-boring-machines': '/collections/spiral-tools',
  '/collections/through-feed-boring-machines': '/collections/spiral-tools',
  '/collections/through-feed-machines': '/collections/spiral-tools',
  '/collections/hardware-hinge-boring-machines': '/collections/spiral-tools',
  '/collections/metal-working-end-mills': '/collections/spiral-tools',
  '/collections/hp': '/collections/spiral-tools',
  '/collections/hp-plus-spirals': '/collections/spiral-tools',
  '/collections/iwf-spiral-special': '/collections/spiral-tools',
  '/collections/shank-type-cutters': '/collections/spiral-tools',

  // Diamond / cutter head systems → cutter heads
  '/collections/diamond-tools': '/collections/cutter-heads',
  '/collections/dividing-tools': '/collections/cutter-heads',
  '/collections/p-system': '/collections/cutter-heads',
  '/collections/nn-system': '/collections/cutter-heads',
  '/collections/tenoners': '/collections/cutter-heads',

  // Clamping
  '/collections/precision-collet-chucks': '/collections/clamping-systems',
  '/collections/shrinkfit-heatsync-system': '/collections/clamping-systems',

  // Catch-alls / promos / hubs
  '/collections/all': '/pages/tools',
  '/collections/wood': '/pages/tools',
  '/collections/edgebanders': '/pages/tools',
  '/collections/featured-products': '/pages/tools',
  '/collections/overstock-sale': '/pages/tools',
  '/collections/product-of-the-month-2025-september': '/pages/tools',
  '/collections/product-of-the-month-october': '/pages/tools',
  '/collections/product-of-the-month-special-august-2025': '/pages/tools',
  '/collections/frontpage': '/',
  '/collections/get-quote': '/pages/contact-leuco',
  '/collections': '/pages/tools',
  '/products': '/pages/tools',

  // Old blog indexes → Knowledge hub equivalents (article slugs under
  // tooling-innovations/tooling-solutions/materials-solutions still resolve
  // via this app's [slug] routes, so only the bare indexes redirect).
  '/blogs/tooling-innovations': '/blogs/leuco-solutions/leuco-tooling-innovations',
  '/blogs/tooling-solutions': '/blogs/leuco-solutions/leuco-tooling-solutions',
  '/blogs/materials-solutions': '/blogs/leuco-solutions/leuco-materials-solutions',
  '/blogs/testing': '/blogs/leuco-solutions',
};

// Temporary (307) redirects — may flip to real pages later, so don't let
// browsers/Google cache them permanently:
// - leuco-news is gated behind FLAGS.ENABLE_NEWS; remove these when News launches
const LEGACY_TEMP = {
  '/blogs/leuco-news': '/blogs/leuco-solutions',
  '/blogs/leuco-news/:slug*': '/blogs/leuco-solutions',
  '/blogs/solution-extras': '/blogs/leuco-solutions',
  '/blogs/solution-extras/:slug*': '/blogs/leuco-solutions',
  '/cart': '/', // cart is a drawer on this site
};

// Shopify-only paths that must keep working after the domain points here.
// Temporary redirects: the account experience may move to Shopify's new
// customer accounts URL later.
const SHOPIFY_PASSTHROUGH = [
  { source: '/apps/:path*', destination: '/pages/sharpening-services', permanent: true }, // Bundle Builder app proxy
  { source: '/account/:path*', destination: `${SHOP}/account/:path*`, permanent: false },
  { source: '/checkouts/:path*', destination: `${SHOP}/checkouts/:path*`, permanent: false },
  { source: '/cart/c/:path*', destination: `${SHOP}/cart/c/:path*`, permanent: false }, // cart permalinks
  { source: '/policies/:path*', destination: `${SHOP}/policies/:path*`, permanent: false },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'shopleuco.com' },
    ],
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_301).map(([source, destination]) => ({
        source, destination, permanent: true,
      })),
      ...Object.entries(LEGACY_TEMP).map(([source, destination]) => ({
        source, destination, permanent: false,
      })),
      ...SHOPIFY_PASSTHROUGH,
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
      {
        source: '/applications/tooling-innovations',
        destination: '/blogs/leuco-solutions/leuco-tooling-innovations',
        permanent: true,
      },
      {
        source: '/applications/material-solutions',
        destination: '/blogs/leuco-solutions/leuco-materials-solutions',
        permanent: true,
      },
      {
        source: '/applications',
        destination: '/blogs/leuco-solutions',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
