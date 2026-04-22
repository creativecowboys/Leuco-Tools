import type { Metadata } from 'next';
import ResharpeningFAQClient from './ResharpeningFAQ-client';

export const metadata: Metadata = {
    title: 'Tool Re-Sharpening FAQ - LEUCO Tool Corporation',
    description: "Frequently asked questions about LEUCO's professional tool re-sharpening services. Learn about turnaround times, pricing, and what tools we sharpen.",
};

export default function Page() {
    return <ResharpeningFAQClient />;
}
