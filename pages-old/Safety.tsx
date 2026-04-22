import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function Safety() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">IMPORTANT</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">SAFETY</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Woodworking tooling safety guidelines and best practices for safe, productive operation of LEUCO tooling systems.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="max-w-3xl">
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12">
                        <h3 className="font-black text-amber-800 mb-2">Important Safety Notice</h3>
                        <p className="text-amber-700 font-medium">Always read all safety documentation provided with your LEUCO tooling before use. Improper use of cutting tools can result in serious injury. If in doubt, contact your LEUCO representative.</p>
                    </div>

                    {[
                        {
                            title: 'General Safety Guidelines',
                            items: [
                                'Always wear appropriate personal protective equipment (PPE) including safety glasses, hearing protection, and cut-resistant gloves.',
                                'Inspect all tooling before each use. Never use damaged, cracked, or improperly repaired tools.',
                                'Ensure the tool is designed and rated for your specific machine and application.',
                                'Never exceed the maximum operating speed (RPM) marked on the tool.',
                                'Ensure all machine guarding is in place and functioning before operating.',
                                'Never attempt to modify tools in any way.',
                            ],
                        },
                        {
                            title: 'Saw Blade Safety',
                            items: [
                                'Never use a saw blade with a crack, missing tooth, or damaged plate.',
                                'Ensure the blade bore matches the machine arbor exactly. Never use adaptor rings unless designed for the specific combination.',
                                'Always use the correct saw blade for the material being cut.',
                                'Provide adequate workpiece support to prevent binding.',
                                'Allow the blade to come to a complete stop before reaching into the cut zone.',
                            ],
                        },
                        {
                            title: 'Router Bit & Spiral Tool Safety',
                            items: [
                                'Always check the shank diameter and router collet condition before use.',
                                'Do not plunge at excessive depth. Follow manufacturer recommendations for depth-per-pass.',
                                'Use climb-cutting techniques only with appropriate experience and workpiece support.',
                                'Inspect carbide inserts for cracks or chips before every use.',
                            ],
                        },
                    ].map((section, i) => (
                        <div key={i} className="mb-12">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <ShieldCheck className="text-leuco-purple" size={24} />
                                {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.items.map((item, j) => (
                                    <li key={j} className="flex gap-4 items-start">
                                        <div className="w-2 h-2 bg-leuco-purple rounded-full shrink-0 mt-2" />
                                        <p className="text-gray-600 font-medium">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="bg-leuco-black text-white p-10">
                        <h3 className="text-2xl font-black mb-4">Questions About Safe Use?</h3>
                        <p className="text-gray-400 font-medium mb-6">Contact your LEUCO application engineer for guidance on safe tool selection and use in your specific application.</p>
                        <Link to="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors">
                            CONTACT US <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
