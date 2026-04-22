import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

function SolutionCategoryPage({ title, tag, description, articles }: {
    title: string;
    tag: string;
    description: string;
    articles: { title: string; summary: string }[];
}) {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">{tag}</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">{title}</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">{description}</p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }} className="group p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all cursor-pointer">
                            <span className="inline-block bg-leuco-purple/10 text-leuco-purple text-xs font-black px-3 py-1 tracking-widest mb-4">{tag}</span>
                            <h3 className="text-xl font-black mb-3 group-hover:text-leuco-purple transition-colors">{article.title}</h3>
                            <p className="text-gray-500 font-medium text-sm mb-6">{article.summary}</p>
                            <span className="font-black text-xs flex items-center gap-1 text-leuco-purple">READ MORE <ArrowRight size={12} /></span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link to="/blogs/leuco-solutions" className="font-black text-sm hover:text-leuco-purple transition-colors">
                        ← BACK TO ALL SOLUTIONS
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function ToolingInnovations() {
    return <SolutionCategoryPage
        title="TOOLING INNOVATIONS"
        tag="INNOVATION"
        description="The latest advances in cutting tool technology, materials, and design from LEUCO's global R&D program."
        articles={[
            { title: 'HighlineXP: The Next Generation of Spiral Tooling', summary: 'How LEUCO\'s new HP+ geometry delivers up to 40% longer tool life in CNC routing applications.' },
            { title: 'Diamond Tooling Breakthroughs for HPL Processing', summary: 'New PCD compositions extend service intervals dramatically when cutting high-pressure laminates.' },
            { title: 'Anti-Kickback Technology in Modern Saw Blades', summary: 'How advanced tooth geometry reduces workpiece ejection risk without sacrificing cut quality.' },
            { title: 'Micro-Coating Technology for Carbide Tools', summary: 'The science behind TiN, TiAlN, and DLC coatings and when to specify each for maximum ROI.' },
        ]}
    />;
}

export function MaterialsSolutions() {
    return <SolutionCategoryPage
        title="MATERIALS SOLUTIONS"
        tag="MATERIALS"
        description="Material-specific tooling strategies for solid wood, engineered wood, composites, and specialty substrates."
        articles={[
            { title: 'Tooling for MDF: Edge Quality and Dust Control', summary: 'Optimized geometries and chip loads for achieving zero-tearout edges in medium-density fiberboard.' },
            { title: 'Solid Wood Ripping: Maximizing Yield and Surface Quality', summary: 'How tooth count, hook angle, and feed rate selection affect surface finish in hardwood ripping.' },
            { title: 'Processing HPL and Compact Laminate', summary: 'Matching the right PCD grade and cutting parameters to your laminate type for maximum tool life.' },
            { title: 'Carbon Fiber and Composites: A Tooling Guide', summary: 'Specialized LEUCO tooling systems for composite materials in aerospace and industrial applications.' },
        ]}
    />;
}

export function ToolingSolutions() {
    return <SolutionCategoryPage
        title="TOOLING SOLUTIONS"
        tag="SOLUTIONS"
        description="Practical application guides for common woodworking and manufacturing production challenges."
        articles={[
            { title: 'Optimizing Your Panel Saw for Zero-Tearout Cuts', summary: 'A step-by-step guide to scoring blade setup, scoring depth, and main blade geometry selection.' },
            { title: 'CNC Router Bit Selection Guide', summary: 'Match your router bit type, geometry, and coating to your specific machine, material, and cut type.' },
            { title: 'Moulder Setup for Perfect Edge Quality', summary: 'Cutter head configuration, knife seating, and feed rate optimization for moulder operations.' },
            { title: 'Calculating True Cost Per Cut', summary: 'How to measure the real economics of tooling decisions including sharpening cycles, productivity, and quality.' },
        ]}
    />;
}

export default ToolingInnovations;
