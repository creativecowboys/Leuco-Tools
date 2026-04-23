import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoonPage';

export const metadata: Metadata = {
    title: 'Tooling Solutions - LEUCO Tool Corporation',
    description: 'LEUCO tooling solutions for application-specific cutting requirements. Custom tool design and engineering consultation for the woodworking and manufacturing industries.',
};

export default function Page() {
    return (
        <ComingSoonPage
            title="Tooling Solutions"
            category="Solutions"
            description="Application-specific tooling solutions designed by LEUCO engineering for unique cutting requirements that standard tools cannot meet."
        />
    );
}
