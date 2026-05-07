import { notFound } from 'next/navigation';
import { blogArticles } from '@/lib/blog-articles';
import BlogArticlePage from '@/components/BlogArticlePage';
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return Object.keys(blogArticles)
        .filter(slug => blogArticles[slug].blog === 'materials-solutions')
        .map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = blogArticles[slug];
    if (!article || article.blog !== 'materials-solutions') return {};
    return {
        title: `${article.title} | LEUCO Tool Corporation`,
        description: article.intro.slice(0, 160),
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const article = blogArticles[slug];

    if (!article || article.blog !== 'materials-solutions') {
        notFound();
    }

    return (
        <BlogArticlePage
            article={article}
            backHref="/blogs/leuco-solutions/leuco-materials-solutions"
            backLabel="MATERIALS SOLUTIONS"
            category="Materials Solutions"
        />
    );
}
