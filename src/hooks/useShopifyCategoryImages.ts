import { useEffect, useState } from 'react';
import { fetchCategoryImages, CategoryImages } from '../lib/shopify';

interface UseShopifyCategoryImagesResult {
    images: CategoryImages;
    loading: boolean;
}

const FALLBACKS: CategoryImages = {
    spirals: 'https://cdn.shopify.com/s/files/1/2239/2465/products/3-7A_B_f6c34fce-489a-45e5-8e95-ff82161e99f1.png?v=1651774348',
    diamond: 'https://cdn.shopify.com/s/files/1/2239/2465/products/PIC_1-9_sizing-edited.jpg?v=1648565919',
    sawBlades: 'https://cdn.shopify.com/s/files/1/2239/2465/collections/13.jpg?v=1621543042',
};

export function useShopifyCategoryImages(): UseShopifyCategoryImagesResult {
    const [images, setImages] = useState<CategoryImages>(FALLBACKS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetchCategoryImages()
            .then((data) => {
                if (!cancelled) {
                    setImages({
                        spirals: data.spirals ?? FALLBACKS.spirals,
                        diamond: data.diamond ?? FALLBACKS.diamond,
                        sawBlades: data.sawBlades ?? FALLBACKS.sawBlades,
                    });
                }
            })
            .catch(() => {
                // silently fall back to static images — already set in initial state
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    return { images, loading };
}
