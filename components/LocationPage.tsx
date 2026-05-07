import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface LocationPageProps {
    state: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    description: string;
    image?: string;  // optional facility photo, relative to /public
}

export default function LocationPage({ state, city, address, phone, email, hours, description, image }: LocationPageProps) {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">SERVICE CENTER</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">{state.toUpperCase()}</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">{description}</p>
                </div>
            </div>

            {/* Facility photo */}
            {image && (
                <div className="relative w-full h-64 md:h-96 overflow-hidden">
                    <Image
                        src={image}
                        alt={`LEUCO ${state} facility`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="max-w-2xl">
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
            </div>
        </div>
    );
}
