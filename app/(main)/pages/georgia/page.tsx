import type { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';

export const metadata: Metadata = {
    title: 'Georgia - LEUCO Tool Corporation',
    description: 'LEUCO Georgia headquarters location. 500 W. Industrial Court, Villa Rica, GA 30180. Contact our Georgia team for tool sales and sharpening services.',
};

export default function Page() {
    return (
        <LocationPage
            state="Georgia"
            city="Villa Rica"
            address="500 W. Industrial Court, Villa Rica, GA 30180"
            phone="770-459-5784"
            email="georgia@leuco.com"
            hours="Mon–Fri: 7:00 AM – 5:00 PM ET"
            description="LEUCO's Georgia headquarters serves the Southeast US, providing expert resharpening and tooling services to the region's furniture, cabinet, and millwork industries."
        />
    );
}
