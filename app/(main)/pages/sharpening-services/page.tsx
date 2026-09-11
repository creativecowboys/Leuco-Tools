import type { Metadata } from 'next';
import SharpeningServicesClient from './SharpeningServices-client';

export const metadata: Metadata = {
    alternates: { canonical: '/pages/sharpening-services' },
    title: 'Sharpening Services',
    description: 'LEUCO offers world-class re-sharpening services for all cutting tools including saw blades, cutter heads, and CNC spirals. Fast turnaround, like-new results.',
};

export default function Page() {
    return <SharpeningServicesClient />;
}
