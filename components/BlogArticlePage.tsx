import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import type { BlogArticle } from '@/lib/blog-articles';

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

export default function BlogArticlePage({ article, backHref, backLabel, category }: BlogArticlePageProps) {
    const hasImages = article.images && article.images.length > 0;
    const heroImage = hasImages ? article.images[0] : null;
    const sidebarImages = hasImages && article.images.length > 1 ? article.images.slice(1) : [];

    // Clean intro — strip any raw markdown links from the first line
    const cleanIntro = article.intro.replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1');

    return (
        <article className="bg-white">
            {/* ══════════════════════════════════════════
                HERO — full dark panel
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
                    </div>
                </div>

                {/* Hero image — cinematic, flush to bottom of hero */}
                {heroImage && (
                    <div className="relative w-full overflow-hidden" style={{ height: 'min(56vw, 580px)' }}>
                        <Image src={heroImage.src} alt={heroImage.alt} fill priority
                            className="object-cover object-center" sizes="100vw" />
                        {/* Bottom fade into white */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                    </div>
                )}
            </div>

            {/* ══════════════════════════════════════════
                ARTICLE BODY
            ══════════════════════════════════════════ */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    {/* ── Main content ── */}
                    <div className="flex-1 min-w-0 max-w-[660px]">
                        {article.sections.map((section, i) => {
                            // Check if entire section is a single CTA link
                            const sectionCta = section.paragraphs.length === 1 && !section.heading
                                ? asCtaLink(section.paragraphs[0])
                                : null;

                            return (
                                <section key={i} className="mb-12">
                                    {/* Section heading */}
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
                        })}
                    </div>

                    {/* ── Sidebar ── */}
                    <aside className="lg:w-[280px] xl:w-[300px] shrink-0">
                        <div className="lg:sticky lg:top-24 space-y-5">

                            {/* Gallery images */}
                            {sidebarImages.map((img, i) => (
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
                CTA BANNER
            ══════════════════════════════════════════ */}
            <div className="bg-leuco-black mt-8">
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
