'use client';

import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import Script from 'next/script';
import { ChatCartBridge } from '@/components/ChatCartBridge';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Layout>{children}</Layout>
      {/* Bridges leuco-embed:cart-add messages from the AI widget → CartContext */}
      <ChatCartBridge />
      {/* Leuco AI Tool Advisor (floating bubble) */}
      <Script
        src="https://leuco.leadlasso.ai/embed.js"
        data-mode="bubble"
        strategy="afterInteractive"
      />
    </CartProvider>
  );
}
