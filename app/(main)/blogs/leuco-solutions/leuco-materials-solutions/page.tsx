import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Material Solutions - LEUCO Tool Corporation',
    description: 'With LEUCO Material Solutions, you will receive longer edge life, better cut quality, low-noise, and a team of tooling experts on hand.',
};

const materials = [
    {
        title: 'Foam Glass Sandwich Material',
        slug: 'foam-glass-sandwich-material-cutting-solutions',
        desc: 'Foam glass sandwich panels are a type of composite material known for their impressive thermal insulation, lightweight structure, and high strength.',
    },
    {
        title: 'Mineral Composite Material',
        slug: 'mineral-composite-material-cutting-solutions',
        desc: 'Mineral composites are fascinating materials that combine mineral substances, like aluminum hydroxide or granite, with acrylic resin or polyester.',
    },
    {
        title: 'Maridur 30-70 Material',
        slug: 'maridur-30-70-material-cutting-solutions',
        desc: 'Many industry professionals refer to Maridur 30-70 as "the interior and exterior material," which speaks to its versatility and flexibility for manufacturers.',
    },
    {
        title: 'Lightweight Plywood',
        slug: 'lightweight-plywood-material-cutting-solutions',
        desc: 'Lightweight Plywood is an invaluable material that\'s an outstanding option for industries that prioritize weight savings without compromising structural integrity.',
    },
    {
        title: 'Felt Panel Material',
        slug: 'felt-panel-material-cutting-solutions',
        desc: 'Architectural felt panels have emerged as a versatile and innovative material in the fields of architecture and design.',
    },
    {
        title: 'Laminated Glass',
        slug: 'laminated-glass-material-cutting-solutions',
        desc: 'Laminated Glass is a popular choice because of its Grade A safety rating, noise reducing properties, and versatility as compared to double glazed glass.',
    },
    {
        title: 'Expanded Glass',
        slug: 'expanded-glass-material-cutting-solutions',
        desc: 'Expanded glass panels are a fascinating innovation in material science, offering numerous advantages in manufacturing and construction.',
    },
    {
        title: 'Anti-Fingerprint Coated Material',
        slug: 'anti-fingerprint-coated-material-cutting-solutions',
        desc: 'Anti-fingerprint coated manufacturing panels, often made from MDF, are revolutionizing the world of interior design and manufacturing.',
    },
    {
        title: 'Aluminum Profile Material',
        slug: 'aluminum-profile-material-cutting-solutions',
        desc: 'Aluminum window profile material with proper sealing and foam core insulation is a rising choice for manufacturers, designers, and architects across the globe.',
    },
    {
        title: 'Plastic Profile',
        slug: 'plastic-profile-cutting-solutions',
        desc: 'Plastic window profiles are an important part of the window making process for untold global manufacturers.',
    },
    {
        title: 'Foam Composite',
        slug: 'foam-composite-cutting-solutions',
        desc: 'Decorative Foam Composite material provides a lightweight, thermally insulated alternative to plywood sheets.',
    },
    {
        title: 'Lightweight Panel',
        slug: 'lightweight-panel-cutting-solutions',
        desc: 'Lightweight Panel material, also known as Efficiency Poplar or Lightweight Plywood Panel, has become increasingly popular in recent years.',
    },
    {
        title: 'Magnetic Board',
        slug: 'magnetic-board-cutting-solutions',
        desc: 'Magnetic board material, also known as magnet bond boards, has become a practical but also aesthetically pleasing product for office and classroom settings.',
    },
    {
        title: 'Fiber Cement Panel',
        slug: 'fiber-cement-panel-cutting-solutions',
        desc: 'Fiber cement exterior panels are coveted for their versatility, cost-efficiency, high levels of durability, and minimal maintenance.',
    },
    {
        title: 'Linoleum Material',
        slug: 'linoleum-material-cutting-solutions',
        desc: "Linoleum isn't just a flooring option — it's a popular choice for those looking to add a pop of flair to their products.",
    },
    {
        title: 'MDF Material',
        slug: 'mdf-material-cutting-solutions',
        desc: 'Organic Medium-Density Fiberboard (MDF) is one of the most highly favored manufacturing materials in the industry today.',
    },
    {
        title: 'Gypsum Fiber Material',
        slug: 'gypsum-fiber-material-cutting-solutions',
        desc: 'This versatile material is a superstar in the world of construction, providing strength and durability to buildings of all shapes and sizes.',
    },
    {
        title: 'Light Concrete',
        slug: 'light-concrete-material-cutting-solutions',
        desc: 'Light concrete is an incredibly versatile material used for a wide range of applications. Its improved fire resistance and insulating properties make it a rising choice.',
    },
    {
        title: 'Polycarbonate Material',
        slug: 'polycarbonate-material-cutting-solutions',
        desc: 'Polycarbonate panels are gaining popularity in both interior and exterior architecture due to their ability to scatter light and absorb sound effectively.',
    },
    {
        title: 'Compact Plate (HPL)',
        slug: 'compact-plate-cutting-solutions',
        desc: 'Compact Plate (HPL) is utilized on more decorative furniture fronts than any other currently used material, making it a hot commodity for manufacturing.',
    },
];

export default function MaterialSolutionsPage() {
    return (
        <div>
            {/* Hero */}
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">APPLICATIONS</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">MATERIAL SOLUTIONS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">
                        With LEUCO Material Solutions, you will receive longer edge life, better cut quality, low-noise, and a team of tooling experts on hand. Our Material Solutions provide you with a driving business saving you time and money as we stay ahead of your production needs before you even think about it.
                    </p>
                </div>
            </div>

            {/* Material Grid */}
            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="mb-10">
                    <h2 className="text-4xl font-black tracking-tighter mb-2">Cutting Solutions by Material</h2>
                    <div className="h-1.5 w-24 bg-leuco-purple" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {materials.map((mat, i) => (
                        <Link
                            key={i}
                            href={`/blogs/materials-solutions/${mat.slug}`}
                            className="group p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all"
                        >
                            <h3 className="font-black text-lg mb-3 group-hover:text-leuco-purple transition-colors flex items-center gap-2">
                                {mat.title}
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed">{mat.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-leuco-black p-12 md:p-16 text-center">
                    <h2 className="text-3xl font-black text-white mb-4">Ready to Upgrade Your Cutting Process?</h2>
                    <p className="text-gray-300 font-medium max-w-xl mx-auto mb-8">
                        Are you ready to take your business to the next level? Contact a LEUCO representative today to get your material solution.
                    </p>
                    <Link href="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-8 py-4 inline-flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors">
                        CONTACT A SPECIALIST <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
