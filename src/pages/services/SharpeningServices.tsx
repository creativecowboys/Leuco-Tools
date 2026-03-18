import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Clock, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
    { step: '01', title: 'Pack Your Tools', desc: 'Safely package your tools with appropriate padding. Use original packaging when possible.' },
    { step: '02', title: 'Ship to Nearest Location', desc: 'Send to the LEUCO service center nearest to you for fastest turnaround.' },
    { step: '03', title: 'Expert Resharpening', desc: 'Our technicians restore your tools to original spec on advanced CNC grinding equipment.' },
    { step: '04', title: 'Quick Return', desc: 'Typical 24–48 hour turnaround. Rush service available on request.' },
];

export default function SharpeningServices() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">EXPERT SERVICE</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">SHARPENING SERVICES</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        Restore your LEUCO tools to factory-fresh performance. Our certified technicians use precision CNC grinding equipment to bring your tooling back to original manufacturer specifications.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/pages/contact-leuco" className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                            REQUEST SERVICE <ArrowRight size={18} />
                        </Link>
                        <Link to="/pages/tool-resharpening-faq" className="border-2 border-white text-white hover:bg-white hover:text-leuco-black font-black px-10 py-5 transition-all">
                            VIEW FAQ
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-leuco-purple py-12 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto grid grid-cols-3 divide-x divide-white/20 text-center">
                    {[
                        { value: '24H', label: 'TYPICAL TURNAROUND' },
                        { value: '40+', label: 'YEARS OF EXPERTISE' },
                        { value: '100%', label: 'QUALITY GUARANTEED' },
                    ].map((s, i) => (
                        <div key={i} className="py-4 px-8">
                            <div className="text-4xl font-black text-white mb-1">{s.value}</div>
                            <div className="text-white/70 text-xs font-black tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-black tracking-tighter mb-2">How It Works</h2>
                    <div className="h-1.5 w-24 bg-leuco-purple" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((s, i) => (
                        <motion.div key={i} whileHover={{ y: -4 }} className="p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <div className="text-5xl font-black text-leuco-purple/20 mb-4">{s.step}</div>
                            <h3 className="text-lg font-black mb-3">{s.title}</h3>
                            <p className="text-gray-500 font-medium text-sm">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Related Links */}
            <div className="bg-gray-50 py-16 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto flex flex-wrap gap-4 justify-center">
                    <Link to="/pages/tool-resharpening-faq" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple border border-gray-200 px-6 py-3 hover:border-leuco-purple transition-colors">
                        Resharpening FAQ <ChevronRight size={14} />
                    </Link>
                    <Link to="/pages/saw-blade-sharpening" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple border border-gray-200 px-6 py-3 hover:border-leuco-purple transition-colors">
                        Saw Blade Sharpening <ChevronRight size={14} />
                    </Link>
                    <Link to="/pages/tool-sharpening" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple border border-gray-200 px-6 py-3 hover:border-leuco-purple transition-colors">
                        Tool Sharpening <ChevronRight size={14} />
                    </Link>
                    <Link to="/pages/carbide-saw-sharpening-tips-tricks" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple border border-gray-200 px-6 py-3 hover:border-leuco-purple transition-colors">
                        Carbide Saw Tips <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
