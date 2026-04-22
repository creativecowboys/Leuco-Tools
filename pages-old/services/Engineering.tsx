import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Engineering() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">ENGINEERING</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">LEUCO ENGINEERING</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        When standard tooling isn't enough, LEUCO's engineering team designs purpose-built solutions for your exact machine, material, and production requirements.
                    </p>
                    <Link to="/pages/contact-leuco" className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        START A PROJECT <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-6">Our Engineering Capabilities</h2>
                        <div className="space-y-6">
                            {[
                                { title: 'Custom Profile Design', desc: 'We create tooling profiles precisely matched to your moulding, door, or cabinet specifications.' },
                                { title: 'Material-Specific Engineering', desc: 'Optimized geometries for solid wood, MDF, particleboard, composites, HPL, and more.' },
                                { title: 'Machine Integration', desc: 'Tooling designed for compatibility with your specific machine make, model, and spindle configuration.' },
                                { title: 'Process Optimization', desc: 'Our engineers analyze your production workflow to identify tooling improvements that reduce waste and increase throughput.' },
                            ].map(({ title, desc }, i) => (
                                <motion.div key={i} whileHover={{ x: 4 }} className="flex gap-6 p-6 border-l-2 border-leuco-purple/20 hover:border-leuco-purple transition-colors">
                                    <div>
                                        <h3 className="font-black mb-2">{title}</h3>
                                        <p className="text-gray-500 font-medium text-sm">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-leuco-black text-white p-12">
                        <Settings className="text-leuco-purple mb-6" size={48} />
                        <h3 className="text-3xl font-black mb-4">Engineering Consultation</h3>
                        <p className="text-gray-400 font-medium mb-8">
                            Our engineering team offers free initial consultations to assess your tooling challenge and propose solutions. Contact us to get started.
                        </p>
                        <Link to="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors">
                            REQUEST CONSULTATION <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
