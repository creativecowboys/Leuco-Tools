'use client';

import React from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    ArrowRight,
    Wrench,
    Globe,
    Sparkles,
    MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import { useShopifyCategoryImages } from '@/hooks/useShopifyCategoryImages';

export default function Home() {
    const { products: shopifyProducts, loading: productsLoading, error: productsError } = useShopifyProducts(8);
    const { images: categoryImages } = useShopifyCategoryImages();

    const systems = [
        {
            title: 'HP+ SPIRALS',
            subtitle: 'HIGH PERFORMANCE CUTTING',
            cta: 'SHOP SPIRALS',
            image: categoryImages.spirals,
            href: '/collections/spiral-tools',
        },
        {
            title: 'CUTTER HEADS',
            subtitle: 'PRECISION SHAPING',
            cta: 'SHOP CUTTER HEADS',
            image: categoryImages.diamond,
            href: '/collections/cutter-heads',
        },
        {
            title: 'SAW BLADES',
            subtitle: 'PRECISION CUTTING',
            cta: 'SHOP SAWBLADES',
            image: categoryImages.sawBlades,
            href: '/collections/circular-saw-blades',
        },
    ];

    const [heroIndex, setHeroIndex] = React.useState(0);
    const heroSlides: Array<{
        image: string;
        eyebrow: string;
        headline: React.ReactNode;
        body: string;
        ctas: Array<{ label: string; href: string; primary: boolean; external?: boolean }>;
        extra?: React.ReactNode;
    }> = [
        {
            image: '/Leuco Hero Image 2.png',
            eyebrow: 'ALL NEW HIGHLINEXP',
            headline: <>ENGINEERED PERFORMANCE.<br /><span className="text-leuco-purple">EVERYDAY PRICE.</span></>,
            body: "Premium carbide, pro-grade tolerances, and a price that doesn't punish you for picking quality. Highline XP delivers ultra-fine finish on hardwood, softwood, and laminated panels, and is re-sharpenable 8 to 10 times — so every blade earns its keep.",
            ctas: [
                { label: 'SHOP HIGHLINE XP', href: '/collections/highlinexp-industrial-series', primary: true },
            ],
            extra: (
                <button
                    onClick={() => window.postMessage({ type: 'leuco-embed:open' }, '*')}
                    className="border-2 border-white text-white hover:bg-white hover:text-leuco-black font-black px-10 py-5 transition-all duration-300 flex items-center gap-3 group"
                >
                    <Sparkles size={18} className="group-hover:text-leuco-purple transition-colors" />
                    SEARCH WITH AI
                </button>
            ),
        },
        {
            image: '/hero-iwf-educational.jpg',
            eyebrow: 'IWF 2026 · ATLANTA',
            headline: <><span className="text-leuco-purple">TOOLING SECRETS</span><br />EVERY SHOP SHOULD KNOW.</>,
            body: "Join LEUCO at IWF 2026 for an exclusive educational session on precision tooling strategies that boost productivity and slash waste. Register now to secure your spot.",
            ctas: [
                { label: 'REGISTER FOR SESSION', href: 'https://iwf26.mapyourshow.com/8_0/sessions/session-details.cfm?scheduleid=45', primary: true, external: true },
            ],
        },
        {
            image: '/hero-iwf-visit.jpg',
            eyebrow: 'IWF 2026 · BOOTH #B5553',
            headline: <>VISIT US AT<br /><span className="text-leuco-purple">BOOTH #B5553.</span></>,
            body: "Find us on the IWF 2026 show floor in Hall B. Our team will be on hand to demonstrate the latest LEUCO tooling innovations and connect with you face-to-face.",
            ctas: [
                { label: 'VIEW BOOTH ON MAP', href: 'https://iwf26.mapyourshow.com/8_0/floorplan/index.cfm?hallID=B&selectedBooth=B5553', primary: true, external: true },
            ],
        },
        {
            image: '/hero-mass-timber.jpg',
            eyebrow: 'IWF 2026 · MASS TIMBER PAVILION',
            headline: <>MASS TIMBER<br /><span className="text-leuco-purple">PAVILION #A9828.</span></>,
            body: "LEUCO is proud to be part of the Mass Timber Pavilion at IWF 2026. Visit us at Booth A9828 to explore our diamond tooling solutions purpose-built for CLT, glulam, and engineered wood.",
            ctas: [
                { label: 'VIEW PAVILION MAP', href: 'https://iwf26.mapyourshow.com/8_0/floorplan/index.cfm?hallID=A&selectedBooth=A9828', primary: true, external: true },
            ],
        },
    ];

    // Auto-advance slider
    React.useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex(i => (i + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentSlide = heroSlides[heroIndex];

    return (
        <>
            {/* Hero Section — rotating slider */}
            <section className="relative h-[85vh] bg-leuco-black overflow-hidden">
                {/* Background images — crossfade */}
                {heroSlides.map((slide, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: i === heroIndex ? 1 : 0, zIndex: 0 }}
                    >
                        <img
                            src={slide.image}
                            className="w-full h-full object-cover opacity-50"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-leuco-black via-leuco-black/60 to-transparent" />
                    </div>
                ))}

                {/* Content */}
                <div className="relative h-full max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col justify-center items-start" style={{ zIndex: 1 }}>
                    <motion.div
                        key={heroIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">
                            {currentSlide.eyebrow}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
                            {currentSlide.headline}
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 font-medium max-w-lg">
                            {currentSlide.body}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {currentSlide.ctas.map((cta, ci) => (
                                cta.external ? (
                                    <a
                                        key={ci}
                                        href={cta.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cta.primary
                                            ? "bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all duration-300 flex items-center gap-3 group"
                                            : "border-2 border-white text-white hover:bg-white hover:text-leuco-black font-black px-10 py-5 transition-all duration-300 flex items-center gap-3 group"
                                        }
                                    >
                                        {cta.label} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </a>
                                ) : (
                                    <Link
                                        key={ci}
                                        href={cta.href}
                                        className={cta.primary
                                            ? "bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all duration-300 flex items-center gap-3 group"
                                            : "border-2 border-white text-white hover:bg-white hover:text-leuco-black font-black px-10 py-5 transition-all duration-300 flex items-center gap-3 group"
                                        }
                                    >
                                        {cta.label} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                )
                            ))}
                            {currentSlide.extra}
                        </div>
                    </motion.div>
                </div>

                {/* Slide Dots */}
                <div className="absolute bottom-24 right-6 md:right-12 flex gap-3 z-10">
                    {heroSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setHeroIndex(i)}
                            className="transition-all duration-300"
                            style={{
                                width: i === heroIndex ? '2rem' : '0.5rem',
                                height: '0.5rem',
                                background: i === heroIndex ? '#a9218d' : 'rgba(255,255,255,0.4)',
                                borderRadius: '999px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Hero Stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 hidden md:block" style={{ zIndex: 1 }}>
                    <div className="max-w-[1440px] mx-auto grid grid-cols-4 divide-x divide-white/10">
                        {[
                            { label: '40+ YEARS', value: 'SERVING NORTH AMERICA', icon: Globe },
                            { label: '6', value: 'NORTH AMERICA SERVICE CENTERS', icon: MapPin },
                            { label: '1 WEEK', value: 'CARBIDE TURNAROUND', icon: Wrench },
                            { label: '2 WEEKS', value: 'DIAMOND TURNAROUND', icon: Wrench },
                        ].map((stat, i) => (
                            <div key={i} className="p-8 flex items-center gap-4">
                                <stat.icon className="text-leuco-purple" size={32} />
                                <div>
                                    <div className="text-2xl font-black text-white">{stat.label}</div>
                                    <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Systems Grid */}
            <section className="py-24 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">Shop Tooling</h2>
                        <div className="h-1.5 w-24 bg-leuco-purple" />
                    </div>
                    <Link href="/pages/tools" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple transition-colors">
                        VIEW ALL TOOLS <ChevronRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {systems.map((system, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group relative h-[500px] overflow-hidden cursor-pointer bg-gray-100"
                        >
                            <Link href={system.href} className="block w-full h-full">
                                <img
                                    src={system.image ?? undefined}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={system.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-leuco-black/90 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 p-10">
                                    <div className="text-leuco-purple font-black text-xs tracking-widest mb-2">{system.subtitle}</div>
                                    <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter leading-none">{system.title}</h3>
                                    <span className="bg-white text-leuco-black font-black text-xs px-6 py-3 group-hover:bg-leuco-purple group-hover:text-white transition-colors inline-block">
                                        {system.cta}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">Featured Tooling</h2>
                            <div className="h-1.5 w-24 bg-leuco-purple" />
                        </div>
                        <Link
                            href="/pages/tools"
                            className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple transition-colors"
                        >
                            SHOP ALL <ChevronRight size={20} />
                        </Link>
                    </div>

                    {productsError && (
                        <div className="text-center py-16">
                            <p className="text-red-600 font-bold mb-2">Unable to load products</p>
                            <p className="text-gray-400 text-sm">{productsError}</p>
                        </div>
                    )}

                    {productsLoading && !productsError && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-white p-6 border border-gray-100 animate-pulse">
                                    <div className="aspect-square bg-gray-200 mb-6 rounded" />
                                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-6" />
                                    <div className="flex justify-between">
                                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!productsLoading && !productsError && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {shopifyProducts.map((product) => {
                                const image = product.images.edges[0]?.node;
                                const price = product.priceRange.minVariantPrice;
                                const formattedPrice = price
                                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currencyCode }).format(parseFloat(price.amount))
                                    : null;
                                return (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.handle}`}
                                        className="bg-white p-6 group cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-leuco-purple/20 block"
                                    >
                                        <div className="relative aspect-square mb-6 overflow-hidden bg-gray-50">
                                            {image ? (
                                                <img
                                                    src={image.url}
                                                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                                    alt={image.altText ?? product.title}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Wrench size={48} />
                                                </div>
                                            )}
                                        </div>
                                        {product.productType && (
                                            <div className="text-[10px] font-black text-leuco-purple tracking-widest mb-1 uppercase">
                                                {product.productType}
                                            </div>
                                        )}
                                        <h4 className="text-lg font-black leading-tight mb-4 group-hover:text-leuco-purple transition-colors">
                                            {product.title}
                                        </h4>
                                        <div className="flex justify-between items-center">
                                            {formattedPrice && <span className="text-xl font-black">{formattedPrice}</span>}
                                            <span className="text-xs font-black flex items-center gap-1 hover:text-leuco-purple ml-auto">
                                                VIEW DETAILS <ChevronRight size={14} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Service & Education Banner */}
            <section className="py-24 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-leuco-black p-12 relative overflow-hidden group">
                        <div className="relative z-10">
                            <Wrench className="text-leuco-purple mb-6" size={48} />
                            <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Re-Sharpening Service</h3>
                            <p className="text-gray-400 mb-8 font-medium max-w-md">
                                Our world-class service centers restore your tools to original manufacturer specifications using advanced CNC grinding technology.
                            </p>
                            <Link
                                href="/pages/sharpening-services"
                                className="bg-leuco-purple text-white font-black px-8 py-4 flex items-center gap-2 group-hover:bg-white group-hover:text-leuco-purple transition-all w-fit"
                            >
                                BOOK SERVICE <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    </div>

                    <div className="bg-leuco-purple p-12 relative overflow-hidden group">
                        <div className="relative z-10">
                            <Globe className="text-white mb-6" size={48} />
                            <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Leuco Solutions</h3>
                            <p className="text-white/80 mb-8 font-medium max-w-md">
                                Master your craft with our technical guides and innovations. From basic tooling knowledge to advanced CNC optimization.
                            </p>
                            <Link
                                href="/blogs/leuco-solutions"
                                className="bg-white text-leuco-purple font-black px-8 py-4 flex items-center gap-2 group-hover:bg-leuco-black group-hover:text-white transition-all w-fit"
                            >
                                EXPLORE SOLUTIONS <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full -mr-32 -mb-32 blur-3xl" />
                    </div>
                </div>
            </section>
        </>
    );
}
