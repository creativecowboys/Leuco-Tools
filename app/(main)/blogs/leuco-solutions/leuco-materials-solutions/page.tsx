import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Materials Solutions - LEUCO Tool Corporation',
    description: 'LEUCO materials solutions for wood, panels, plastics, composites, and non-ferrous metals. Material-specific tooling guidance from LEUCO engineering.',
};

export default function Page() {
    return (
        <ComingSoonPage
            title="Materials Solutions"
            category="Solutions"
            description="Material-specific tooling guidance from LEUCO engineering — for wood, panels, composites, plastics, and non-ferrous metals."
        />
    );
}
