import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import CollectionGrid from '../../components/CollectionGrid';

export default function CircularSaws() {
    const { products, loading } = useShopifyCollection('circular-saw-blades');

    const specs = [
        { label: 'Blade Diameter', value: '100mm – 600mm' },
        { label: 'Tooth Count', value: '12 – 108 teeth' },
        { label: 'Arbor Bore', value: '20mm – 60mm' },
        { label: 'Material', value: 'Tungsten Carbide Tipped' },
    ];

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">SAW BLADES</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CIRCULAR SAWS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        LEUCO circular saw blades deliver superior surface quality and extended tool life for ripping, crosscutting, and panel sizing operations.
                    </p>
                    <button
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP ALL SAW BLADES <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="py-16 px-4 md:px-12 bg-gray-50">
                <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {specs.map((s, i) => (
                        <div key={i} className="bg-white p-6 border-t-2 border-leuco-purple">
                            <div className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2">{s.label}</div>
                            <div className="text-lg font-black">{s.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="products-grid" className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <CollectionGrid products={products} loading={loading} title="Circular Saw Blades" />
            </div>
        </div>
    );
}
