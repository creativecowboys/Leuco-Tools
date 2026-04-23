import type { Metadata } from 'next';
import ToolsHubClient from './ToolsHub-client';

export const metadata: Metadata = {
    title: 'Tools - LEUCO Tool Corporation',
    description: 'LEUCO offers a complete range of premium cutting tools for woodworking, plastics, and composites. Explore our full selection of saw blades, cutter heads, spiral tools, and more.',
};

export default function Page() {
    return <ToolsHubClient />;
}
