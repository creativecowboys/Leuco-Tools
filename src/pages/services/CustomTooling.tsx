import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CustomTooling() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">CUSTOM</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CUSTOM TOOLING</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        LEUCO's custom tooling program delivers one-of-a-kind solutions engineered for your exact profiles, materials, and production volumes. From prototype to production.
                    </p>
                    <Link to="/pages/contact-leuco" className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        REQUEST QUOTE <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {[
                        { step: '01', title: 'Submit Your Request', desc: 'Send us your profiles, drawings, or samples. Our team will review your requirements and provide initial feedback.' },
                        { step: '02', title: 'Engineering Review', desc: 'Our engineers analyze your requirements, machine specs, and material to design the optimal tooling solution.' },
                        { step: '03', title: 'Prototype & Test', desc: 'We manufacture a prototype for you to test in your production environment before full commitment.' },
                        { step: '04', title: 'Production Manufacturing', desc: 'Full production tooling manufactured to the highest LEUCO quality standards.' },
                        { step: '05', title: 'Ongoing Support', desc: 'Your LEUCO representative remains your point of contact for resharpening, replacements, and adjustments.' },
                    ].map((s, i) => (
                        <div key={i} className="p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <div className="text-5xl font-black text-leuco-purple/20 mb-4">{s.step}</div>
                            <h3 className="font-black text-lg mb-3">{s.title}</h3>
                            <p className="text-gray-500 font-medium text-sm">{s.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-leuco-purple p-12 text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Have a Unique Tooling Challenge?</h2>
                    <p className="text-white/80 font-medium mb-8 max-w-xl mx-auto">Our engineers thrive on solving complex tooling problems. Let's talk about your project.</p>
                    <Link to="/pages/contact-leuco" className="bg-white text-leuco-purple font-black px-10 py-4 inline-flex items-center gap-2 hover:bg-leuco-black hover:text-white transition-colors">
                        START A PROJECT <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
