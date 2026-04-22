import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
    { title: 'Tooling Innovations', desc: 'The latest breakthroughs in cutting tool design, geometry, and materials science.', href: '/blogs/leuco-solutions/leuco-tooling-innovations', tag: 'INNOVATION' },
    { title: 'Materials Solutions', desc: 'Optimized tooling strategies for specific materials: solid wood, MDF, composites, HPL, and more.', href: '/blogs/leuco-solutions/leuco-materials-solutions', tag: 'MATERIALS' },
    { title: 'Tooling Solutions', desc: 'Practical guides for specific production challenges, machine configurations, and application types.', href: '/blogs/leuco-solutions/leuco-tooling-solutions', tag: 'SOLUTIONS' },
];

export default function SolutionsHub() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <p className="text-leuco-purple font-black text-xs tracking-widest mb-4">KNOWLEDGE BASE</p>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">LEUCO SOLUTIONS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Technical guides, application notes, and tooling insights from LEUCO's engineering and application experts.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div key={i} whileHover={{ y: -6 }} className="group">
                            <Link to={cat.href} className="block p-10 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all h-full">
                                <span className="inline-block bg-leuco-purple/10 text-leuco-purple text-xs font-black px-3 py-1 tracking-widest mb-6">{cat.tag}</span>
                                <h2 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-leuco-purple transition-colors">{cat.title}</h2>
                                <p className="text-gray-500 font-medium mb-8">{cat.desc}</p>
                                <span className="font-black text-sm flex items-center gap-2 group-hover:text-leuco-purple transition-colors">
                                    EXPLORE <ChevronRight size={16} />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-leuco-purple py-20 px-4 md:px-12 text-center">
                <h2 className="text-4xl font-black text-white mb-4">Have a Specific Challenge?</h2>
                <p className="text-white/80 font-medium mb-8 max-w-xl mx-auto">Our application engineers can help you find the right tooling solution for your exact situation.</p>
                <Link to="/pages/contact-leuco" className="bg-white text-leuco-purple font-black px-10 py-4 inline-flex items-center gap-2 hover:bg-leuco-black hover:text-white transition-colors">
                    CONTACT AN EXPERT <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
