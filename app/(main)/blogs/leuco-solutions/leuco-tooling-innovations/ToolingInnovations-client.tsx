'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const articles = [
    {
        slug: 'leuco-hp-plus-spirals',
        title: 'LEUCO HP+ Spirals',
        summary: 'While the Original HP Spirals Set Industry Benchmarks for Performance, LEUCO HP+ Spirals Take Precision, Durability, And Efficiency to Unprecedented Levels.',
    },
    {
        slug: 'leuco-shrinkfit-heatsync-system',
        title: 'LEUCO ShrinkFIT HeatSync System',
        summary: 'Take Control of Your Tool Setup with LEUCO\'s ShrinkFIT HeatSync System, and Watch Your Efficiency, Durability, and Productivity Skyrocket!',
    },
    {
        slug: 'leuco-t3-system',
        title: 'LEUCO t3-System',
        summary: 'Revolutionizing Solid Wood Machining at the Highest Level. Discover Cutting-Edge Precision with the LEUCO t3-System — Proven Performance, Proven Products.',
    },
    {
        slug: 'leuco-plastics-processing',
        title: 'LEUCO Plastics Processing',
        summary: 'When other saw blades won\'t cut it, the latest advancements in the LEUCO Plastics Processing System are second to none — specifically engineered for quality cuts.',
    },
    {
        slug: 'leuco-airface-system',
        title: 'LEUCO airFace System',
        summary: 'Nature as a model for tool development. The "owl wing" concept smooths air flow and scatters noise — delivering quieter, cleaner cuts in jointing and hogging.',
    },
    {
        slug: 'leuco-hp-spirals',
        title: 'LEUCO HP Spirals',
        summary: 'Spirals are used for sizing, jointing, grooving, and dividing of panels. They cut at high feed rates, are low in cost, and are re-sharpenable — producing chip-free finish.',
    },
    {
        slug: 'leuco-nn-system',
        title: 'LEUCO nn-System',
        summary: 'The most silent saw blade in the industry segment! Superior cutting quality in an extreme variety of materials with noise of idling diamond-tipped saw blades reduced by up to 6 dB(A).',
    },
    {
        slug: 'leuco-p-system',
        title: 'LEUCO p-System',
        summary: "It's all about face shear — The Revolution of Peeling. LEUCO p-System tools are used for jointing, rabbeting and dividing on stationary and through-feed machines.",
    },
];

export default function ToolingInnovationsClient() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">INNOVATION</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">TOOLING INNOVATIONS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        The latest advances in cutting tool technology, materials, and design from LEUCO&apos;s global R&amp;D program.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }} className="group">
                            <Link
                                href={`/blogs/tooling-innovations/${article.slug}`}
                                className="block p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all h-full"
                            >
                                <span className="inline-block bg-leuco-purple/10 text-leuco-purple text-xs font-black px-3 py-1 tracking-widest mb-4">INNOVATION</span>
                                <h3 className="text-xl font-black mb-3 group-hover:text-leuco-purple transition-colors">{article.title}</h3>
                                <p className="text-gray-500 font-medium text-sm mb-6">{article.summary}</p>
                                <span className="font-black text-xs flex items-center gap-1 text-leuco-purple">
                                    READ MORE <ArrowRight size={12} />
                                </span>
                            </Link>
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
