import type { Metadata } from 'next';
import LocationPage from '@/components/LocationPage';

export const metadata: Metadata = {
    title: 'Indiana - LEUCO Tool Corporation',
    description: 'LEUCO Indiana service center. 613 E. 7th Street, Huntingburg, IN 47542. Contact our Indiana team for tool sales and re-sharpening services.',
};

export default function Page() {
    return (
        <LocationPage
            state="Indiana"
            city="Huntingburg"
            address="613 E. 7th Street, Huntingburg, IN 47542"
            phone="812-683-5808"
            email="indiana@leuco.com"
            hours="Mon–Fri: 7:00 AM – 5:00 PM ET"
            description="LEUCO's Indiana service center is strategically located to provide rapid resharpening service to the Midwest's manufacturing and woodworking industries."
        />
    );
}
