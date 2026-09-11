import type { Metadata } from 'next';
import SolutionsHubClient from './SolutionsHub-client';

export const metadata: Metadata = {
    alternates: { canonical: '/blogs/leuco-solutions' },
    title: 'Solutions',
    description: 'Explore LEUCO tooling solutions, materials expertise, and innovations. Real-world applications and engineering insights from the precision cutting tool experts.',
};

export default function Page() {
    return <SolutionsHubClient />;
}
