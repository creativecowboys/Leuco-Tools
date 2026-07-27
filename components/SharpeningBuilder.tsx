'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Phone, Truck, PackageCheck, Plus, Minus, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useShopifyProduct } from '@/hooks/useShopifyProduct';
import { useCart } from '@/context/CartContext';
import { SHARPENING_PRODUCT_HANDLE, ShopifyVariantDetail } from '@/lib/shopify';

// ─── Category definitions ─────────────────────────────────────────────────────
// Tool variants on the `tool-sharpening` product are named "<Category> <Size>"
// (e.g. "Sawblade 1-10in"). We bucket them by prefix so the builder mirrors the
// four categories customers know from the original service package flow.

interface CategoryDef {
    key: string;
    label: string;
    desc: string;
    match: RegExp;
}

const CATEGORY_DEFS: CategoryDef[] = [
    { key: 'sawblade', label: 'Sawblade', desc: 'Table, rip, sliding table, miter & panel saw blades', match: /^saw\s?-?blades?\s*/i },
    { key: 'cnc', label: 'CNC & Router', desc: 'MDF cutting, sizing, dividing, edge shaping & panel raising tools', match: /^cnc(\s*[&/+]?\s*router)?\s*/i },
    { key: 'spiral', label: 'Spiral & Drill Bits', desc: 'Drills, jointing, edge trimming, rounding & profiling tools', match: /^(spirals?(\s*[&/+]?\s*drill(\s*bits?)?)?|drill(\s*bits?)?)\s*/i },
    { key: 'cutter', label: 'Cutter Heads', desc: 'Cutter heads up to 6" diameter × 3" cut length', match: /^cutter\s?-?heads?\s*/i },
];

const FALLBACK_CATEGORY: CategoryDef = {
    key: 'other',
    label: 'Other Tools',
    desc: 'Additional tool types accepted for sharpening',
    match: /^/,
};

function isInspectionFee(v: ShopifyVariantDetail): boolean {
    return /inspection/i.test(v.title) || /fee/i.test(v.title);
}

function sizeLabel(title: string, def: CategoryDef): string {
    const stripped = title.replace(def.match, '').replace(/^[\s\-–—:]+/, '').trim();
    return stripped.length > 0 ? stripped : title;
}

