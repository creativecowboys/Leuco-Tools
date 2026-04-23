'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import CollectionGrid from '@/components/CollectionGrid';

interface Props {
    initialProducts: ShopifyProduct[];
}

export default function KnivesInsertsClient({ initialProducts }: Props) {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">CUTTING EDGES</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">KNIVES &amp; INSERTS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        Carbide and HSS knives and inserts for all LEUCO tooling systems. Maintain peak performance with genuine LEUCO replacement edges.
                    </p>
                    <button
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP KNIVES &amp; INSERTS <ArrowRight size={18} />
                    </button>
                </div>
            </div>
            <div id="products-grid" className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <CollectionGrid initialProducts={initialProducts} title="Knives & Inserts" />
            </div>
        </div>
    );
}
