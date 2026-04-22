import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const collections = [
    { title: 'HighlineXP Industrial Series', subtitle: 'ALL NEW', href: '/collections/highlinexp-industrial-series', desc: 'The next generation of precision industrial tooling engineered for extreme performance.' },
    { title: 'Circular Saw Blades', subtitle: 'SAW BLADES', href: '/collections/circular-saw-blades', desc: 'Precision-crafted saw blades for furniture, flooring, and panel processing.' },
    { title: 'Cutter Heads', subtitle: 'CUTTER HEADS', href: '/collections/cutter-heads', desc: 'High-precision cutter heads for moulders, planers, and jointers.' },
    { title: 'Spirals & Drills', subtitle: 'CNC TOOLING', href: '/collections/spiral-tools', desc: 'HP+ spiral and drill tooling for CNC routing and machining centers.' },
    { title: 'Knives & Inserts', subtitle: 'CUTTING EDGES', href: '/collections/knives-and-inserts', desc: 'Carbide and HSS knives and inserts for all tooling systems.' },
    { title: 'Clamping Systems', subtitle: 'ACCESSORIES', href: '/collections/clamping-systems', desc: 'Professional clamping and holding systems for secure tool mounting.' },
    { title: 'Parts & Accessories', subtitle: 'PARTS', href: '/collections/parts-and-accessories', desc: 'Genuine LEUCO replacement parts and accessories for your tooling systems.' },
];

export default function ToolsHub() {
    return (
        <div>
            {/* Hero */}
            <div className="bg-leuco-black py-20 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <p className="text-leuco-purple font-black text-xs tracking-widest mb-4">LEUCO TOOLING</p>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">TOOLS</h1>
                    <p className="text-gray-400 text-xl font-medium max-w-2xl">
                        World-class precision tooling systems engineered for the woodworking, furniture, and composite industries.
                    </p>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((col, i) => (
                        <motion.div key={i} whileHover={{ y: -6 }} className="group border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all duration-300">
                            <Link to={col.href} className="block p-10">
                                <div className="text-leuco-purple font-black text-xs tracking-widest mb-3">{col.subtitle}</div>
                                <h2 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-leuco-purple transition-colors">{col.title}</h2>
                                <p className="text-gray-500 font-medium mb-8">{col.desc}</p>
                                <span className="font-black text-sm flex items-center gap-2 group-hover:text-leuco-purple transition-colors">
                                    SHOP NOW <ChevronRight size={16} />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-leuco-purple py-20 px-4 md:px-12 text-center">
                <h2 className="text-4xl font-black text-white mb-4">Need a Custom Solution?</h2>
                <p className="text-white/80 font-medium mb-8 max-w-xl mx-auto">Our engineering team specializes in custom tooling designed to your exact specifications.</p>
                <Link to="/pages/custom-tooling" className="bg-white text-leuco-purple font-black px-10 py-4 inline-flex items-center gap-2 hover:bg-leuco-black hover:text-white transition-colors">
                    CUSTOM TOOLING <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
