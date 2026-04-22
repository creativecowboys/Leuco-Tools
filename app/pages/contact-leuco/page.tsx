import type { Metadata } from 'next';
import ContactClient from './Contact-client';

export const metadata: Metadata = {
    title: 'Contact LEUCO - LEUCO Tool Corporation',
    description: 'Contact LEUCO Tool Corporation for cutting tool sales, sharpening services, custom tooling, and technical support. Toll-free: 1-800-631-0096.',
};

export default function Page() {
    return <ContactClient />;
}
