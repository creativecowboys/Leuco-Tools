'use client';

import React, { useId, useRef, useState } from 'react';

/**
 * Tabbed panels for the lower half of the product page, after the way LEUCO's
 * own German shop splits variants / description / technical data.
 *
 * SEO note — this is why inactive panels are hidden with the `hidden`
 * attribute rather than unmounted. Spec and part-number capture is the whole
 * point of the LEUCO catalog data, and this page is server-rendered: if only
 * the active panel were in the tree, the spec table would be missing from the
 * HTML a crawler receives. Every panel ships in the markup; the browser just
 * shows one at a time.
 */

export interface ProductTab {
    id: string;
    label: string;
    /** Rendered next to the label, e.g. a document count. */
    badge?: number;
    content: React.ReactNode;
}

export default function ProductTabs({
    tabs,
    className = '',
}: {
    tabs: ProductTab[];
    className?: string;
}) {
    const present = tabs.filter((t) => t.content);
    const [active, setActive] = useState(0);
    const baseId = useId();
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    if (present.length === 0) return null;

    // One panel needs no tab bar — showing a lone tab would be chrome for its
    // own sake. This is the common case for the SKUs with no LEUCO record.
    if (present.length === 1) {
        return <div className={className}>{present[0].content}</div>;
    }

    const activeIndex = Math.min(active, present.length - 1);

    /** Arrow/Home/End move focus and selection, as expected of a tablist. */
    function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        const keys: Record<string, number> = {
            ArrowRight: index + 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: present.length - 1,
        };
        const next = keys[event.key];
        if (next === undefined) return;

        event.preventDefault();
        const wrapped = (next + present.length) % present.length;
        setActive(wrapped);
        tabRefs.current[wrapped]?.focus();
    }

    return (
        <div className={className}>
            <div
                role="tablist"
                aria-label="Product information"
                // Scrolls rather than wraps on a phone, so the bar stays one
                // line and the panel below never jumps as tabs reflow.
                className="flex gap-1 overflow-x-auto border-b border-gray-200 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {present.map((tab, i) => {
                    const selected = i === activeIndex;
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                            role="tab"
                            id={`${baseId}-tab-${tab.id}`}
                            aria-controls={`${baseId}-panel-${tab.id}`}
                            aria-selected={selected}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(i)}
                            onKeyDown={(e) => onKeyDown(e, i)}
                            className={[
                                'shrink-0 whitespace-nowrap px-4 py-3 text-xs font-black uppercase tracking-widest',
                                'border-b-2 -mb-px transition-colors cursor-pointer',
                                selected
                                    ? 'border-leuco-purple text-leuco-purple'
                                    : 'border-transparent text-gray-400 hover:text-gray-700',
                            ].join(' ')}
                        >
                            {tab.label}
                            {tab.badge !== undefined && tab.badge > 0 && (
                                <span
                                    className={[
                                        'ml-2 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums',
                                        selected
                                            ? 'bg-leuco-purple text-white'
                                            : 'bg-gray-100 text-gray-500',
                                    ].join(' ')}
                                >
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {present.map((tab, i) => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`${baseId}-panel-${tab.id}`}
                    aria-labelledby={`${baseId}-tab-${tab.id}`}
                    hidden={i !== activeIndex}
                    tabIndex={0}
                    className="pt-8 focus:outline-none"
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}
