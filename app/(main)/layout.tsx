import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import Script from 'next/script';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Layout>{children}</Layout>
      {/* Leuco AI Tool Advisor (floating bubble) */}
      <Script
        src="https://leuco-tools.replit.app/embed.js"
        data-mode="bubble"
        strategy="afterInteractive"
      />
    </CartProvider>
  );
}
