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
            description="In 2014, LEUCO extended its commitment to reliability and innovation by opening its first Canadian Service Center. This facility offers direct sales and servicing of precision tooling and is strategically located in Mississauga. This central location offers easy access for local and expedited logistics. LEUCO has been selling in Canada for well over 20 years with great success. This facility can service your carbide saws, profile cutters, carbide and diamond straight cutters, spirals, and inserts."
        />
    );
}
