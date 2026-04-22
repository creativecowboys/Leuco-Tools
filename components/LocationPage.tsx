import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface LocationPageProps {
    state: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    description: string;
}

export default function LocationPage({ state, city, address, phone, email, hours, description }: LocationPageProps) {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">SERVICE CENTER</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">{state.toUpperCase()}</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">{description}</p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter mb-8">{city}, {state}</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-leuco-purple shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="font-black mb-1">Address</div>
                                    <div className="text-gray-600 font-medium">{address}</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="text-leuco-purple shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="font-black mb-1">Phone</div>
                                    <a href={`tel:${phone}`} className="text-gray-600 font-medium hover:text-leuco-purple transition-colors">{phone}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="text-leuco-purple shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="font-black mb-1">Email</div>
                                    <a href={`mailto:${email}`} className="text-gray-600 font-medium hover:text-leuco-purple transition-colors">{email}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="text-leuco-purple shrink-0 mt-1" size={22} />
                                <div>
                                    <div className="font-black mb-1">Hours</div>
                                    <div className="text-gray-600 font-medium">{hours}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link href="/pages/sharpening-services" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                                SCHEDULE SERVICE <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-10">
                        <h3 className="text-2xl font-black mb-6">Services Available</h3>
                        <ul className="space-y-3">
                            {['Tool Resharpening', 'Saw Blade Sharpening', 'Cutter Head Service', 'Tool Inspection & Repair', 'Custom Tooling Consultation', 'Product Sales & Support'].map((s, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-gray-700">
                                    <div className="w-2 h-2 bg-leuco-purple rounded-full shrink-0" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
