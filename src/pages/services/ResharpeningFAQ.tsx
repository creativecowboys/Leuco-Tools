import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        q: 'How often should I send my tools in for resharpening?',
        a: 'It depends on your production volume and material type. For high-volume operations, we typically recommend resharpening every 2–4 weeks. Your LEUCO representative can help you develop an optimal schedule.',
    },
    {
        q: 'What types of tools can LEUCO resharpen?',
        a: 'LEUCO can resharpen virtually any woodworking tool including circular saw blades, router bits, cutter heads, jointer knives, planer blades, and more. Contact us to verify your specific tool.',
    },
    {
        q: 'How long does the resharpening process take?',
        a: 'Standard turnaround is 24–48 hours from receipt. Rush service is available on request. Shipping times are in addition to service time.',
    },
    {
        q: 'Can tools originally made by other manufacturers be resharpened?',
        a: 'Yes, in many cases we can resharpen tools made by other manufacturers. Contact your nearest LEUCO service center for evaluation.',
    },
    {
        q: 'How do I prepare my tools for shipping?',
        a: 'Wrap each tool individually in cardboard or foam. Use a sturdy box with adequate padding. Include a note with your contact information and a description of any issues.',
    },
    {
        q: 'What is LEUCO\'s resharpening quality guarantee?',
        a: 'All resharpened tools are inspected to verify they meet original manufacturer specifications. If a tool cannot be restored to spec, we will contact you before proceeding.',
    },
    {
        q: 'How many times can a tool be resharpened?',
        a: 'The number of resharpenings depends on the tool type and how much material can be removed. A LEUCO technician can evaluate your tools and advise on remaining service life.',
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-100">
            <button onClick={() => setOpen(!open)} className="w-full text-left py-6 flex justify-between items-start gap-4">
                <span className="font-black text-lg">{q}</span>
                {open ? <ChevronUp className="text-leuco-purple shrink-0 mt-1" size={20} /> : <ChevronDown className="text-gray-400 shrink-0 mt-1" size={20} />}
            </button>
            {open && <p className="pb-6 text-gray-500 font-medium">{a}</p>}
        </div>
    );
}

export default function ResharpeningFAQ() {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">RESHARPENING</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">TOOL RESHARPENING FAQ</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl">Common questions about the LEUCO resharpening process, turnaround times, and service options.</p>
                </div>
            </div>

            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 font-medium mb-6">Still have questions?</p>
                    <Link to="/pages/contact-leuco" className="bg-leuco-purple text-white font-black px-10 py-4 inline-flex items-center gap-2 hover:bg-leuco-black transition-colors">
                        CONTACT US
                    </Link>
                </div>
            </div>
        </div>
    );
}
