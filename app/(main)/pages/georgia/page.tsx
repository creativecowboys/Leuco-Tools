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
            phone="1.800.631.0096"
            email="sales@leucotool.com"
            hours="Mon–Fri: 8:00 AM – 5:00 PM ET"
            description="Located in Villa Rica, Georgia, this facility serves as the headquarters of LEUCO Tool Corporation, the North American subsidiary of LEUCO Werkzeuge. The Georgia location is equipped to service carbide saws, profile cutters, carbide and diamond straight cutters, spirals, DP tooling and inserts. With a team of expert machinists and state-of-the-art production equipment, LEUCO Georgia proudly maintains the quality standards set by our parent company in Horb, Germany."
        />
    );
}