function formatMoney(amount: string, currencyCode: string): string {
    const n = parseFloat(amount);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode || 'USD' }).format(n);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SharpeningBuilder() {
    const { product, loading } = useShopifyProduct(SHARPENING_PRODUCT_HANDLE);
    const { cart, addLinesToCart, loading: cartLoading } = useCart();

    // variantId -> qty currently staged in the builder (not yet in the cart)
    const [selections, setSelections] = useState<Record<string, number>>({});
    // per-category UI state: chosen size + stepper qty
    const [chosenSize, setChosenSize] = useState<Record<string, string>>({});
    const [stepQty, setStepQty] = useState<Record<string, number>>({});
    const [justAdded, setJustAdded] = useState(false);

    const variants = useMemo(
        () => (product?.variants.edges ?? []).map((e) => e.node).filter((v) => v.availableForSale),
        [product]
    );

    const feeVariant = useMemo(() => variants.find(isInspectionFee) ?? null, [variants]);

    const categories = useMemo(() => {
        const tools = variants.filter((v) => !isInspectionFee(v));
        const buckets = CATEGORY_DEFS.map((def) => ({
            def,
            variants: tools.filter((v) => def.match.test(v.title)),
        }));
        const matchedIds = new Set(buckets.flatMap((b) => b.variants.map((v) => v.id)));
        const leftovers = tools.filter((v) => !matchedIds.has(v.id));
        if (leftovers.length > 0) {
            buckets.push({ def: FALLBACK_CATEGORY, variants: leftovers });
        }
        return buckets.filter((b) => b.variants.length > 0);
    }, [variants]);

    const variantById = useMemo(() => {
        const map: Record<string, { variant: ShopifyVariantDetail; def: CategoryDef }> = {};
        categories.forEach(({ def, variants: vs }) => vs.forEach((v) => { map[v.id] = { variant: v, def }; }));
        return map;
    }, [categories]);

    const toolCount = Object.values(selections).reduce((a, b) => a + b, 0);

    const feeAlreadyInCart = useMemo(() => {
        if (!feeVariant || !cart) return false;
        return cart.lines.edges.some(({ node }) => node.merchandise.id === feeVariant.id);
    }, [cart, feeVariant]);

    const addSelection = (catKey: string, variantsInCat: ShopifyVariantDetail[]) => {
        const sizeId = chosenSize[catKey] ?? variantsInCat[0]?.id;
        const qty = stepQty[catKey] ?? 1;
        if (!sizeId || qty < 1) return;
        setSelections((prev) => ({ ...prev, [sizeId]: (prev[sizeId] ?? 0) + qty }));
        setStepQty((prev) => ({ ...prev, [catKey]: 1 }));
        setJustAdded(false);
    };

    const changeSelectionQty = (variantId: string, delta: number) => {
        setSelections((prev) => {
            const next = { ...prev };
            const q = (next[variantId] ?? 0) + delta;
            if (q <= 0) delete next[variantId];
            else next[variantId] = q;
            return next;
        });
    };

    const handleAddToCart = async () => {
        if (!feeVariant || toolCount === 0) return;
        const lines = Object.entries(selections).map(([merchandiseId, quantity]) => ({ merchandiseId, quantity }));
        if (!feeAlreadyInCart) {
            lines.unshift({ merchandiseId: feeVariant.id, quantity: 1 });
        }
        await addLinesToCart(lines);
        setSelections({});
        setJustAdded(true);
    };

    // ─── Fallback: product missing / not yet published to this channel ────────
    if (!loading && (!product || !feeVariant || categories.length === 0)) {
        return (
            <section id="send-in" className="bg-gray-50 py-20 px-4 md:px-12 scroll-mt-24">
                <div className="max-w-[1440px] mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black tracking-tighter mb-2">Request Sharpening Service</h2>
                        <div className="h-1.5 w-24 bg-leuco-purple" />
                    </div>
                    <p className="text-gray-500 font-medium max-w-2xl mb-10">
                        Call us to arrange your sharpening order, or schedule a local pickup — our team will take care of the rest.
                    </p>
                    <ThreeWays compact />
                </div>
            </section>
        );
    }

    return (
        <section id="send-in" className="bg-gray-50 py-20 px-4 md:px-12 scroll-mt-24">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-6">
                    <h2 className="text-4xl font-black tracking-tighter mb-2">Build Your Sharpening Package</h2>
                    <div className="h-1.5 w-24 bg-leuco-purple" />
                </div>
                <p className="text-gray-500 font-medium max-w-3xl mb-12">
                    Tools must be triaged by our experts before determining the cost of your sharpening. Simply add the
                    tool types you would like to send in and we will email you a shipping label after checkout — you pay
                    a single <span className="font-black text-leuco-black">$15 inspection fee</span> plus shipping. Once
                    we receive and triage your tools, we will send an invoice for the sharpening work.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Category cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-white border border-gray-100 p-8 animate-pulse">
                                    <div className="h-5 w-32 bg-gray-200 mb-4" />
                                    <div className="h-3 w-full bg-gray-100 mb-8" />
                                    <div className="h-10 w-full bg-gray-100 mb-3" />
                                    <div className="h-10 w-full bg-gray-100" />
                                </div>
                            ))
                            : categories.map(({ def, variants: vs }) => {
                                const qty = stepQty[def.key] ?? 1;
                                return (
                                    <motion.div
                                        key={def.key}
                                        whileHover={{ y: -4 }}
                                        className="bg-white p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all flex flex-col"
                                    >
                                        <h3 className="text-xl font-black tracking-tighter mb-2">{def.label}</h3>
                                        <p className="text-gray-500 font-medium text-sm mb-6 flex-1">{def.desc}</p>

                                        <label className="text-[10px] font-black tracking-widest text-gray-400 mb-1 block">
                                            DIAMETER / SIZE
                                        </label>
                                        <select
                                            value={chosenSize[def.key] ?? vs[0]?.id}
                                            onChange={(e) => setChosenSize((prev) => ({ ...prev, [def.key]: e.target.value }))}
                                            className="w-full border border-gray-200 px-3 py-2.5 text-sm font-bold mb-4 outline-none focus:border-leuco-purple bg-white"
                                        >
                                            {vs.map((v) => (
                                                <option key={v.id} value={v.id}>
                                                    {sizeLabel(v.title, def)}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="flex items-stretch gap-3">
                                            <div className="flex items-center border border-gray-200">
                                                <button
                                                    type="button"
                                                    aria-label={`Decrease ${def.label} quantity`}
                                                    onClick={() => setStepQty((prev) => ({ ...prev, [def.key]: Math.max(1, qty - 1) }))}
                                                    className="px-3 py-2 hover:bg-gray-50 text-gray-500"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-black">{qty}</span>
                                                <button
                                                    type="button"
                                                    aria-label={`Increase ${def.label} quantity`}
                                                    onClick={() => setStepQty((prev) => ({ ...prev, [def.key]: qty + 1 }))}
                                                    className="px-3 py-2 hover:bg-gray-50 text-gray-500"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => addSelection(def.key, vs)}
                                                className="flex-1 bg-leuco-purple hover:bg-leuco-black text-white font-black text-sm py-2.5 transition-colors"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                    </div>

                    {/* Package summary */}
                    <div className="bg-leuco-black text-white p-8 h-fit lg:sticky lg:top-28">
                        <h3 className="text-lg font-black tracking-widest mb-6">YOUR PACKAGE</h3>

                        {toolCount === 0 ? (
                            <p className="text-gray-400 font-medium text-sm mb-6">
                                {justAdded
                                    ? 'Package added to your cart. Add more tools to send in another package.'
                                    : 'Add at least one tool to get started.'}
                            </p>
                        ) : (
                            <ul className="space-y-4 mb-6">
                                {Object.entries(selections).map(([variantId, qty]) => {
                                    const entry = variantById[variantId];
                                    if (!entry) return null;
                                    return (
                                        <li key={variantId} className="flex items-center justify-between gap-3 text-sm">
                                            <div className="min-w-0">
                                                <div className="font-black truncate">{entry.def.label}</div>
                                                <div className="text-gray-400 font-medium text-xs truncate">
                                                    {sizeLabel(entry.variant.title, entry.def)}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    type="button"
                                                    aria-label="Decrease quantity"
                                                    onClick={() => changeSelectionQty(variantId, -1)}
                                                    className="p-1 hover:text-leuco-purple-light text-gray-400"
                                                >
                                                    <Minus size={13} />
                                                </button>
                                                <span className="font-black w-5 text-center">{qty}</span>
                                                <button
                                                    type="button"
                                                    aria-label="Increase quantity"
                                                    onClick={() => changeSelectionQty(variantId, 1)}
                                                    className="p-1 hover:text-leuco-purple-light text-gray-400"
                                                >
                                                    <Plus size={13} />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label="Remove"
                                                    onClick={() => changeSelectionQty(variantId, -qty)}
                                                    className="p-1 hover:text-red-400 text-gray-500 ml-1"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <div className="border-t border-white/10 pt-5 space-y-2 mb-6">
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-gray-400">Tools in package</span>
                                <span>{toolCount}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-gray-400">Inspection fee</span>
                                <span>
                                    {feeAlreadyInCart
                                        ? 'In cart'
                                        : feeVariant
                                            ? formatMoney(feeVariant.price.amount, feeVariant.price.currencyCode)
                                            : '$15.00'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-gray-400">Shipping</span>
                                <span className="text-gray-400">At checkout</span>
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium pt-1">
                                Sharpening cost is quoted after triage — we email an invoice before any work begins.
                            </p>
                        </div>

                        <button
                            type="button"
                            disabled={toolCount === 0 || cartLoading}
                            onClick={handleAddToCart}
                            className="w-full bg-leuco-purple hover:bg-white hover:text-leuco-purple disabled:opacity-40 disabled:hover:bg-leuco-purple disabled:hover:text-white text-white font-black py-4 transition-all flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={16} />
                            {cartLoading ? 'ADDING…' : 'ADD PACKAGE TO CART'}
                        </button>
                    </div>
                </div>

                {/* Other ways to request service */}
                <div className="mt-16">
                    <h3 className="text-xl font-black tracking-tighter mb-6">Other Ways to Request Service</h3>
                    <ThreeWays />
                </div>
            </div>
        </section>
    );
}

// ─── Pickup / call options ────────────────────────────────────────────────────

function ThreeWays({ compact = false }: { compact?: boolean }) {
    const items = [
        {
            Icon: Truck,
            title: 'Schedule a Local Pickup',
            desc: 'Our delivery drivers might be in your area — nationwide pickup and delivery through our own service network.',
            cta: (
                <Link href="/pages/contact-leuco" className="font-black text-sm text-leuco-purple flex items-center gap-2 hover:gap-3 transition-all">
                    SCHEDULE PICKUP <ArrowRight size={14} />
                </Link>
            ),
        },
        {
            Icon: Phone,
            title: 'Call a Service Center',
            desc: 'Not sure where to start, or just have questions? Talk with an applications specialist or customer service rep.',
            cta: (
                <a href="tel:+17704595784" className="font-black text-sm text-leuco-purple flex items-center gap-2 hover:gap-3 transition-all">
                    770-459-5784 <ArrowRight size={14} />
                </a>
            ),
        },
        ...(compact
            ? [{
                Icon: PackageCheck,
                title: 'Send Tools In',
                desc: 'Pack and ship your tools to your nearest LEUCO service center for fast, reliable resharpening.',
                cta: (
                    <Link href="/pages/contact-leuco" className="font-black text-sm text-leuco-purple flex items-center gap-2 hover:gap-3 transition-all">
                        FIND A LOCATION <ArrowRight size={14} />
                    </Link>
                ),
            }]
            : []),
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ Icon, title, desc, cta }, i) => (
                <div key={i} className="bg-white p-8 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                    <Icon className="text-leuco-purple mb-4" size={32} />
                    <h4 className="font-black text-lg mb-2">{title}</h4>
                    <p className="text-gray-500 font-medium text-sm mb-6">{desc}</p>
                    {cta}
                </div>
            ))}
        </div>
    );
}
