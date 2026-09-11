import type { Metadata } from 'next';
import EngineeringClient from './Engineering-client';

export const metadata: Metadata = {
    alternates: { canonical: '/pages/leuco-engineering' },
    title: 'Leuco Engineering',
    description: 'LEUCO engineering and application support. Our technical team provides consultation, custom tool design, and application-specific recommendations.',
};

export default function Page() {
    return <EngineeringClient />;
}
