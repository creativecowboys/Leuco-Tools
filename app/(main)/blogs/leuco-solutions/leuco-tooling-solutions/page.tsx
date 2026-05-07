import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Tooling Solutions - LEUCO Tool Corporation',
    description: 'With LEUCO Tooling Solutions, you will receive longer edge life, better cut quality, low-noise, and a team of tooling experts on hand.',
};

const solutions = [
    {
        title: 'Spirals & Drill Bit Solutions',
        slug: 'spirals-drill-bit-solutions',
        desc: 'Leading the Way in Precision and Innovation — LEUCO\'s Spirals & Drill Bit Solutions Bring Unmatched Quality, Enhance Your Workmanship, and Maximize Total Value.',
        icon: '🌀',
    },
    {
        title: 'Knives & Inserts Cutting Solutions',
        slug: 'knives-inserts-cutting-solutions',
        desc: "LEUCO's Latest Knives & Inserts Cutting Solutions — Unleashing Excellence in Woodworking through Cutting-Edge Tooling Innovations.",
        icon: '🔪',
    },
    {
        title: 'LEUCO HeatSync',
        slug: 'leuco-heatsync',
        desc: 'Introducing the All-New HeatSync Machine: Revolutionizing Tool Holding & Shrink-Fit Technology. Precision, efficiency, and consistency are non-negotiable.',
        icon: '🔥',
    },
    {
        title: 'Circular Saw Blade Solutions',
        slug: 'circular-saw-blade-solutions',
        desc: 'Choosing LEUCO Means Choosing Quality, Sustainability, And Innovation. It Starts with Industry-Leading Circular Saw Blade Solutions and Ends with Your Success.',
        icon: '⭕',
    },
];

export default function ToolingSolutionsPage() {
    return (
        <div>
            {/* Hero */}
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">APPLICATIONS</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">TOOLING SOLUTIONS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        With LEUCO Tooling Solutions, you will receive longer edge life, better cut quality, low-noise, and a team of tooling experts on hand. Our Tooling Solutions provide you with a driving business saving you time and money as we stay ahead of your production needs before you even think about it.
                    </p>
                </div>
            </div>

            {/* Solutions Grid */}
            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="mb-10">
                    <h2 className="text-4xl font-black tracking-tighter mb-2">Solutions by Tool Type</h2>
                    <div className="h-1.5 w-24 bg-leuco-purple" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {solutions.map((sol, i) => (
                        <Link
                            key={i}
                            href={`/blogs/tooling-solutions/${sol.slug}`}
                            className="group p-10 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-xl transition-all"
                        >
                            <div className="text-4xl mb-4">{sol.icon}</div>
                            <h3 className="font-black text-xl mb-3 group-hover:text-leuco-purple transition-colors flex items-center gap-2">
                                {sol.title}
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </h3>
                            <p className="text-gray-500 font-medium leading-relaxed">{sol.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* Body copy from shopleuco */}
                <div className="border-t border-gray-100 pt-16 mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-black tracking-tighter mb-6">Industrial Tooling Excellence</h2>
                        <p className="text-gray-600 font-medium leading-relaxed text-lg mb-4">
                            In today&apos;s highly competitive manufacturing industry, having the proper equipment is paramount to thriving. At LEUCO, we are proud to offer groundbreaking tooling innovation that boosts productivity and delivers outstanding results.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-lg mb-4">
                            Our devotion to excellence and quality means that your woodworking and metalworking needs are always met with unparalleled precision. When you partner with us, you receive access to cutting-edge technology designed to help your business succeed.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-lg">
                            From extended tool life to minimized sound pollution during production, we take pride in delivering the highest standards of innovation to our clients. Choose LEUCO tooling solutions and experience the difference that comes with industrial tooling excellence.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-leuco-black p-12 md:p-16 text-center">
                    <h2 className="text-3xl font-black text-white mb-4">Talk to a Tooling Specialist</h2>
                    <p className="text-gray-300 font-medium max-w-xl mx-auto mb-8">
                        Our team of expert machinists and application engineers are ready to help you find the right solution for your production needs.
                    </p>
                    <Link href="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors">
                        CONTACT A SPECIALIST <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
