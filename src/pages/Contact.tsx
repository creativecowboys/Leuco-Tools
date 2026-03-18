import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const locations = [
    { name: 'Georgia', city: 'Atlanta', phone: '+1 (800) 433-0771', href: '/pages/georgia' },
    { name: 'Mississippi', city: 'Tupelo', phone: '+1 (800) 433-0771', href: '/pages/mississippi' },
    { name: 'Michigan', city: 'Grand Rapids', phone: '+1 (800) 433-0771', href: '/pages/michigan' },
    { name: 'California', city: 'Los Angeles', phone: '+1 (800) 433-0771', href: '/pages/california' },
    { name: 'Indiana', city: 'Indianapolis', phone: '+1 (800) 433-0771', href: '/pages/indiana' },
    { name: 'Canada', city: 'Toronto, ON', phone: '+1 (905) 555-0180', href: '/pages/canada' },
];

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">GET IN TOUCH</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CONTACT</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Reach out to LEUCO for product inquiries, service scheduling, technical support, or custom tooling projects.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter mb-8">Send Us a Message</h2>
                        {submitted ? (
                            <div className="bg-leuco-purple/10 border border-leuco-purple p-8 text-center">
                                <div className="text-leuco-purple font-black text-xl mb-2">Thank You!</div>
                                <p className="text-gray-600 font-medium">We've received your message and will be in touch within 1 business day.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black tracking-widest mb-2 uppercase">Name *</label>
                                        <input required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full border border-gray-200 p-4 font-medium focus:outline-none focus:border-leuco-purple transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black tracking-widest mb-2 uppercase">Company</label>
                                        <input value={formState.company} onChange={e => setFormState({ ...formState, company: e.target.value })}
                                            className="w-full border border-gray-200 p-4 font-medium focus:outline-none focus:border-leuco-purple transition-colors" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black tracking-widest mb-2 uppercase">Email *</label>
                                        <input required type="email" value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })}
                                            className="w-full border border-gray-200 p-4 font-medium focus:outline-none focus:border-leuco-purple transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black tracking-widest mb-2 uppercase">Phone</label>
                                        <input type="tel" value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                            className="w-full border border-gray-200 p-4 font-medium focus:outline-none focus:border-leuco-purple transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black tracking-widest mb-2 uppercase">Subject</label>
                                    <select value={formState.subject} onChange={e => setFormState({ ...formState, subject: e.target.value })}
                                        className="w-full border border-gray-200 p-4 font-medium focus:outline-none focus:border-leuco-purple transition-colors bg-white">
                                        <option value="">Select a topic...</option>
                                        <option>Product Inquiry</option>
                                        <option>Resharpening Service</option>
                                        <option>Custom Tooling</option>
                                        <option>Technical Support</option>
                                        <option>General Inquiry</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black tracking-widest mb-2 uppercase">Message *</label>
                                    <textarea required rows={5} value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full border border-gray-200 p-4 font-medium focus:outline-none focus:border-leuco-purple transition-colors resize-none" />
                                </div>
                                <button type="submit" className="bg-leuco-purple text-white font-black px-10 py-4 flex items-center gap-2 hover:bg-leuco-black transition-colors">
                                    SEND MESSAGE <ArrowRight size={18} />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter mb-8">Our Locations</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {locations.map((loc, i) => (
                                <Link key={i} to={loc.href} className="group p-6 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                                    <div className="font-black group-hover:text-leuco-purple transition-colors mb-1">{loc.name}</div>
                                    <div className="text-gray-500 text-sm font-medium mb-2">{loc.city}</div>
                                    <div className="text-xs font-bold text-gray-400">{loc.phone}</div>
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone className="text-leuco-purple" size={20} />
                                <div>
                                    <div className="text-xs font-black tracking-widest text-gray-400 mb-1">TOLL FREE</div>
                                    <a href="tel:+18004330771" className="font-black hover:text-leuco-purple transition-colors">+1 (800) 433-0771</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-leuco-purple" size={20} />
                                <div>
                                    <div className="text-xs font-black tracking-widest text-gray-400 mb-1">EMAIL</div>
                                    <a href="mailto:info@leuco.com" className="font-black hover:text-leuco-purple transition-colors">info@leuco.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="text-leuco-purple shrink-0" size={20} />
                                <div>
                                    <div className="text-xs font-black tracking-widest text-gray-400 mb-1">BUSINESS HOURS</div>
                                    <div className="font-bold text-gray-700 text-sm">Monday – Friday, 7:00 AM – 5:00 PM (local)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
