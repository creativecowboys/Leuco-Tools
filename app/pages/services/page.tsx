import type { Metadata } from 'next';
import ServicesHubClient from './ServicesHub-client';

export const metadata: Metadata = {
    title: 'Services - LEUCO Tool Corporation',
    description: 'LEUCO services including professional tool re-sharpening, custom tooling, and engineering consultation for the woodworking and manufacturing industries.',
};

export default function Page() {
    return <ServicesHubClient />;
}
