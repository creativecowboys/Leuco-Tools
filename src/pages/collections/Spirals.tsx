import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import ProductCard from '../../components/ProductCard';

export default function Spirals() {
    const { products, loading } = useShopifyCollection('spiral-tools');

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-leuco-purple/10 to-transparent" />
                <div className="max-w-[1440px] mx-auto relative">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">HP+ SERIES</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">SPIRALS & DRILLS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        HP+ spiral and drill tooling for CNC routing and machining centers — engineered for composite, solid surface, and wood applications.
                    </p>
                    <a href="https://shopleuco.com/collections/spiral-tools" target="_blank" rel="noopener noreferrer"
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP SPIRALS & DRILLS <ArrowRight size={18} />
                    </a>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-2">Spiral Tools</h2>
                        <div className="h-1.5 w-24 bg-leuco-purple" />
                    </div>
                    <a href="https://shopleuco.com/collections/spiral-tools" target="_blank" rel="noopener noreferrer"
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
