import type { Metadata } from 'next';
import EngineeringClient from './Engineering-client';

export const metadata: Metadata = {
    title: 'Leuco Engineering - LEUCO Tool Corporation',
    description: 'LEUCO engineering and application support. Our technical team provides consultation, custom tool design, and application-specific recommendations.',
};

export default function Page() {
    return <EngineeringClient />;
}
