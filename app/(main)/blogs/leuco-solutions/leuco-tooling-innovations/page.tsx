import type { Metadata } from 'next';
import ToolingInnovationsClient from './ToolingInnovations-client';

export const metadata: Metadata = {
    alternates: { canonical: '/blogs/leuco-solutions/leuco-tooling-innovations' },
    title: 'Tooling Innovations',
    description: "Discover the latest LEUCO tooling innovations including the HP+ spiral line, P-System diamond cutter heads, and HighlineXP industrial saw blades.",
};

export default function Page() {
    return <ToolingInnovationsClient />;
}
