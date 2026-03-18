import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Globe } from 'lucide-react';

export default function About() {
    const locations = [
        { name: 'Georgia', href: '/pages/georgia' },
        { name: 'Mississippi', href: '/pages/mississippi' },
        { name: 'Michigan', href: '/pages/michigan' },
        { name: 'California', href: '/pages/california' },
        { name: 'Indiana', href: '/pages/indiana' },
        { name: 'Canada', href: '/pages/canada' },
    ];

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">COMPANY</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">ABOUT LEUCO</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        For over 75 years, LEUCO has been the world's leading manufacturer of precision tooling systems for the woodworking, furniture, and composite industries.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-6">Our Story</h2>
                        <p className="text-gray-600 font-medium mb-4">
                            Founded in 1948 in Horb am Neckar, Germany, LEUCO has grown from a small local tool manufacturer into a global precision tooling leader with operations across North America, Europe, and Asia.
                        </p>
                        <p className="text-gray-600 font-medium mb-4">
                            LEUCO Tool Corporation, the North American subsidiary, has been serving customers in the US and Canada for over 40 years—delivering world-class tooling and service from our network of regional service centers.
                        </p>
                        <p className="text-gray-600 font-medium">
                            Our mission is simple: help our customers make better cuts, run longer between service intervals, and achieve superior surface quality—every time.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { value: '75+', label: 'Years in Business' },
                            { value: '2,500+', label: 'Employees Worldwide' },
                            { value: '80+', label: 'Global Locations' },
                            { value: '6', label: 'US Service Centers' },
                        ].map((s, i) => (
                            <div key={i} className="bg-leuco-black text-white p-8 text-center">
                                <div className="text-4xl font-black text-leuco-purple mb-2">{s.value}</div>
                                <div className="text-xs font-black tracking-widest text-gray-400">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Locations */}
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter mb-2">Our Locations</h2>
                            <div className="h-1.5 w-24 bg-leuco-purple" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {locations.map((loc, i) => (
                            <Link key={i} to={loc.href} className="group flex items-center gap-3 p-6 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                                <MapPin className="text-leuco-purple shrink-0" size={20} />
                                <span className="font-black group-hover:text-leuco-purple transition-colors">{loc.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link to="/pages/leuco-careers" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                        VIEW CAREERS <ArrowRight size={18} />
                    </Link>
                    <Link to="/pages/catalogs" className="border-2 border-leuco-black text-leuco-black font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black hover:text-white transition-colors">
                        DOWNLOAD CATALOG <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
