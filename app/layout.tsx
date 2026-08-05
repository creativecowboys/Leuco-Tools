import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'LEUCO Tool Corporation | Precision Tooling',
    template: '%s | LEUCO Tool Corporation',
  },
  description: "North America's highest quality precision tooling and re-sharpening service provider for over 40 years.",
  metadataBase: new URL('https://shopleuco.com'),
  openGraph: {
    type: 'website',
    siteName: 'LEUCO Tool Corporation',
    url: 'https://shopleuco.com',
    title: 'LEUCO Tool Corporation | Precision Tooling',
    description: "North America's highest quality precision tooling and re-sharpening service provider for over 40 years.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEUCO Tool Corporation | Precision Tooling',
    description: "North America's highest quality precision tooling and re-sharpening service provider for over 40 years.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://leuco-chat.vercel.app" />
        <link rel="preload" href="https://leuco-chat.vercel.app/embed.js" as="script" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Search Atlas (Wrangler SEO) dynamic optimization pixel */}
        <script
          {...({ nowprocket: '', 'nitro-exclude': '' } as Record<string, string>)}
          type="text/javascript"
          id="sa-dynamic-optimization"
          data-uuid="3b0a39cc-283c-4342-810b-50e23b06b371"
          src="https://mydash.creativecowboys.co/scripts/dynamic_optimization.js"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
