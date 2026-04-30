'use client';

import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { ShopifyProduct } from '@/lib/shopify';
import CollectionGrid from '@/components/CollectionGrid';

interface Props {
    initialProducts: ShopifyProduct[];
}

export default function HighlineXPClient({ initialProducts }: Props) {
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
                        The HighlineXP Industrial Series delivers ultra-fine finish quality in the most demanding production environments. Re-sharpenable carbide construction extends tool life up to 8–10 resharpenings, reducing cost-per-cut across your entire operation.
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
                        { icon: Zap, title: 'Maximum Performance', desc: 'Engineered for the highest feed rates and longest run times — outperforming standard tooling in head-to-head production tests.' },
                        { icon: ShieldCheck, title: 'Precision Engineering', desc: 'Micron-level tolerances produce ultra-fine surface quality straight off the tool, reducing downstream sanding and finishing time.' },
                        { icon: Award, title: 'Industrial Grade', desc: 'Re-sharpenable carbide construction yields up to 8–10 resharpenings, dramatically lowering total tool cost for high-volume operations.' },
                    ].map(({ icon: Icon, title, desc }, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }} className="p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <Icon className="text-leuco-purple mb-4" size={40} />
                            <h3 className="text-xl font-black mb-3">{title}</h3>
                            <p className="text-gray-500 font-medium">{desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div id="products-grid" className="mb-10">
                    <CollectionGrid initialProducts={initialProducts} title="HighlineXP Products" />
                </div>
            </div>
        </div>
    );
}
