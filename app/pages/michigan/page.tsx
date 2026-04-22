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
            phone="800-631-0096"
            email="michigan@leuco.com"
            hours="Mon–Fri: 7:00 AM – 5:00 PM ET"
            description="LEUCO's Michigan service center supports the Great Lakes region's strong furniture, automotive, and aerospace tooling industries with expert service."
        />
    );
}
