import type { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';

export const metadata: Metadata = {
    title: 'Mississippi - LEUCO Tool Corporation',
    description: 'LEUCO Mississippi service center location and contact details. Contact our Mississippi team for local tool sales and sharpening services.',
};

export default function Page() {
    return (
        <LocationPage
            state="Mississippi"
            city="Tupelo"
            address="456 Woodworking Blvd, Tupelo, MS 38801"
            phone="+1 (800) 433-0771"
            email="mississippi@leuco.com"
            hours="Mon–Fri: 7:00 AM – 5:00 PM CT"
            description="LEUCO's Mississippi service center is centrally located to serve the furniture capital of the world, providing rapid turnaround resharpening for Tupelo and surrounding areas."
        />
    );
}
