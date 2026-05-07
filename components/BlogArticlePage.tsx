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

export default function BlogArticlePage({ article, backHref, backLabel, category }: BlogArticlePageProps) {
    return (
        <div>
            {/* Hero */}
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold tracking-widest mb-8 transition-colors"
                    >
                        <ArrowLeft size={14} /> {backLabel}
                    </Link>
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">
                        {category.toUpperCase()}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 max-w-4xl">
                        {article.title}
                    </h1>
                    {article.intro && (
                        <p className="text-gray-300 text-xl font-medium max-w-3xl leading-relaxed">
                            {article.intro}
                        </p>
                    )}
                </div>
            </div>

            {/* Image Gallery */}
            {article.images && article.images.length > 0 && (
                <div className="px-4 md:px-12 max-w-[1440px] mx-auto pt-12">
                    {/* Featured / first image full-width */}
                    <div className="relative w-full aspect-[16/7] mb-4 overflow-hidden bg-gray-100">
                        <Image
                            src={article.images[0].src}
                            alt={article.images[0].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1440px"
                            priority
                        />
                    </div>
                    {/* Secondary images in a grid */}
                    {article.images.length > 1 && (
                        <div className={`grid gap-4 mb-4 ${article.images.length === 2 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
                            {article.images.slice(1).map((img, i) => (
                                <div key={i} className="relative aspect-square overflow-hidden bg-gray-100">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 400px"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Article Body */}
            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="max-w-3xl">
                    {article.sections.map((section, i) => (
                        <div key={i} className="mb-12">
                            {section.heading && (
                                <h2 className="text-2xl font-black tracking-tighter mb-4 text-leuco-black">
                                    {section.heading}
                                </h2>
                            )}
                            <div className="space-y-4">
                                {section.paragraphs.map((para, j) => {
                                    // Bullet list items
                                    if (para.startsWith('- ')) {
                                        return (
                                            <div key={j} className="flex gap-3">
                                                <span className="text-leuco-purple font-black mt-1 shrink-0">—</span>
                                                <p className="text-gray-600 font-medium leading-relaxed">{para.slice(2)}</p>
                                            </div>
                                        );
                                    }
                                    // Links like [text](url)
                                    if (para.startsWith('[') && para.includes('](')) {
                                        const match = para.match(/\[([^\]]+)\]\(([^)]+)\)/);
                                        if (match) {
                                            return (
                                                <a
                                                    key={j}
                                                    href={match[2]}
                                                    className="inline-flex items-center gap-2 text-leuco-purple font-black hover:underline"
                                                    target={match[2].startsWith('http') ? '_blank' : undefined}
                                                    rel={match[2].startsWith('http') ? 'noopener noreferrer' : undefined}
                                                >
                                                    {match[1]} <ArrowRight size={14} />
                                                </a>
                                            );
                                        }
                                    }
                                    return (
                                        <p key={j} className="text-gray-600 font-medium leading-relaxed text-lg">
                                            {para}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 bg-leuco-black p-12 md:p-16">
                    <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-300 font-medium max-w-xl mb-8">
                        Contact a LEUCO specialist today to discuss your tooling needs and get a sample cut.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/pages/contact-leuco"
                            className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors"
                        >
                            CONTACT A SPECIALIST <ArrowRight size={18} />
                        </Link>
                        <Link
                            href={backHref}
                            className="border-2 border-white text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-black transition-colors"
                        >
                            <ArrowLeft size={18} /> BACK TO {backLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
