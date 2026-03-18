import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const articles = [
    { tag: 'PRODUCT NEWS', title: 'Introducing the HighlineXP Industrial Series', date: 'February 2024', summary: 'LEUCO launches its most advanced CNC tooling line yet, featuring new HP+ spiral geometry for maximum performance in industrial applications.' },
    { tag: 'COMPANY NEWS', title: 'LEUCO Opens New Service Center in Indiana', date: 'January 2024', summary: 'Expanding our North American resharpening network with a new state-of-the-art service facility in the Midwest.' },
    { tag: 'INDUSTRY', title: 'LEUCO at IWF 2024: What to Expect', date: 'December 2023', summary: 'Preview the new products, demos, and engineering consultations LEUCO will be showcasing at this year\'s International Woodworking Fair.' },
    { tag: 'TECHNICAL', title: 'New Diamond Blade Compositions for HPL', date: 'November 2023', summary: 'LEUCO\'s materials science team announces breakthrough PCD compositions that extend service life by up to 35% in high-pressure laminate applications.' },
    { tag: 'PRODUCT NEWS', title: 'Updated Clamping System Line for 2024', date: 'October 2023', summary: 'Revised clamping system catalog adds 40 new configurations for modern CNC machining centers and moulders.' },
    { tag: 'EDUCATION', title: 'Resharpening ROI: Calculating the True Cost', date: 'September 2023', summary: 'A practical guide to calculating when resharpening vs. replacement makes financial sense for your operation.' },
];

export default function News() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">LATEST</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">LEUCO NEWS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Product launches, company announcements, industry news, and technical insights from LEUCO.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }}
                            className="group border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all cursor-pointer">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-leuco-purple/10 text-leuco-purple text-xs font-black px-3 py-1 tracking-widest">{article.tag}</span>
                                    <span className="text-xs text-gray-400 font-bold">{article.date}</span>
                                </div>
                                <h3 className="text-xl font-black mb-3 group-hover:text-leuco-purple transition-colors">{article.title}</h3>
                                <p className="text-gray-500 font-medium text-sm mb-6">{article.summary}</p>
                                <span className="font-black text-xs flex items-center gap-1 text-leuco-purple">
                                    READ MORE <ArrowRight size={12} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
