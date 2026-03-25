import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import CollectionGrid from '../../components/CollectionGrid';

export default function HighlineXP() {
    const { products, loading } = useShopifyCollection('highlinexp-industrial-series');

    return (
        <div>
            {/* Hero */}
            <div className="bg-leuco-black py-24 px-4 md:px-12 relative overflow-hidden min-h-[500px] flex items-center">
                <img
                    src="/highlinexp-hero-bg.jpg"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    alt="HighlineXP Saw Blade in Cabinetry Workshop"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-leuco-black via-leuco-black/70 to-transparent" />
                <div className="max-w-[1440px] mx-auto relative w-full">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">ALL NEW</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                        HIGHLINE<span className="text-leuco-purple">XP</span>
                    </h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        The HighlineXP Industrial Series represents the pinnacle of LEUCO engineering — precision-engineered for the most demanding industrial applications.
                    </p>
                    <button
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP HIGHLINEXP <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Zap, title: 'Maximum Performance', desc: 'Up to 40% longer tool life compared to standard tooling.' },
                        { icon: ShieldCheck, title: 'Precision Engineering', desc: 'Tolerances down to 0.001mm for ultra-fine surface quality.' },
                        { icon: Award, title: 'Industrial Grade', desc: 'Built for high-volume production environments.' },
                    ].map(({ icon: Icon, title, desc }, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }} className="p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <Icon className="text-leuco-purple mb-4" size={40} />
                            <h3 className="text-xl font-black mb-3">{title}</h3>
                            <p className="text-gray-500 font-medium">{desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div id="products-grid" className="mb-10">
                    <CollectionGrid products={products} loading={loading} title="HighlineXP Products" />
                </div>
            </div>
        </div>
    );
}
