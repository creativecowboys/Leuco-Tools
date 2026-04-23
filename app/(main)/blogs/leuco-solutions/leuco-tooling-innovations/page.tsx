import type { Metadata } from 'next';
import ToolingInnovationsClient from './ToolingInnovations-client';

export const metadata: Metadata = {
    title: 'Tooling Innovations - LEUCO Tool Corporation',
    description: "Discover the latest LEUCO tooling innovations including the HP+ spiral line, P-System diamond cutter heads, and HighlineXP industrial saw blades.",
};

export default function Page() {
    return <ToolingInnovationsClient />;
}
