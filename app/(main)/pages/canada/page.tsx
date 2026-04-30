import type { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';

export const metadata: Metadata = {
    title: 'Canada - LEUCO Tool Corporation',
    description: 'LEUCO Canada location. 6295 Shawson Drive Unit #9, Mississauga, Ontario, L5T 1H4. Contact details for our Ontario service center.',
};

export default function Page() {
    return (
        <LocationPage
            state="Canada"
            city="Mississauga, Ontario"
            address="6295 Shawson Drive Unit #9, Mississauga, Ontario, L5T 1H4"
            phone="437-247-5613"
            email="sales@leucotool.com"
            hours="Mon–Fri: 8:00 AM – 5:00 PM ET"
            description="LEUCO has proudly served the Canadian market from Mississauga, Ontario for over 20 years. Our team delivers the same world-class resharpening quality and tooling expertise as our US locations to customers across Canada."
        />
    );
}
