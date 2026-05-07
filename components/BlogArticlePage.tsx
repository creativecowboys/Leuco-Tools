import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { BlogArticle } from '@/lib/blog-articles';

interface BlogArticlePageProps {
    article: BlogArticle;
    backHref: string;
    backLabel: string;
    category: string;
}

/** Parse a paragraph that may contain [text](url) links into JSX */
function RichParagraph({ text }: { text: string }) {
    const parts: React.ReactNode[] = [];
    const linkRe = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = linkRe.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        parts.push(
            <a
                key={m.index}
                href={m[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-leuco-purple font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
                {m[1]}
            </a>
        );
        last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}

/** Detect if paragraph is a "Shop …" CTA link */
function isShopLink(para: string): { label: string; href: string } | null {
    const m = para.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (m) return { label: m[1], href: m[2] };
    return null;
}

export default function BlogArticlePage({ article, backHref, backLabel, category }: BlogArticlePageProps) {
    const hasImages = article.images && article.images.length > 0;
    const featuredImage = hasImages ? article.images[0] : null;
    const galleryImages = hasImages && article.images.length > 1 ? article.images.slice(1) : [];

    return (
        <article>
            {/* ─── HERO ─── */}
            <div className="bg-leuco-black">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 pb-16">
                    {/* Back link */}
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs font-black tracking-widest mb-10 transition-colors uppercase"
                    >
                        <ArrowLeft size={12} /> {backLabel}
                    </Link>

                    <div className="max-w-4xl">
                        <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-5 tracking-widest uppercase">
                            {category}
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6">
                            {article.title}
                        </h1>
                        {article.intro && (
                            <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                                {article.intro}
                            </p>
                        )}
                    </div>
                </div>

                {/* Featured hero image — full bleed, tall cinematic */}
                {featuredImage && (
                    <div className="relative w-full" style={{ height: '55vh', minHeight: 320, maxHeight: 640 }}>
                        <Image
                            src={featuredImage.src}
                            alt={featuredImage.alt}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                )}
            </div>

            {/* ─── ARTICLE BODY ─── */}
            <div className="bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">

                        {/* ── Main content column ── */}
                        <div className="max-w-2xl">
                            {article.sections.map((section, i) => {
                                const shopLink = section.paragraphs.length === 1
                                    ? isShopLink(section.paragraphs[0])
                                    : null;

                                return (
                                    <div key={i} className="mb-14">
                                        {/* Section heading */}
                                        {section.heading && (
                                            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-leuco-black mb-5 mt-2 leading-tight border-l-4 border-leuco-purple pl-4">
                                                {section.heading}
                                            </h2>
                                        )}

                                        {/* If the whole section is a shop CTA link */}
                                        {shopLink ? (
                                            <a
                                                href={shopLink.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-3 bg-leuco-purple text-white font-black px-7 py-4 text-sm tracking-widest hover:bg-leuco-black transition-colors"
                                            >
                                                {shopLink.label} <ArrowRight size={16} />
                                            </a>
                                        ) : (
                                            <div className="space-y-5">
                                                {section.paragraphs.map((para, j) => {
                                                    const link = isShopLink(para);
                                                    if (link) {
                                                        return (
                                                            <a
                                                                key={j}
                                                                href={link.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-3 bg-leuco-purple text-white font-black px-7 py-4 text-sm tracking-widest hover:bg-leuco-black transition-colors mt-2"
                                                            >
                                                                {link.label} <ArrowRight size={16} />
                                                            </a>
                                                        );
                                                    }
                                                    if (para.startsWith('- ')) {
                                                        return (
                                                            <div key={j} className="flex gap-4 py-1">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-leuco-purple mt-3 shrink-0" />
                                                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                                                    <RichParagraph text={para.slice(2)} />
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <p key={j} className="text-gray-700 text-base md:text-lg leading-relaxed">
                                                            <RichParagraph text={para} />
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Inject gallery images naturally between sections */}
                                        {galleryImages[(i) % galleryImages.length] && i > 0 && i % 2 === 0 && (
                                            <div className="mt-10 relative aspect-[3/2] overflow-hidden bg-gray-100">
                                                <Image
                                                    src={galleryImages[(i) % galleryImages.length].src}
                                                    alt={galleryImages[(i) % galleryImages.length].alt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 640px"
                                                />
                                                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-4 py-2 font-medium">
                                                    {galleryImages[(i) % galleryImages.length].alt}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Sticky sidebar ── */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-8 space-y-6">

                                {/* Image gallery sidebar */}
                                {galleryImages.length > 0 && (
                                    <div className="space-y-3">
                                        {galleryImages.map((img, i) => (
                                            <div key={i} className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="340px"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                                                    <p className="text-white text-xs font-medium leading-snug">{img.alt}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Contact card */}
                                <div className="bg-leuco-black p-6">
                                    <p className="text-xs font-black text-leuco-purple tracking-widest mb-3 uppercase">Need Help?</p>
                                    <p className="text-white text-sm font-medium leading-relaxed mb-5">
                                        Talk to a LEUCO tooling specialist to find the right solution for your process.
                                    </p>
                                    <Link
                                        href="/pages/contact-leuco"
                                        className="flex items-center justify-between bg-leuco-purple text-white text-xs font-black px-4 py-3 tracking-widest hover:bg-white hover:text-leuco-purple transition-colors"
                                    >
                                        CONTACT US <ArrowRight size={14} />
                                    </Link>
                                </div>

                                {/* Back link */}
                                <Link
                                    href={backHref}
                                    className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-leuco-purple transition-colors tracking-widest uppercase"
                                >
                                    <ArrowLeft size={12} /> {backLabel}
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* ─── FULL-WIDTH CTA BANNER ─── */}
                <div className="bg-leuco-black">
                    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <p className="text-xs font-black text-leuco-purple tracking-widest mb-3 uppercase">Get Started Today</p>
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-3 max-w-xl">
                                Ready to upgrade your tooling process?
                            </h2>
                            <p className="text-gray-400 font-medium max-w-lg">
                                Contact a LEUCO specialist for a consultation, sample cut, or product demo.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                            <Link
                                href="/pages/contact-leuco"
                                className="inline-flex items-center gap-3 bg-leuco-purple text-white font-black px-8 py-4 text-sm tracking-widest hover:bg-white hover:text-leuco-purple transition-colors whitespace-nowrap"
                            >
                                CONTACT A SPECIALIST <ArrowRight size={16} />
                            </Link>
                            <Link
                                href={backHref}
                                className="inline-flex items-center gap-3 border-2 border-white/30 text-white font-black px-8 py-4 text-sm tracking-widest hover:border-white hover:bg-white hover:text-leuco-black transition-colors whitespace-nowrap"
                            >
                                <ArrowLeft size={16} /> {backLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
