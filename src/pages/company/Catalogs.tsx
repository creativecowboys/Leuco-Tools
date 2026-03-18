import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function Catalogs() {
    const catalogs = [
        { title: 'LEUCO Main Catalog', desc: 'Complete overview of LEUCO tooling systems, product ranges, and technical specifications.', year: '2024' },
        { title: 'HighlineXP Industrial Series', desc: 'Full product catalog for the HighlineXP industrial tooling line.', year: '2024' },
        { title: 'Circular Saw Blades', desc: 'Complete circular saw blade range including specifications, applications, and ordering information.', year: '2024' },
        { title: 'Cutter Heads & Knives', desc: 'Moulder, planer, and jointer cutter head systems with knife inserts.', year: '2024' },
        { title: 'CNC Tooling (Spirals & Drills)', desc: 'HP+ spiral and drill tooling for CNC routing and machining centers.', year: '2024' },
        { title: 'Resharpening Services Guide', desc: 'How to work with LEUCO service centers to maximize tool performance and life.', year: '2024' },
    ];

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">DOWNLOADS</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CATALOGS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Download LEUCO product catalogs, technical references, and application guides.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {catalogs.map((cat, i) => (
                        <div key={i} className="flex gap-6 p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all group">
                            <div className="w-16 h-20 bg-leuco-purple/10 border-2 border-leuco-purple/20 flex items-center justify-center shrink-0">
                                <Download className="text-leuco-purple" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-black text-gray-400 tracking-widest mb-1">{cat.year}</div>
                                <h3 className="font-black text-lg mb-2 group-hover:text-leuco-purple transition-colors">{cat.title}</h3>
                                <p className="text-gray-500 font-medium text-sm mb-4">{cat.desc}</p>
                                <a href="https://shopleuco.com/pages/catalogs" target="_blank" rel="noopener noreferrer"
                                    className="font-black text-xs flex items-center gap-1 text-leuco-purple hover:text-leuco-black transition-colors">
                                    DOWNLOAD PDF <ArrowRight size={12} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gray-50 p-12 text-center">
                    <h2 className="text-2xl font-black mb-4">Need a Printed Catalog?</h2>
                    <p className="text-gray-500 font-medium mb-6">Contact your LEUCO representative to request printed catalogs for your team.</p>
                    <a href="https://shopleuco.com/pages/contact-leuco" target="_blank" rel="noopener noreferrer"
                        className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                        REQUEST PRINT CATALOG <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
