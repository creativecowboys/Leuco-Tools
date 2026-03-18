import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    MapPin,
    User,
    ShoppingCart,
    ChevronRight,
    Menu,
    X,
    Globe,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    Twitter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LeucoLogo = () => (
    <img
        src="/leuco-logo.png"
        alt="LEUCO"
        className="h-10 w-auto object-contain"
    />
);

const navLinks = [
    {
        name: 'TOOLS',
        href: '/pages/tools',
        items: [
            { label: 'All New – HighlineXP', href: '/collections/highlinexp-industrial-series' },
            { label: 'Circular Saws', href: '/collections/circular-saw-blades' },
            { label: 'Cutter Heads', href: '/collections/cutter-heads' },
            { label: 'Spirals & Drills', href: '/collections/spiral-tools' },
            { label: 'Knives & Inserts', href: '/collections/knives-and-inserts' },
            { label: 'Clamping Systems', href: '/collections/clamping-systems' },
            { label: 'Parts & Accessories', href: '/collections/parts-and-accessories' },
        ],
    },
    {
        name: 'SERVICES',
        href: '/pages/services',
        items: [
            { label: 'Sharpening', href: '/pages/sharpening-services' },
            { label: 'Engineering', href: '/pages/leuco-engineering' },
            { label: 'Custom Tooling', href: '/pages/custom-tooling' },
        ],
    },
    {
        name: 'SOLUTIONS',
        href: '/blogs/leuco-solutions',
        items: [
            { label: 'Tooling Innovations', href: '/blogs/leuco-solutions/leuco-tooling-innovations' },
            { label: 'Materials Solutions', href: '/blogs/leuco-solutions/leuco-materials-solutions' },
            { label: 'Tooling Solutions', href: '/blogs/leuco-solutions/leuco-tooling-solutions' },
        ],
    },
    {
        name: 'ABOUT',
        href: '/pages/about-leuco',
        items: [
            { label: 'Catalog', href: '/pages/catalogs' },
            { label: 'News', href: '/blogs/leuco-news' },
            { label: 'Careers', href: '/pages/leuco-careers' },
            { label: 'Georgia', href: '/pages/georgia' },
            { label: 'Mississippi', href: '/pages/mississippi' },
            { label: 'Michigan', href: '/pages/michigan' },
            { label: 'California', href: '/pages/california' },
            { label: 'Indiana', href: '/pages/indiana' },
            { label: 'Canada', href: '/pages/canada' },
        ],
    },
    {
        name: 'CONTACT',
        href: '/pages/contact-leuco',
        items: [],
    },
];

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Utility Nav */}
            <div className="bg-leuco-black text-white text-[10px] font-bold tracking-widest py-2 px-4 md:px-12 flex justify-between items-center border-b border-white/10">
                <div className="flex gap-6">
                    <Link to="/pages/tools" className="hover:text-leuco-purple transition-colors">WHERE TO BUY</Link>
                    <Link to="/pages/sharpening-services" className="hover:text-leuco-purple transition-colors">RE-SHARPENING</Link>
                    <Link to="/blogs/leuco-solutions" className="hover:text-leuco-purple transition-colors">EDUCATION</Link>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-leuco-purple transition-colors">
                        <Globe size={12} />
                        <span>EN / US</span>
                    </div>
                    <Link to="/pages/contact-leuco" className="hover:text-leuco-purple transition-colors">CONTACT</Link>
                </div>
            </div>

            {/* Main Nav */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-white py-4'} border-b border-gray-100`}>
                <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <Link to="/"><LeucoLogo /></Link>
                        <div className="hidden lg:flex gap-8">
                            {navLinks.map((link) => (
                                <div key={link.name} className="group relative py-4">
                                    <Link
                                        to={link.href}
                                        className="text-sm font-extrabold tracking-tight hover:text-leuco-purple transition-colors flex items-center gap-1"
                                    >
                                        {link.name}
                                    </Link>
                                    {link.items.length > 0 && (
                                        <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border-t-2 border-leuco-purple opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4 z-50">
                                            {link.items.map(item => (
                                                <Link
                                                    key={item.href}
                                                    to={item.href}
                                                    className="block px-6 py-2 text-xs font-bold hover:bg-gray-50 hover:text-leuco-purple"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-sm px-3 py-2 w-64">
                            <button type="submit"><Search size={18} className="text-gray-400" /></button>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search tools, parts..."
                                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 font-medium outline-none"
                            />
                        </form>
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <User size={22} />
                            </button>
                            <a href="https://shopleuco.com/cart" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                <ShoppingCart size={22} />
                                <span className="absolute top-0 right-0 bg-leuco-purple text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                            </a>
                            <button
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed inset-0 z-[60] bg-white lg:hidden overflow-y-auto"
                    >
                        <div className="p-6 flex justify-between items-center border-b">
                            <Link to="/" onClick={() => setIsMenuOpen(false)}><LeucoLogo /></Link>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X size={28} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {navLinks.map(link => (
                                <div key={link.name} className="space-y-3">
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xl font-black text-leuco-purple block"
                                    >
                                        {link.name}
                                    </Link>
                                    {link.items.length > 0 && (
                                        <div className="grid grid-cols-2 gap-3 pl-2">
                                            {link.items.map(item => (
                                                <Link
                                                    key={item.href}
                                                    to={item.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="text-sm font-bold text-gray-600 hover:text-leuco-purple"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-leuco-black text-white pt-24 pb-12 border-t border-white/10">
                <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-8">
                            <Link to="/"><LeucoLogo /></Link>
                            <p className="text-gray-400 font-medium max-w-sm">
                                North America's highest quality precision tooling and re-sharpening service provider for over 40 years.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { Icon: Facebook, href: 'https://www.facebook.com/leucotool' },
                                    { Icon: Instagram, href: 'https://www.instagram.com/leucotool' },
                                    { Icon: Youtube, href: 'https://www.youtube.com/@leucotoolcorporation' },
                                    { Icon: Linkedin, href: 'https://www.linkedin.com/company/leuco-tool' },
                                ].map(({ Icon, href }, i) => (
                                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-leuco-purple transition-colors">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Phone size={18} className="text-leuco-purple" />
                                    <span className="font-bold">+1 (800) 433-0771</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail size={18} className="text-leuco-purple" />
                                    <span className="font-bold">info@leuco.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <MapPin size={18} className="text-leuco-purple" />
                                    <span className="font-bold">Horicon, Wisconsin, USA</span>
                                </div>
                            </div>
                        </div>

                        {[
                            {
                                title: 'TOOLS',
                                links: [
                                    { label: 'HighlineXP', href: '/collections/highlinexp-industrial-series' },
                                    { label: 'Circular Saws', href: '/collections/circular-saw-blades' },
                                    { label: 'Cutter Heads', href: '/collections/cutter-heads' },
                                    { label: 'Spirals & Drills', href: '/collections/spiral-tools' },
                                    { label: 'Custom Tooling', href: '/pages/custom-tooling' },
                                ],
                            },
                            {
                                title: 'SUPPORT',
                                links: [
                                    { label: 'Contact Us', href: '/pages/contact-leuco' },
                                    { label: 'Search', href: '/search' },
                                    { label: 'Safety', href: '/pages/safety' },
                                    { label: 'Resharpening', href: '/pages/sharpening-services' },
                                    { label: 'Resharpening FAQ', href: '/pages/tool-resharpening-faq' },
                                ],
                            },
                            {
                                title: 'COMPANY',
                                links: [
                                    { label: 'About LEUCO', href: '/pages/about-leuco' },
                                    { label: 'Careers', href: '/pages/leuco-careers' },
                                    { label: 'News', href: '/blogs/leuco-news' },
                                    { label: 'Catalogs', href: '/pages/catalogs' },
                                    { label: 'Locations', href: '/pages/about-leuco' },
                                ],
                            },
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="text-sm font-black tracking-widest mb-8 uppercase text-leuco-purple">{col.title}</h4>
                                <ul className="space-y-4">
                                    {col.links.map(link => (
                                        <li key={link.href}>
                                            <Link to={link.href} className="text-gray-400 font-bold text-sm hover:text-white transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-gray-500 text-xs font-bold">
                            © 2026 LEUCO TOOL CORPORATION. ALL RIGHTS RESERVED.
                        </div>
                        <div className="flex gap-8 text-gray-500 text-xs font-bold">
                            <Link to="/pages/privacy-policy" className="hover:text-white">PRIVACY POLICY</Link>
                            <Link to="/pages/terms-of-use" className="hover:text-white">TERMS OF USE</Link>
                            <Link to="/search" className="hover:text-white">SEARCH</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
