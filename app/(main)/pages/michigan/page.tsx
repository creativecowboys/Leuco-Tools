import type { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';

export const metadata: Metadata = {
    title: 'Michigan - LEUCO Tool Corporation',
    description: 'LEUCO Michigan service center. 6480 Technology Ave Ste C, Kalamazoo, MI 49009. Contact our Michigan team for tool sales and sharpening.',
};

export default function Page() {
    return (
        <LocationPage
            state="Michigan"
            city="Kalamazoo"
            address="6480 Technology Ave Ste C, Kalamazoo, MI 49009"
            phone="269-353-1990"
            email="sales@leucotool.com"
            hours="Mon–Fri: 7:00 AM – 4:30 PM ET"
            description="Following a major 9,000 sq ft facility expansion, LEUCO Michigan now operates state-of-the-art CNC grinding robotics to serve the Great Lakes region's furniture, automotive, and aerospace tooling industries with unmatched precision."
        />
    );
}
