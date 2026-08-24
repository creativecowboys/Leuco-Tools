import type { Metadata } from 'next';
import { ArrowRight, Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Catalogs - LEUCO Tool Corporation',
    description: 'Download the LEUCO Mini Catalog and explore our full product range. Contact us for custom tooling, service needs, or technical assistance.',
};

export default function CatalogsPage() {
    // pdfUrl: direct download link — local /catalogs/ files are served from
    // public/; leuco.com links are the parent company's hosted catalogs.
    const catalogs = [
        { title: 'LEUCO General Program Catalog', desc: 'Complete overview of LEUCO tooling systems, product ranges, and technical specifications.', year: '2026', comingSoon: false, pdfUrl: 'https://www.leuco.com/EN/US/media/DOK_MKD_General-program_DL.pdf' },
        { title: 'LEUCO Mini Catalog', desc: 'Most popular North American products for quick lookup.', year: '2024', comingSoon: false, pdfUrl: 'https://www.dropbox.com/scl/fi/fcxdi91imt4ws1v3sj340/Mini-3.2_052019_Full.pdf?rlkey=ql9wk1o5xzx9xx4zn6n704mb3&st=jsxcwcc7&dl=0' },
        { title: 'USD HighlineXP Program', desc: 'HighlineXP industrial series program with US dollar pricing.', year: '2026', comingSoon: false, pdfUrl: '/catalogs/leuco-highlinexp-program-usd.pdf' },
        { title: 'CAD HighlineXP Program', desc: 'HighlineXP industrial series program with Canadian dollar pricing.', year: '2026', comingSoon: false, pdfUrl: '/catalogs/leuco-highlinexp-program-cad.pdf' },
        { title: 'HP+ Spirals Program', desc: 'Our highest performing spirals for customers who need the longest edge life.', year: '2026', comingSoon: false, pdfUrl: '/catalogs/leuco-hp-plus-spirals-program.pdf' },
        { title: 'Solid Carbide Spiral Program', desc: 'Solid carbide shank tools for routing and machining applications.', year: '2026', comingSoon: false, pdfUrl: '/catalogs/leuco-solid-carbide-spiral-program.pdf' },
        { title: 'Saw Blades', desc: 'Complete US circular saw blade range including specifications, applications, and ordering information.', year: '2026', comingSoon: false, pdfUrl: '/catalogs/leuco-us-saw-blades-catalog.pdf' },
        { title: 'CNC Tooling', desc: 'Spirals, drills, clamping and more for your routing and machining centers.', year: '2026', comingSoon: false, pdfUrl: '/catalogs/leuco-cnc-tooling-catalog.pdf' },
        { title: 'Solid Wood Catalog', desc: 'Sawing, planing, and dovetail tooling for solid wood processing.', year: '2026', comingSoon: false, pdfUrl: 'https://www.leuco.com/EN/US/media/DOK_MKD_LEUCO-Saege-Hobel-Zinkenwerk-Katalog_DL.pdf' },
        { title: 'LEUCOLine Customer Magazine: Innovations 2026', desc: 'The latest LEUCO product innovations and application stories.', year: '2026', comingSoon: false, pdfUrl: 'https://www.leuco.com/EN/US/media/DOK_MBR_LEUCOline-Highlights-2026_DL.pdf' },
    ];

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">DOWNLOADS</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CATALOGS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        Download LEUCO product catalogs, technical references, and application guides.
                    </p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {catalogs.map((cat, i) => (
                        <div key={i} className="flex gap-6 p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all group">
                            <div className="w-16 h-20 bg-leuco-purple/10 border-2 border-leuco-purple/20 flex items-center justify-center shrink-0">
                                <Download className="text-leuco-purple" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-black text-gray-400 tracking-widest mb-1">{cat.year}</div>
                                <h3 className="font-black text-lg mb-2 group-hover:text-leuco-purple transition-colors">{cat.title}</h3>
                                <p className="text-gray-500 font-medium text-sm mb-4">{cat.desc}</p>
                                {cat.comingSoon ? (
                                    <span className="font-black text-xs text-gray-400 tracking-widest">COMING SOON</span>
                                ) : cat.pdfUrl ? (
                                    <a href={cat.pdfUrl} target="_blank" rel="noopener noreferrer"
                                        className="font-black text-xs flex items-center gap-1 text-leuco-purple hover:text-leuco-black transition-colors">
                                        DOWNLOAD PDF <ArrowRight size={12} />
                                    </a>
                                ) : (
                                    <a href="/pages/contact-leuco"
                                        className="font-black text-xs flex items-center gap-1 text-leuco-purple hover:text-leuco-black transition-colors">
                                        REQUEST CATALOG <ArrowRight size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gray-50 p-12 text-center">
                    <h2 className="text-2xl font-black mb-4">Need a Printed Catalog?</h2>
                    <p className="text-gray-500 font-medium mb-6">Contact your LEUCO representative to request printed catalogs for your team.</p>
                    <a href="/pages/contact-leuco"
                        className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                        REQUEST PRINT CATALOG <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
