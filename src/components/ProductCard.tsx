import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShopifyProduct } from '../lib/shopify';

interface ProductCardProps {
    product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, addingVariantId } = useCart();
    const image = product.images.edges[0]?.node;
    const variant = product.variants.edges[0]?.node;
    const isAdding = addingVariantId === variant?.id;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!variant?.id) return;
        await addToCart(variant.id);
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all flex flex-col"
        >
            {/* Image / Link to internal product page */}
            <Link
                to={`/products/${product.handle}`}
                className="block p-6 flex-1"
            >
                <div className="aspect-square bg-gray-50 mb-4 overflow-hidden">
                    {image ? (
                        <img
                            src={image.url}
                            alt={image.altText ?? product.title}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <ShoppingCart size={40} />
                        </div>
                    )}
                </div>
                <h4 className="font-black text-sm leading-tight group-hover:text-leuco-purple transition-colors">
                    {product.title}
                </h4>
                {variant?.price && (
                    <p className="text-leuco-purple font-black text-sm mt-1">
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: variant.price.currencyCode,
                        }).format(parseFloat(variant.price.amount))}
                    </p>
                )}
            </Link>

            {/* Add to Cart Button */}
            {variant?.availableForSale !== false && (
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding || !variant?.id}
                    className="w-full bg-leuco-black text-white text-xs font-black tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-leuco-purple transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isAdding ? (
                        <>
                            <Loader2 size={14} className="animate-spin" /> ADDING...
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={14} /> ADD TO CART
                        </>
                    )}
                </button>
            )}
        </motion.div>
    );
}
