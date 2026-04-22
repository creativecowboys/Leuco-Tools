import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function SawBladeSharpening() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">SERVICE</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">SAW BLADE SHARPENING</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">From 8" hobby blades to 24" industrial rip saws, LEUCO's service centers provide precision grinding to restore cutting performance.</p>
                    <Link to="/pages/contact-leuco" className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        BOOK SERVICE <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-6">What We Sharpen</h2>
                        <div className="space-y-4">
                            {['Circular Saw Blades (all sizes)', 'Dado and Ripping Blades', 'Panel Saw Blades', 'Sliding Table Saw Blades', 'Scoring Blades', 'Composite & Laminate Blades'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle className="text-leuco-purple shrink-0" size={18} />
                                    <span className="font-bold text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-10">
                        <h3 className="text-2xl font-black mb-6">Our Grinding Process</h3>
                        <ol className="space-y-4">
                            {['Full inspection and documentation', 'Pitch and resin removal', 'Face and top grinding to spec', 'Side grinding and clearance angles', 'Final inspection and measurement verification', 'Quality certification'].map((step, i) => (
                                <li key={i} className="flex gap-4">
                                    <span className="font-black text-leuco-purple w-6 shrink-0">{i + 1}.</span>
                                    <span className="font-medium text-gray-600">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
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
