import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FLAGS } from '@/lib/flags';
import NewsClient from './News-client';

export const metadata: Metadata = {
    title: 'News - LEUCO Tool Corporation',
    description: 'Latest news and announcements from LEUCO Tool Corporation.',
};

export default function Page() {
    if (!FLAGS.ENABLE_NEWS) {
        notFound();
    }
    return <NewsClient />;
}

