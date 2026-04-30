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
            description="Following a 9,000 square foot expansion and installation of new grinding robotics, LEUCO Michigan operates one of the most advanced service centers in our North American network. Located in Kalamazoo, this facility is equipped to service carbide saws, profile cutters, carbide and diamond straight cutters, spirals, DP tooling and inserts."
        />
    );
}
