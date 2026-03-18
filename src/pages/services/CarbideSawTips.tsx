import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const tips = [
    { title: 'Inspect Before Shipping', desc: 'Look for cracks, missing teeth, or bore damage before sending your blade in.' },
    { title: 'Clean the Blade First', desc: 'Remove pitch, resin, and sawdust buildup so technicians can accurately assess the tooth geometry.' },
    { title: 'Track Your Cuts Per Grind', desc: 'Keeping a log of how many linear feet between services helps optimize your resharpening schedule and budget.' },
    { title: 'Verify Hook and Bevel Angles', desc: 'Confirm your blade spec sheet is included so technicians use the correct grind geometry.' },
    { title: 'Check Plate Tension', desc: 'A warped plate cannot be corrected by resharpening alone. Ask your technician to check tension on every visit.' },
    { title: 'Use Proper Tooth Load', desc: 'Running at the correct feed rate extends carbide life significantly between resharpenings.' },
];

export default function CarbideSawTips() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">EDUCATION</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">CARBIDE SAW SHARPENING TIPS & TRICKS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">Expert advice from LEUCO's service technicians on getting the most from your carbide saw blades.</p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex gap-6 p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <CheckCircle className="text-leuco-purple shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="font-black text-lg mb-2">{tip.title}</h3>
                                <p className="text-gray-500 font-medium">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-leuco-black text-white p-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h2 className="text-3xl font-black mb-3">Ready to Schedule Service?</h2>
                        <p className="text-gray-400 font-medium">Our expert technicians are ready to restore your tools to peak performance.</p>
                    </div>
                    <Link to="/pages/sharpening-services" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors shrink-0">
                        SCHEDULE RESHARPENING <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
