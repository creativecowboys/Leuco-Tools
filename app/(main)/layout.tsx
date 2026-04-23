import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Layout>{children}</Layout>
    </CartProvider>
  );
}
