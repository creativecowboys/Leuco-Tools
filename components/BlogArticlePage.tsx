import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Phone, Play } from 'lucide-react';
import type { BlogArticle, ProductCard, InterstitialBanner, ComparisonTable, FeaturedProduct } from '@/lib/blog-articles';

interface BlogArticlePageProps {
    article: BlogArticle;
    backHref: string;
    backLabel: string;
    category: string;
}

/** Parse inline [text](url) markdown links → JSX */
function RichText({ text }: { text: string }) {
    const parts: React.ReactNode[] = [];
    const re = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let last = 0, m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        parts.push(
            <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer"
                className="text-leuco-purple font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                {m[1]}
            </a>
        );
        last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}

/** Is this paragraph a standalone [label](url) CTA? */
function asCtaLink(para: string): { label: string; href: string } | null {
    const m = para.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    return m ? { label: m[1], href: m[2] } : null;
}

/** Alternating 2-col product showcase card */
function ProductShowcaseCard({ card, index }: { card: ProductCard; index: number }) {
    const isReversed = card.imageRight === true;

    // Normalise Vimeo short URLs → player embed URLs
    const embedUrl = card.videoUrl
        ? (card.videoUrl.includes('vimeo.com/') && !card.videoUrl.includes('player.vimeo.com')
            ? card.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/').split('?')[0] + '?autoplay=0&title=0&byline=0&portrait=0'
            : card.videoUrl)
        : null;

    return (
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch gap-0 border-t border-gray-100`}>
            {/* Media panel — video or image */}
            <div className="lg:w-[45%] shrink-0 bg-gray-900 overflow-hidden">
                {embedUrl ? (
                    <div className="relative w-full h-[320px] lg:h-full min-h-[320px]">
                        <iframe
                            src={embedUrl}
                            title={card.heading}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>
                ) : (
                    <div className="relative w-full h-[320px] lg:h-full min-h-[320px] bg-gray-50">
                        <Image
                            src={card.image.src}
                            alt={card.image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 45vw"
                        />
                    </div>
                )}
            </div>

            {/* Text panel */}
            <div className="flex-1 flex flex-col justify-center px-8 py-10 lg:px-14 lg:py-16">
                {/* Number badge */}
                <span className="inline-block text-[11px] font-black text-leuco-purple tracking-[0.18em] uppercase mb-4">
                    {String(index + 1).padStart(2, '0')} / {card.heading}
                </span>

                <h3 className="text-2xl lg:text-3xl font-black text-leuco-black tracking-tight leading-tight mb-4">
                    {card.heading}
                </h3>

                <p className="text-gray-600 text-base lg:text-[17px] leading-relaxed mb-8">
                    {card.description}
                </p>

                <a
                    href={card.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-leuco-black text-white text-[11px] font-black px-7 py-4 tracking-widest uppercase hover:bg-leuco-purple transition-colors self-start"
                >
                    {card.ctaLabel} <ArrowRight size={13} />
                </a>
            </div>
        </div>
    );
}


/** Full-bleed interstitial CTA banner */
function InterstitialBannerBlock({ banner, articleTitle }: { banner: InterstitialBanner; articleTitle: string }) {
    return (
        <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
            {/* Background */}
            {banner.backgroundImage && (
                <Image
                    src={banner.backgroundImage}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    aria-hidden
                />
            )}
            {/* Overlay */}
            <div className={`absolute inset-0 ${banner.style === 'purple'
                ? 'bg-leuco-purple/90'
                : 'bg-leuco-black/88'
            }`} />

            {/* Content */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-24 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl">
                    <p className="text-white/60 text-[10px] font-black tracking-[0.2em] uppercase mb-4">
                        {articleTitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight mb-4">
                        {banner.headline}
                    </h2>
                    {banner.subtext && (
                        <p className="text-white/75 text-lg leading-relaxed">
                            {banner.subtext}
                        </p>
                    )}
                </div>
                <a
                    href={banner.ctaHref ?? '/pages/contact-leuco'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-leuco-purple text-[11px] font-black px-8 py-4 tracking-widest uppercase hover:bg-leuco-black hover:text-white transition-colors shrink-0 whitespace-nowrap"
                >
                    {banner.ctaLabel ?? 'SHOP NOW'} <ArrowRight size={14} />
                </a>
            </div>
        </div>
    );
}

export default function BlogArticlePage({ article, backHref, backLabel, category }: BlogArticlePageProps) {
    const hasImages = article.images && article.images.length > 0;
    // heroImage: prefer the explicit override, then fall back to first image in array
    const heroImage = article.heroImage ?? (hasImages ? article.images[0] : null);
    const sidebarImages = hasImages ? (article.heroImage ? article.images : article.images.slice(1)) : [];

    const hasProductCards = article.productCards && article.productCards.length > 0;

    // Clean intro — strip any raw markdown links from the display text
    const cleanIntro = article.intro
        .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
        .split('\n')[0]; // just first paragraph

    return (
        <article className="bg-white">

            {/* ══════════════════════════════════════════
                HERO — dark title panel
            ══════════════════════════════════════════ */}
            <div className="bg-leuco-black">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-10 pb-14">
                    <Link href={backHref}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-200 text-xs font-black tracking-widest uppercase mb-10 transition-colors">
                        <ArrowLeft size={11} /> {backLabel}
                    </Link>

                    <div className="max-w-3xl">
                        <span className="inline-block bg-leuco-purple text-white text-[10px] font-black px-3 py-1 mb-5 tracking-[0.15em] uppercase">
                            {category}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-white tracking-tighter leading-[0.93] mb-7">
                            {article.title}
                        </h1>
                        {cleanIntro && (
                            <p className="text-gray-300 text-lg leading-relaxed font-normal max-w-2xl">
                                {cleanIntro}
                            </p>
                        )}

                        {/* Inline hero CTA for product showcase articles */}
                        {hasProductCards && article.heroCta && (
                            <a
                                href={article.heroCta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 mt-8 bg-leuco-purple text-white text-[11px] font-black px-7 py-4 tracking-widest uppercase hover:bg-white hover:text-leuco-purple transition-colors"
                            >
                                {article.heroCta.label} <ArrowRight size={13} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                ARTICLE BODY (2-col layout)
            ══════════════════════════════════════════ */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    {/* ── Main content ── */}
                    <div className={`flex-1 min-w-0 ${hasProductCards ? 'max-w-[780px]' : 'max-w-[660px]'}`}>

                        {/* Section heading label */}
                        {hasProductCards && (
                            <p className="text-[10px] font-black text-leuco-purple tracking-[0.18em] uppercase mb-8">
                                {article.featuresSectionLabel ?? 'WHY CHOOSE THIS SYSTEM'}
                            </p>
                        )}

                        {/* Feature grid for product showcase articles */}
                        {hasProductCards ? (
                            <div className="grid sm:grid-cols-2 gap-6">
                                {article.sections.map((section, i) => (
                                    <div key={i} className="p-6 border border-gray-100 hover:border-leuco-purple/30 transition-colors group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="w-7 h-7 rounded-full bg-leuco-purple/10 text-leuco-purple text-[10px] font-black flex items-center justify-center shrink-0 group-hover:bg-leuco-purple group-hover:text-white transition-colors">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            {section.heading && (
                                                <h2 className="text-sm font-black text-leuco-black tracking-tight leading-snug">
                                                    {section.heading}
                                                </h2>
                                            )}
                                        </div>
                                        {section.paragraphs.map((para, j) => (
                                            <p key={j} className="text-gray-600 text-sm leading-relaxed">
                                                <RichText text={para} />
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Standard text sections for non-product articles */
                            article.sections.map((section, i) => {
                                const sectionCta = section.paragraphs.length === 1 && !section.heading
                                    ? asCtaLink(section.paragraphs[0])
                                    : null;

                                return (
                                    <section key={i} className="mb-12">
                                        {section.heading && (
                                            <h2 className="text-xl md:text-2xl font-black tracking-tight text-leuco-black mb-5 leading-snug flex items-start gap-3">
                                                <span className="w-[3px] shrink-0 self-stretch bg-leuco-purple rounded-full mt-1" />
                                                {section.heading}
                                            </h2>
                                        )}

                                        {sectionCta ? (
                                            <a href={sectionCta.href} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-3 bg-leuco-purple text-white text-xs font-black px-6 py-3.5 tracking-widest uppercase hover:bg-leuco-black transition-colors">
                                                {sectionCta.label} <ArrowRight size={14} />
                                            </a>
                                        ) : (
                                            <div className="space-y-4">
                                                {section.paragraphs.map((para, j) => {
                                                    const cta = asCtaLink(para);
                                                    if (cta) {
                                                        return (
                                                            <div key={j} className="pt-2">
                                                                <a href={cta.href} target="_blank" rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-3 bg-leuco-purple text-white text-xs font-black px-6 py-3.5 tracking-widest uppercase hover:bg-leuco-black transition-colors">
                                                                    {cta.label} <ArrowRight size={14} />
                                                                </a>
                                                            </div>
                                                        );
                                                    }
                                                    if (para.startsWith('- ')) {
                                                        return (
                                                            <div key={j} className="flex gap-4 items-start">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-leuco-purple shrink-0 mt-[10px]" />
                                                                <p className="text-gray-600 text-base md:text-[17px] leading-relaxed">
                                                                    <RichText text={para.slice(2)} />
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    // Skip payment method text artifacts
                                                    if (['American Express', 'Apple Pay', 'Discover', 'Mastercard', 'Visa'].includes(para)) return null;
                                                    return (
                                                        <p key={j} className="text-gray-600 text-base md:text-[17px] leading-relaxed">
                                                            <RichText text={para} />
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </section>
                                );
                            })
                        )}
                    </div>

                    {/* ── Sidebar ── */}
                    <aside className="lg:w-[280px] xl:w-[300px] shrink-0">
                        <div className="lg:sticky lg:top-24 space-y-5">

                            {/* Gallery images (for non-product-card articles) */}
                            {!hasProductCards && sidebarImages.map((img, i) => (
                                <div key={i} className="overflow-hidden bg-gray-50 border border-gray-100">
                                    <div className="relative" style={{ aspectRatio: '4/3' }}>
                                        <Image src={img.src} alt={img.alt} fill
                                            className="object-contain p-4"
                                            sizes="300px" />
                                    </div>
                                    <div className="px-4 py-2.5 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 font-medium leading-snug">{img.alt}</p>
                                    </div>
                                </div>
                            ))}

                            {/* For product articles: show a system overview box */}
                            {hasProductCards && (
                                <div className="bg-gray-50 border border-gray-100 p-6">
                                    <p className="text-[10px] font-black text-leuco-purple tracking-widest uppercase mb-4">
                                        What&apos;s In The System
                                    </p>
                                    <ul className="space-y-2.5">
                                        {article.productCards!.map((card, i) => (
                                            <li key={i} className="flex items-center gap-2.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-leuco-purple shrink-0" />
                                                <a href={card.ctaHref} target="_blank" rel="noopener noreferrer"
                                                    className="text-sm text-gray-700 font-semibold hover:text-leuco-purple transition-colors">
                                                    {card.heading}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    {article.shopSystemHref && (
                                        <a
                                            href={article.shopSystemHref}
                                            target="_blank" rel="noopener noreferrer"
                                            className="mt-6 flex items-center justify-between bg-leuco-purple text-white text-[10px] font-black px-4 py-3 tracking-widest uppercase hover:bg-leuco-black transition-colors"
                                        >
                                            SHOP SYSTEM <ArrowRight size={12} />
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Contact CTA card */}
                            <div className="bg-leuco-black p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Phone size={14} className="text-leuco-purple" />
                                    <p className="text-[10px] font-black text-leuco-purple tracking-widest uppercase">Talk to a Specialist</p>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                                    Get a sample cut or product consultation from a LEUCO application engineer.
                                </p>
                                <Link href="/pages/contact-leuco"
                                    className="flex items-center justify-between bg-leuco-purple text-white text-xs font-black px-4 py-3 tracking-widest uppercase hover:bg-white hover:text-leuco-purple transition-colors">
                                    CONTACT US <ArrowRight size={13} />
                                </Link>
                            </div>

                            {/* Back link */}
                            <Link href={backHref}
                                className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-leuco-purple transition-colors tracking-widest uppercase">
                                <ArrowLeft size={11} /> {backLabel}
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                INTERSTITIAL BANNER (optional)
            ══════════════════════════════════════════ */}
            {article.interstitialBanner && (
                <InterstitialBannerBlock banner={article.interstitialBanner} articleTitle={article.title} />
            )}

            {/* ══════════════════════════════════════════
                COMPARISON TABLE (optional)
            ══════════════════════════════════════════ */}
            {article.comparisonTable && (
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24">
                    <p className="text-[10px] font-black text-leuco-purple tracking-[0.18em] uppercase mb-4">
                        SIDE BY SIDE
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black text-leuco-black tracking-tight leading-tight mb-10">
                        {article.comparisonTable.beforeLabel} vs {article.comparisonTable.afterLabel}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left text-[10px] font-black text-gray-400 tracking-widest uppercase py-3 pr-6 border-b-2 border-gray-100 w-1/3">Feature</th>
                                    <th className="text-left text-[10px] font-black text-gray-500 tracking-widest uppercase py-3 px-6 border-b-2 border-gray-100 w-1/3">{article.comparisonTable.beforeLabel}</th>
                                    <th className="text-left text-[10px] font-black text-leuco-purple tracking-widest uppercase py-3 px-6 border-b-2 border-leuco-purple/30 w-1/3">{article.comparisonTable.afterLabel}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {article.comparisonTable.rows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/60' : ''}>
                                        <td className="text-sm font-bold text-leuco-black py-4 pr-6 border-b border-gray-100 align-top">{row.feature}</td>
                                        <td className="text-sm text-gray-500 py-4 px-6 border-b border-gray-100 align-top">{row.before}</td>
                                        <td className="text-sm text-leuco-black font-semibold py-4 px-6 border-b border-gray-100 align-top">
                                            <span className="flex items-start gap-2">
                                                <span className="w-4 h-4 rounded-full bg-leuco-purple/15 text-leuco-purple flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-black">✓</span>
                                                {row.after}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════
                FEATURED PRODUCTS (optional individual products)
            ══════════════════════════════════════════ */}
            {article.featuredProducts && article.featuredProducts.length > 0 && (
                <div className="bg-gray-50 py-16 md:py-24">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                        <p className="text-[10px] font-black text-leuco-purple tracking-[0.18em] uppercase mb-4">
                            SHOP THE SYSTEM
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-leuco-black tracking-tight leading-tight mb-12">
                            Explore {article.title} Products

                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {article.featuredProducts.map((product, i) => (
                                <div key={i} className="bg-white border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all group flex flex-col">
                                    <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '4/3' }}>
                                        <Image
                                            src={product.image.src}
                                            alt={product.image.alt}
                                            fill
                                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-sm font-black text-leuco-black tracking-tight leading-snug mb-2">{product.name}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{product.description}</p>
                                        {product.price && (
                                            <p className="text-leuco-purple font-black text-lg mb-4">{product.price}</p>
                                        )}
                                        <a
                                            href={product.ctaHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between bg-leuco-black text-white text-[10px] font-black px-4 py-3 tracking-widest uppercase hover:bg-leuco-purple transition-colors mt-auto"
                                        >
                                            {product.ctaLabel} <ArrowRight size={12} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {hasProductCards && (
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-6 md:py-10">
                    <div className="mb-10">
                        <p className="text-[10px] font-black text-leuco-purple tracking-[0.18em] uppercase mb-3">
                            THE COMPLETE SYSTEM
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-leuco-black tracking-tight leading-tight">
                            Everything You Need,<br className="hidden sm:block" /> In One Integrated System
                        </h2>
                    </div>
                    <div className="space-y-0 border border-gray-100 overflow-hidden">
                        {article.productCards!.map((card, i) => (
                            <ProductShowcaseCard key={i} card={card} index={i} />
                        ))}
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════
                VIDEO SECTION (optional)
            ══════════════════════════════════════════ */}
            {article.videoUrl && (
                <div className="bg-leuco-black py-20 md:py-28 mt-6">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-8 rounded-full bg-leuco-purple flex items-center justify-center shrink-0">
                                <Play size={13} className="text-white translate-x-0.5" fill="white" />
                            </span>
                            <p className="text-[10px] font-black text-leuco-purple tracking-[0.18em] uppercase">
                                Watch &amp; Learn
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-10">
                            {article.videoLabel ?? 'See It In Action'}
                        </h2>
                        <div className="relative w-full overflow-hidden bg-black/40"
                            style={{ aspectRatio: '16/9', maxWidth: 900 }}>
                            <iframe
                                src={article.videoUrl.includes('vimeo.com/') && !article.videoUrl.includes('player.vimeo.com')
                                    ? article.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')
                                    : article.videoUrl
                                }
                                title={article.videoLabel ?? 'Product Video'}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════
                CTA BANNER (always present)
            ══════════════════════════════════════════ */}
            <div className="bg-leuco-black mt-0">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-20
                    flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-black text-leuco-purple tracking-[0.18em] uppercase mb-3">
                            Ready to Get Started?
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-3">
                            Upgrade Your Tooling Process with LEUCO
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Contact a specialist for a consultation, sample cut, or live product demonstration.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        <Link href="/pages/contact-leuco"
                            className="inline-flex items-center gap-3 bg-leuco-purple text-white text-xs font-black px-8 py-4 tracking-widest uppercase hover:bg-white hover:text-leuco-purple transition-colors whitespace-nowrap">
                            CONTACT A SPECIALIST <ArrowRight size={14} />
                        </Link>
                        <Link href={backHref}
                            className="inline-flex items-center gap-3 border border-white/20 text-white text-xs font-black px-8 py-4 tracking-widest uppercase hover:border-white hover:bg-white hover:text-leuco-black transition-colors whitespace-nowrap">
                            <ArrowLeft size={14} /> {backLabel.toUpperCase()}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
