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
            email="sales@leucotool.com"
            hours="Mon–Fri: 6:00 AM – 2:30 PM PST"
            description="In 2012, LEUCO acquired D&D Tool, establishing our West Coast presence in Brea, California. This facility is equipped to service carbide saws, profile cutters, carbide and diamond straight cutters, spirals, DP tooling and inserts — serving the region's diverse woodworking, cabinetry, sign-making, and composite industries."
        />
    );
}
