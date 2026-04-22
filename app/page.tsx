import { fetchProducts } from '@/lib/shopify';

export default async function HomePage() {
  const products = await fetchProducts(5);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">LEUCO Tools — Next.js Migration</h1>
      <p className="mb-8 text-gray-600">
        Tooling conversion complete. Real LEUCO products fetched server-side from Shopify:
      </p>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <span className="font-semibold">{p.title}</span>
            <span className="text-gray-500 ml-2 text-sm">/products/{p.handle}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
