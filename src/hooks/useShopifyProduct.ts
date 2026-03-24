import { useEffect, useState } from 'react';
import { fetchProductByHandle, ShopifyProductDetail } from '../lib/shopify';

interface UseShopifyProductResult {
    product: ShopifyProductDetail | null;
    loading: boolean;
    error: string | null;
}

export function useShopifyProduct(handle: string): UseShopifyProductResult {
    const [product, setProduct] = useState<ShopifyProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!handle) return;
        let cancelled = false;

        setLoading(true);
        setError(null);

        fetchProductByHandle(handle)
            .then((data) => {
                if (!cancelled) setProduct(data);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [handle]);

    return { product, loading, error };
}
