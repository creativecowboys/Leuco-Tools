import type { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';

export const metadata: Metadata = {
    title: 'California - LEUCO Tool Corporation',
    description: 'LEUCO California service center. 690 N. Berry St, Suite A, Brea, CA 92821. Contact our California team for cutting tool sales and sharpening services.',
};

export default function Page() {
    return (
        <LocationPage
            state="California"
            city="Brea"
            address="690 N. Berry St, Suite A, Brea, CA 92821"
            phone="714-990-2844"
            email="california@leuco.com"
            hours="Mon–Fri: 7:00 AM – 5:00 PM PT"
            description="LEUCO's California service center serves the West Coast, supporting the region's diverse woodworking, cabinetry, sign-making, and aerospace composites industries."
        />
    );
}
