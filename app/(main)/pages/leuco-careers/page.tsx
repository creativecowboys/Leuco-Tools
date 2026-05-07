import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Leuco Careers - LEUCO Tool Corporation',
    description: 'At Leuco Tool Corporation, our vision is to be the highest quality cutting tool and cutting tool service provider. Join our team.',
};

export default function CareersPage() {
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

                <div className="bg-gray-50 p-16 text-center mb-16">
                    <div className="text-5xl mb-6">📋</div>
                    <h3 className="text-2xl font-black mb-4">No Current Openings</h3>
                    <p className="text-gray-500 font-medium max-w-lg mx-auto mb-8">
                        We don&apos;t have any posted positions at the moment, but we&apos;re always interested in connecting with talented people. Send us your resume and we&apos;ll reach out when a role opens up.
                    </p>
                    <Link href="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                        SEND YOUR RESUME <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
