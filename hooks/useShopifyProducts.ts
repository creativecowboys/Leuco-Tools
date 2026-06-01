'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

interface UseShopifyProductsResult {
    products: ShopifyProduct[];
    loading: boolean;
    error: string | null;
}

export function useShopifyProducts(count = 8, query?: string): UseShopifyProductsResult {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);

        fetchProducts(count, query)
            .then((data) => {
                if (!cancelled) {
                    setProducts(data);
                }
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [count, query]);

    return { products, loading, error };
}
