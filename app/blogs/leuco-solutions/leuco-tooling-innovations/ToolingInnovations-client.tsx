'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const articles = [
    { title: 'HighlineXP: The Next Generation of Spiral Tooling', summary: "How LEUCO's new HP+ geometry delivers up to 40% longer tool life in CNC routing applications." },
    { title: 'Diamond Tooling Breakthroughs for HPL Processing', summary: 'New PCD compositions extend service intervals dramatically when cutting high-pressure laminates.' },
    { title: 'Anti-Kickback Technology in Modern Saw Blades', summary: 'How advanced tooth geometry reduces workpiece ejection risk without sacrificing cut quality.' },
    { title: 'Micro-Coating Technology for Carbide Tools', summary: 'The science behind TiN, TiAlN, and DLC coatings and when to specify each for maximum ROI.' },
];

export default function ToolingInnovationsClient() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">INNOVATION</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">TOOLING INNOVATIONS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        The latest advances in cutting tool technology, materials, and design from LEUCO's global R&amp;D program.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }} className="group p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all cursor-pointer">
                            <span className="inline-block bg-leuco-purple/10 text-leuco-purple text-xs font-black px-3 py-1 tracking-widest mb-4">INNOVATION</span>
                            <h3 className="text-xl font-black mb-3 group-hover:text-leuco-purple transition-colors">{article.title}</h3>
                            <p className="text-gray-500 font-medium text-sm mb-6">{article.summary}</p>
                            <span className="font-black text-xs flex items-center gap-1 text-leuco-purple">READ MORE <ArrowRight size={12} /></span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/blogs/leuco-solutions" className="font-black text-sm hover:text-leuco-purple transition-colors">
                        ← BACK TO ALL SOLUTIONS
                    </Link>
                </div>
            </div>
        </div>
    );
}
