import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ToolSharpening() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">SERVICE</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">TOOL SHARPENING</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">Expert resharpening for router bits, spiral tools, cutter heads, jointer knives, and all other woodworking tooling.</p>
                    <Link to="/pages/contact-leuco" className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        BOOK SERVICE <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: 'Router Bits & Spirals', items: ['Straight flute router bits', 'Spiral up/down-cut bits', 'Profile bits', 'Surface planers'] },
                        { title: 'Cutter Heads', items: ['Moulder cutter heads', 'Planer heads', 'Jointer heads', 'Profile cutter heads'] },
                        { title: 'Knives & Inserts', items: ['Straight knives (HSS & Carbide)', 'Insert-style knives', 'Profile knives', 'Scoring knives'] },
                    ].map((category, i) => (
                        <div key={i} className="p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <h3 className="text-xl font-black mb-6">{category.title}</h3>
                            <ul className="space-y-3">
                                {category.items.map((item, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <CheckCircle className="text-leuco-purple shrink-0" size={16} />
                                        <span className="text-gray-600 font-medium text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/pages/sharpening-services" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple justify-center">
                        ← BACK TO ALL SHARPENING SERVICES
                    </Link>
                </div>
            </div>
        </div>
    );
}
