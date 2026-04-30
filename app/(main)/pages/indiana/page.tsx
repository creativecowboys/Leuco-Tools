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
            email="sales@leucotool.com"
            hours="Mon–Fri: 7:00 AM – 4:30 PM CT"
            description="In 2016, LEUCO acquired Global Cutting Solutions, based in Huntingburg, Indiana. This acquisition added decades of regional expertise and a loyal customer base to the LEUCO family. Our Indiana service center is conveniently located in the heart of Indiana's woodworking corridor and is equipped to service carbide saws, profile cutters, carbide and diamond straight cutters, spirals, DP tooling and inserts."
        />
    );
}
