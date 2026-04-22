import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';

const openings = [
    { title: 'CNC Grinding Technician', location: 'Georgia', type: 'Full-Time', dept: 'Service Operations' },
    { title: 'Regional Sales Manager – Southeast', location: 'Georgia', type: 'Full-Time', dept: 'Sales' },
    { title: 'Application Engineer', location: 'Michigan', type: 'Full-Time', dept: 'Engineering' },
    { title: 'Customer Service Representative', location: 'Indiana (Remote)', type: 'Full-Time', dept: 'Customer Service' },
    { title: 'Warehouse Associate', location: 'Mississippi', type: 'Full-Time', dept: 'Operations' },
];

export default function Careers() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">JOIN THE TEAM</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CAREERS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Join a team of precision tooling experts dedicated to helping manufacturers achieve new levels of productivity and quality.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { title: 'Competitive Compensation', desc: 'Base salary, performance bonuses, and comprehensive benefits including health, dental, and 401(k).' },
                        { title: 'Training & Development', desc: 'Structured onboarding, ongoing technical training, and opportunities to learn from global LEUCO experts.' },
                        { title: 'Growth Opportunities', desc: 'A growing North American operation with real paths to advancement for high performers.' },
                    ].map(({ title, desc }, i) => (
                        <div key={i} className="p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                            <Briefcase className="text-leuco-purple mb-4" size={32} />
                            <h3 className="font-black text-lg mb-3">{title}</h3>
                            <p className="text-gray-500 font-medium text-sm">{desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-10">
                    <h2 className="text-4xl font-black tracking-tighter mb-2">Current Openings</h2>
                    <div className="h-1.5 w-24 bg-leuco-purple" />
                </div>

                <div className="space-y-4 mb-16">
                    {openings.map((job, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all group">
                            <div>
                                <h3 className="font-black text-lg mb-1 group-hover:text-leuco-purple transition-colors">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                                    <span className="font-bold">{job.dept}</span>
                                    <span className="font-bold">{job.type}</span>
                                </div>
                            </div>
                            <Link to="/pages/contact-leuco" className="mt-4 md:mt-0 bg-leuco-purple text-white font-black px-6 py-3 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors text-sm shrink-0">
                                APPLY NOW <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-12 text-center">
                    <h2 className="text-2xl font-black mb-4">Don't See Your Role?</h2>
                    <p className="text-gray-500 font-medium mb-6">We're always looking for talented people. Send us your resume and we'll be in touch.</p>
                    <Link to="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                        SEND YOUR RESUME <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
