import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Settings, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
    {
        title: 'Sharpening Services',
        desc: 'Expert re-sharpening to restore your tools to manufacturer specs using advanced CNC grinding.',
        href: '/pages/sharpening-services',
        icon: Wrench,
    },
    {
        title: 'Engineering',
        desc: 'Custom tooling solutions designed and engineered to meet your specific production requirements.',
        href: '/pages/leuco-engineering',
        icon: Settings,
    },
    {
        title: 'Custom Tooling',
        desc: 'Purpose-built tooling designed for your unique materials, machines, and production demands.',
        href: '/pages/custom-tooling',
        icon: Settings,
    },
];

export default function ServicesHub() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <p className="text-leuco-purple font-black text-xs tracking-widest mb-4">LEUCO</p>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">SERVICES</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        LEUCO's service offerings go beyond tooling supply — we partner with you to maximize uptime, tool life, and performance.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map(({ title, desc, href, icon: Icon }, i) => (
                        <motion.div key={i} whileHover={{ y: -6 }} className="group">
                            <Link to={href} className="block p-10 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all h-full">
                                <Icon className="text-leuco-purple mb-6" size={40} />
                                <h2 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-leuco-purple transition-colors">{title}</h2>
                                <p className="text-gray-500 font-medium mb-8">{desc}</p>
                                <span className="font-black text-sm flex items-center gap-2 group-hover:text-leuco-purple transition-colors">
                                    LEARN MORE <ChevronRight size={16} />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 py-20 px-4 md:px-12 text-center">
                <h2 className="text-4xl font-black tracking-tighter mb-4">Ready to Get Started?</h2>
                <p className="text-gray-500 font-medium mb-8 max-w-xl mx-auto">Contact our service team to schedule resharpening or discuss a custom tooling project.</p>
                <Link to="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-10 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                    CONTACT US <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
