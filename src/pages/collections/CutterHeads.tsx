import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import ProductCard from '../../components/ProductCard';

export default function CutterHeads() {
    const { products, loading } = useShopifyCollection('cutter-heads');

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">CUTTER HEADS</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CUTTER HEADS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        High-precision cutter heads for moulders, planers, and jointers. Engineered for perfect surface quality on solid wood, MDF, and composite materials.
                    </p>
                    <a href="https://shopleuco.com/collections/cutter-heads" target="_blank" rel="noopener noreferrer"
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP CUTTER HEADS <ArrowRight size={18} />
                    </a>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-2">Cutter Head Systems</h2>
                        <div className="h-1.5 w-24 bg-leuco-purple" />
                    </div>
                    <a href="https://shopleuco.com/collections/cutter-heads" target="_blank" rel="noopener noreferrer"
                        className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple">
                        VIEW ALL <ChevronRight size={16} />
                    </a>
                </div>
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse bg-gray-100 aspect-square rounded" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 8).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
