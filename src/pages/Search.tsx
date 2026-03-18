import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';

const suggestions = [
    { label: 'Circular Saw Blades', href: '/collections/circular-saw-blades' },
    { label: 'Spiral Tools', href: '/collections/spiral-tools' },
    { label: 'Resharpening Service', href: '/pages/sharpening-services' },
    { label: 'Custom Tooling', href: '/pages/custom-tooling' },
    { label: 'Cutter Heads', href: '/collections/cutter-heads' },
    { label: 'HighlineXP', href: '/collections/highlinexp-industrial-series' },
];

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') ?? '';
    const [query, setQuery] = useState(initialQuery);

    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">SEARCH</h1>
                    <form className="flex gap-0 max-w-2xl" onSubmit={e => { e.preventDefault(); }}>
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search tools, services, solutions..."
                            className="flex-1 p-5 font-medium text-lg focus:outline-none"
                        />
                        <button type="submit" className="bg-leuco-purple text-white px-8 font-black flex items-center gap-2 hover:bg-white hover:text-leuco-purple transition-colors">
                            <SearchIcon size={22} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                {query ? (
                    <div>
                        <p className="text-gray-500 font-bold mb-8">For full product search, visit the <a href={`https://shopleuco.com/search?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer" className="text-leuco-purple hover:underline">LEUCO Shop</a>.</p>
                        <a href={`https://shopleuco.com/search?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer"
                            className="bg-leuco-purple text-white font-black px-10 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                            SEARCH "{query}" ON LEUCO SHOP <ArrowRight size={18} />
                        </a>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-black mb-8">Popular Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {suggestions.map((s, i) => (
                                <Link key={i} to={s.href} className="group flex items-center justify-between p-6 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                                    <span className="font-black group-hover:text-leuco-purple transition-colors">{s.label}</span>
                                    <ArrowRight className="text-gray-300 group-hover:text-leuco-purple transition-colors" size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
