import Link from 'next/link';

interface ComingSoonPageProps {
    title: string;
    category: string;
    description: string;
}

export default function ComingSoonPage({ title, category, description }: ComingSoonPageProps) {
    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-leuco-black text-white py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-leuco-purple uppercase tracking-widest text-sm font-semibold mb-4">
                        {category}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">{title}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">{description}</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block bg-gray-100 rounded-lg px-6 py-3 mb-8">
                        <span className="text-sm font-black text-leuco-black uppercase tracking-wider">
                            Content Coming Soon
                        </span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter mb-6 text-leuco-black">
                        We're putting the finishing touches on this page.
                    </h2>
                    <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                        For immediate guidance on {title.toLowerCase()}, please reach out to our engineering team. We're happy to discuss your specific application and recommend the right tooling approach.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:sales@leucotool.com"
                            className="inline-block bg-leuco-purple text-white px-8 py-4 font-black uppercase tracking-wider hover:bg-leuco-black transition-colors"
                        >
                            Email Sales
                        </a>
                        <Link
                            href="/pages/contact-leuco"
                            className="inline-block border-2 border-leuco-black text-leuco-black px-8 py-4 font-black uppercase tracking-wider hover:bg-leuco-black hover:text-white transition-colors"
                        >
                            Contact LEUCO
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-10">
                        Toll-free: <a href="tel:1-800-631-0096" className="text-leuco-purple font-semibold">1-800-631-0096</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
