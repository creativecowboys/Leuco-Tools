import { useEffect, useState } from 'react';
import { fetchCollectionProducts, ShopifyProduct } from '../lib/shopify';

interface UseShopifyCollectionResult {
    products: ShopifyProduct[];
    loading: boolean;
    error: string | null;
}

export function useShopifyCollection(handle: string): UseShopifyCollectionResult {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        setError(null);

        fetchCollectionProducts(handle)
            .then((data) => {
                if (!cancelled) setProducts(data);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [handle]);

    return { products, loading, error };
}
