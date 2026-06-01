import React from 'react';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - LEUCO Tool Corporation',
};

export default function NotFound() {
  return (
    <CartProvider>
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center py-20 bg-white">
          <h1 className="text-6xl md:text-8xl font-black text-leuco-purple mb-6 tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-4xl font-black text-leuco-black uppercase mb-4 tracking-tight">PAGE NOT FOUND</h2>
          <p className="text-gray-500 font-medium max-w-md mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="bg-leuco-purple text-white font-black px-8 py-4 hover:bg-leuco-black transition-colors"
            >
              BACK TO HOME
            </Link>
            <Link
              href="/pages/tools"
              className="border-2 border-leuco-black text-leuco-black font-black px-8 py-4 hover:bg-leuco-black hover:text-white transition-colors"
            >
              BROWSE TOOLS
            </Link>
          </div>
        </div>
      </Layout>
    </CartProvider>
  );
}
