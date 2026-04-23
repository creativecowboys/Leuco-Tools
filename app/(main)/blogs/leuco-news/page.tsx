import type { Metadata } from 'next';
import NewsClient from './News-client';

export const metadata: Metadata = {
    title: 'News - LEUCO Tool Corporation',
    description: 'Latest news and announcements from LEUCO Tool Corporation.',
};

export default function Page() {
    return <NewsClient />;
}
