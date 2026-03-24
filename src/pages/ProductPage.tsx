import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShopifyProduct } from '../hooks/useShopifyProduct';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Loader2, ChevronLeft, ChevronRight, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShopifyVariantDetail } from '../lib/shopify';

function formatMoney(amount: string, currencyCode: string): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(parseFloat(amount));
}

// ─── Spec string parser ────────────────────────────────────────────────────────
// LEUCO encodes all dimensional specs into the variant's Size option string.
// Format (circular blades): "CIR {ØD}" x {B}mm x {b}mm x {bore} Z{z} {angle}"
// e.g.  "CIR 10 x 3.2 x 2.2 x 5/8 Z24 20"

interface ParsedSpecs {
    [label: string]: string;
}

function parseVariantSpecs(sizeString: string): ParsedSpecs | null {
    if (!sizeString) return null;
    const s = sizeString.trim();

    // ── CUT prefix: Cutter Heads ─────────────────────────────────────────────
    // e.g. "CUT 70 x 15 x 23 x 25 Z4 LH"  → ØD x B x b x bore Zteeth hand
    // e.g. "100 x 42.8 x 40.6 x 30 Z=3+3 LH"  (no prefix, DIAMAX style)
    const cutPattern = /^(?:CUT\s+)?(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+Z=?(\d+(?:[+]\d+)?)\s+([A-Z]+)$/i;
    const mCut = s.match(cutPattern);
    if (mCut) {
        return {
            'Cutting Circle Diameter (Ø D)': mCut[1] + 'mm',
            'Cut Width (B)': mCut[2] + 'mm',
            'Body Thickness (b)': mCut[3] + 'mm',
            'Bore Diameter (Ø d)': mCut[4] + 'mm',
            'Number of Teeth (z)': mCut[5],
            'Rotation': mCut[6].toUpperCase() === 'LH' ? 'Left-Hand' : mCut[6].toUpperCase() === 'RH' ? 'Right-Hand' : mCut[6],
        };
    }

    // ── BOR prefix: Boring / Spiral Tools ────────────────────────────────────
    // e.g. "BOR 8 x 10 x 35 x 70 RH"  → shankDia x boreDia x cuttingLen x overallLen hand
    const borPattern = /^BOR\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+([A-Z]+)$/i;
    const mBor = s.match(borPattern);
    if (mBor) {
        return {
            'Shank Diameter': mBor[1] + 'mm',
            'Bore / Cutting Diameter': mBor[2] + 'mm',
            'Cutting Length': mBor[3] + 'mm',
            'Overall Length': mBor[4] + 'mm',
            'Rotation': mBor[5].toUpperCase() === 'LH' ? 'Left-Hand' : mBor[5].toUpperCase() === 'RH' ? 'Right-Hand' : mBor[5],
        };
    }

    // ── KNI prefix: Knives & Inserts ─────────────────────────────────────────
    // e.g. "KNI 7.6 x 12 x 1.5 HLB 05"           → height x width x thickness system
    // e.g. "KNI 12 x 20 x 2 HLB 05 R=0.8"         → + radius
    const kniPattern = /^KNI\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+(\S+\s+\S+)(.*)?$/i;
    const mKni = s.match(kniPattern);
    if (mKni) {
        const specs: ParsedSpecs = {
            'Height': mKni[1] + 'mm',
            'Width': mKni[2] + 'mm',
            'Thickness': mKni[3] + 'mm',
            'System': mKni[4].trim(),
        };
        const extra = mKni[5]?.trim();
        if (extra) {
            const rMatch = extra.match(/R=(\S+)/i);
            if (rMatch) specs['Corner Radius'] = rMatch[1] + 'mm';
        }
        return specs;
    }

    // ── CLA prefix: Clamping Systems ─────────────────────────────────────────
    // e.g. "CLA 2-25 x 60 x 101 HSK 63F X18 462E"  → colletRange x colletDia x length shank type
    const claPattern = /^CLA\s+([\d/-]+)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+(.+)$/i;
    const mCla = s.match(claPattern);
    if (mCla) {
        return {
            'Collet Range': mCla[1] + 'mm',
            'Collet Diameter': mCla[2] + 'mm',
            'Overall Length': mCla[3] + 'mm',
            'Shank / Type': mCla[4].trim(),
        };
    }

    // ── ACC prefix: Parts & Accessories (Precision Collets) ──────────────────
    // e.g. "ACC 1/8 x 34.8 x 52 462E"  → colletSize x colletDia x length type
    const accPattern = /^ACC\s+([\d/]+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+(.+)$/i;
    const mAcc = s.match(accPattern);
    if (mAcc) {
        return {
            'Collet Size': mAcc[1] + '"',
            'Collet Diameter': mAcc[2] + 'mm',
            'Overall Length': mAcc[3] + 'mm',
            'Chuck Type': mAcc[4].trim(),
        };
    }

    // ── Pattern: HighlineXP / modern saw blade format ─────────────────────────
    // e.g. "10 x 2.5 x 1.8 x 5/8" Z=60: 30° ATB"
    const hlxpPattern = /^(\d+(?:[./]\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+([\d/]+"?)\s*Z=(\d+):\s*(-?\d+)°?\s*(.+)?$/i;
    const m2 = s.match(hlxpPattern);
    if (m2) {
        const specs: ParsedSpecs = {
            'Cutting Circle Diameter (Ø D)': m2[1].trim() + '"',
            'Cut Width (B)': m2[2] + 'mm',
            'Body Thickness (b)': m2[3] + 'mm',
            'Bore Diameter (Ø d)': m2[4].trim().replace(/"+$/, '') + '"',
            'Number of Teeth (z)': m2[5],
            'Hook Angle': m2[6] + '°',
        };
        if (m2[7]?.trim()) specs['Tooth Shape'] = m2[7].trim();
        return specs;
    }

    // ── Pattern: Standard LEUCO saw blade format ─────────────────────────────
    // e.g. "CIR 10 x 3.2 x 2.2 x 5/8 Z24 20"
    const standardPattern = /^(?:CIR|SAW|HL|HLP|HLB)?\s*(\d+(?:[./]\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+(\d+(?:\.\d+)?)\s+x\s+([\d/]+"?)\s*Z(\d+)\s+(-?\d+)/i;
    const m1 = s.match(standardPattern);
    if (m1) {
        return {
            'Cutting Circle Diameter (Ø D)': m1[1].trim() + '"',
            'Cut Width (B)': m1[2] + 'mm',
            'Body Thickness (b)': m1[3] + 'mm',
            'Bore Diameter (Ø d)': m1[4].trim().replace(/"+$/, '') + '"',
            'Number of Teeth (z)': m1[5],
            'Hook Angle': m1[6] + '°',
        };
    }

    // Fallback: return null → raw option values shown instead
    return null;
}

// ─── Breadcrumb map (productType → collection route) ─────────────────────────
const PRODUCT_TYPE_TO_ROUTE: Record<string, { label: string; href: string }> = {
    'Saw Blades': { label: 'Circular Saws', href: '/collections/circular-saw-blades' },
    'Cutter Heads': { label: 'Cutter Heads', href: '/collections/cutter-heads' },
    'Spiral Tools': { label: 'Spirals & Drills', href: '/collections/spiral-tools' },
    'Shank-Type Cutters': { label: 'Spirals & Drills', href: '/collections/spiral-tools' },
    'Boring Tools': { label: 'Spirals & Drills', href: '/collections/spiral-tools' },
    'Knives and Inserts': { label: 'Knives & Inserts', href: '/collections/knives-and-inserts' },
    'Clamping Systems': { label: 'Clamping Systems', href: '/collections/clamping-systems' },
    'Parts and Accessories': { label: 'Parts & Accessories', href: '/collections/parts-and-accessories' },
};

export default function ProductPage() {
    const { handle } = useParams<{ handle: string }>();
    const { product, loading, error } = useShopifyProduct(handle ?? '');
    const { addToCart, addingVariantId } = useCart();
    const navigate = useNavigate();

    // Image gallery state
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Variant selection state — map of option name → selected value
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    // Derive the selected variant from option selections
    const selectedVariant = useMemo<ShopifyVariantDetail | null>(() => {
        if (!product) return null;
        const variants = product.variants.edges.map((e) => e.node);
        if (variants.length === 1) return variants[0];
        if (Object.keys(selectedOptions).length === 0) return variants[0];

        return (
            variants.find((v) =>
                v.selectedOptions.every(
                    (opt) => selectedOptions[opt.name] === opt.value
                )
            ) ?? variants[0]
        );
    }, [product, selectedOptions]);

    const images = product?.images.edges ?? [];
    const activeImage = images[activeImageIndex]?.node;

    // Added-to-cart flash state
    const [justAdded, setJustAdded] = useState(false);
    const isAdding = selectedVariant && addingVariantId === selectedVariant.id;

    const handleAddToCart = async () => {
        if (!selectedVariant?.id) return;
        await addToCart(selectedVariant.id);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
    };

    const breadcrumb = product
        ? PRODUCT_TYPE_TO_ROUTE[product.productType] ?? { label: 'Tools', href: '/pages/tools' }
        : null;

    // ─── Loading ────────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={48} className="animate-spin text-leuco-purple" />
            </div>
        );
    }

    // ─── Error / Not Found ──────────────────────────────────────────────────────
    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
                <p className="text-2xl font-black text-gray-800">Product not found.</p>
                <button onClick={() => navigate(-1)} className="text-leuco-purple font-bold flex items-center gap-2">
                    <ArrowLeft size={16} /> Go back
                </button>
            </div>
        );
    }

    const variants = product.variants.edges.map((e) => e.node);
    const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
    const compareAt = selectedVariant?.compareAtPrice;
    const inStock = selectedVariant?.availableForSale ?? false;

    // ─── Render ─────────────────────────────────────────────────────────────────
    return (
        <div>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100 px-4 md:px-12 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Link to="/" className="hover:text-leuco-purple transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    {breadcrumb && (
                        <>
                            <Link to={breadcrumb.href} className="hover:text-leuco-purple transition-colors">
                                {breadcrumb.label}
                            </Link>
                            <ChevronRight size={12} />
                        </>
                    )}
                    <span className="text-gray-900 truncate max-w-xs">{product.title}</span>
                </div>
            </div>

            {/* Main Product Section */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                    {/* ── Left: Image Gallery ── */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-50 border border-gray-100 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {activeImage ? (
                                    <motion.img
                                        key={activeImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        src={activeImage.url}
                                        alt={activeImage.altText ?? product.title}
                                        className="w-full h-full object-contain mix-blend-multiply p-6"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ShoppingCart size={64} />
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Prev / Next */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImageIndex((i) => (i - 1 + images.length) % images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow border border-gray-100 rounded-full flex items-center justify-center hover:border-leuco-purple transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={() => setActiveImageIndex((i) => (i + 1) % images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white shadow border border-gray-100 rounded-full flex items-center justify-center hover:border-leuco-purple transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {images.length > 1 && (
                            <div className="flex gap-2 flex-wrap">
                                {images.map(({ node: img }, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`w-16 h-16 border-2 rounded overflow-hidden flex-shrink-0 transition-colors ${i === activeImageIndex ? 'border-leuco-purple' : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.altText ?? `Image ${i + 1}`}
                                            className="w-full h-full object-contain mix-blend-multiply p-1"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Product Info ── */}
                    <div className="flex flex-col gap-6">
                        {/* Type badge */}
                        {product.productType && (
                            <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 tracking-widest w-fit">
                                {product.productType.toUpperCase()}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-gray-900">
                            {product.title}
                        </h1>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-black text-leuco-purple">
                                {formatMoney(price.amount, price.currencyCode)}
                            </span>
                            {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
                                <span className="text-lg text-gray-400 line-through font-medium">
                                    {formatMoney(compareAt.amount, compareAt.currencyCode)}
                                </span>
                            )}
                        </div>

                        {/* Stock status */}
                        <div className={`text-sm font-black tracking-wider ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                            {inStock ? '● IN STOCK' : '● OUT OF STOCK'}
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Variant Options */}
                        {product.options
                            .filter((opt) => opt.values.length > 1 || opt.name.toLowerCase() !== 'title')
                            .map((option) => (
                                <div key={option.id} className="flex flex-col gap-2">
                                    <label className="text-xs font-black tracking-widest text-gray-500 uppercase">
                                        {option.name}:{' '}
                                        <span className="text-gray-900">{selectedOptions[option.name] ?? option.values[0]}</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {option.values.map((val) => {
                                            const isSelected =
                                                (selectedOptions[option.name] ?? option.values[0]) === val;
                                            // Check if this option value is available in any variant
                                            const hasStock = variants.some(
                                                (v) =>
                                                    v.availableForSale &&
                                                    v.selectedOptions.some(
                                                        (o) => o.name === option.name && o.value === val
                                                    )
                                            );
                                            return (
                                                <button
                                                    key={val}
                                                    onClick={() =>
                                                        setSelectedOptions((prev) => ({ ...prev, [option.name]: val }))
                                                    }
                                                    disabled={!hasStock}
                                                    className={`px-4 py-2 text-xs font-black border transition-all ${isSelected
                                                        ? 'bg-leuco-black text-white border-leuco-black'
                                                        : hasStock
                                                            ? 'border-gray-300 hover:border-leuco-purple text-gray-700'
                                                            : 'border-gray-200 text-gray-300 line-through cursor-not-allowed'
                                                        }`}
                                                >
                                                    {val}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!inStock || !!isAdding || justAdded}
                            className={`w-full py-5 font-black text-sm tracking-widest flex items-center justify-center gap-3 transition-all ${justAdded
                                ? 'bg-green-600 text-white'
                                : inStock
                                    ? 'bg-leuco-purple text-white hover:bg-leuco-black'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isAdding ? (
                                <><Loader2 size={18} className="animate-spin" /> ADDING TO CART...</>
                            ) : justAdded ? (
                                <><Check size={18} /> ADDED TO CART</>
                            ) : inStock ? (
                                <><ShoppingCart size={18} /> ADD TO CART</>
                            ) : (
                                'OUT OF STOCK'
                            )}
                        </button>

                        {/* Description */}
                        {product.descriptionHtml && (
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4">
                                    Description
                                </h3>
                                <div
                                    className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                                />
                            </div>
                        )}

                        {/* Vendor */}
                        {product.vendor && (
                            <p className="text-xs font-bold text-gray-400">
                                VENDOR: <span className="text-gray-600">{product.vendor}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Full-width Specs / Details / Description panels ── */}
                <div className="mt-16 border-t border-gray-100 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* SPECIFICATIONS */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-3">
                            <span className="w-6 h-px bg-leuco-purple inline-block" />
                            Specifications
                        </h2>

                        {/* ── Selected variant detail card ── */}
                        {selectedVariant && (() => {
                            const sizeOpt = selectedVariant.selectedOptions.find(o =>
                                o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'title'
                            );
                            const sizeVal = sizeOpt?.value ?? selectedVariant.title;
                            const parsed = parseVariantSpecs(sizeVal);
                            const sku = selectedVariant.sku;

                            return (
                                <div className="mb-8 border border-gray-200 rounded-sm overflow-hidden">
                                    {/* Header */}
                                    <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
                                        {sku && (
                                            <p className="text-sm text-gray-600">
                                                Specifications for SKU: <span className="font-black text-gray-900">{sku}</span>
                                            </p>
                                        )}
                                        {!sku && (
                                            <p className="text-sm text-gray-500">
                                                Select a size above to see its specifications
                                            </p>
                                        )}
                                    </div>

                                    {parsed ? (
                                        <table className="w-full text-sm">
                                            <tbody>
                                                {Object.entries(parsed).map(([label, value], i) => (
                                                    <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td className="px-5 py-3 font-black text-gray-700 w-1/2">{label}</td>
                                                        <td className="px-5 py-3 text-gray-600">{value}</td>
                                                    </tr>
                                                ))}
                                                {/* Also show all selectedOptions that don't have a parsed equivalent */}
                                                {selectedVariant.selectedOptions
                                                    .filter(o => o.name.toLowerCase() !== 'title' && o.name.toLowerCase() !== 'size')
                                                    .map((o, i) => (
                                                        <tr key={o.name} className={(Object.keys(parsed).length + i) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-5 py-3 font-black text-gray-700 w-1/2">{o.name}</td>
                                                            <td className="px-5 py-3 text-gray-600">{o.value}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        /* No blade-pattern match — show raw options as key/value */
                                        <table className="w-full text-sm">
                                            <tbody>
                                                {selectedVariant.selectedOptions
                                                    .filter(o => o.name.toLowerCase() !== 'title')
                                                    .map((o, i) => (
                                                        <tr key={o.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-5 py-3 font-black text-gray-700 w-1/2">{o.name}</td>
                                                            <td className="px-5 py-3 text-gray-600">{o.value}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            );
                        })()}

                        {/* ── Full variants comparison table ── */}
                        {variants.length > 1 && (
                            <div className="overflow-x-auto">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">All Sizes</p>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left px-4 py-3 font-black text-xs text-gray-500 border border-gray-200 whitespace-nowrap">Size / Variant</th>
                                            <th className="text-left px-4 py-3 font-black text-xs text-gray-500 border border-gray-200 whitespace-nowrap">Price</th>
                                            <th className="text-left px-4 py-3 font-black text-xs text-gray-500 border border-gray-200 whitespace-nowrap">SKU</th>
                                            <th className="text-left px-4 py-3 font-black text-xs text-gray-500 border border-gray-200">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {variants.map((v) => (
                                            <tr
                                                key={v.id}
                                                onClick={() => {
                                                    const opts: Record<string, string> = {};
                                                    v.selectedOptions.forEach((o) => { opts[o.name] = o.value; });
                                                    setSelectedOptions(opts);
                                                    // Scroll back to top of page so user can see updated specs
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className={`cursor-pointer hover:bg-leuco-purple/5 transition-colors ${selectedVariant?.id === v.id ? 'bg-leuco-purple/10' : ''}`}
                                            >
                                                <td className="px-4 py-3 font-bold border border-gray-200 whitespace-nowrap">
                                                    {v.title === 'Default Title' ? product.title : v.title}
                                                </td>
                                                <td className="px-4 py-3 font-black text-leuco-purple border border-gray-200 whitespace-nowrap">
                                                    {formatMoney(v.price.amount, v.price.currencyCode)}
                                                </td>
                                                <td className="px-4 py-3 border border-gray-200 text-gray-500 text-xs font-mono whitespace-nowrap">
                                                    {v.sku || '—'}
                                                </td>
                                                <td className="px-4 py-3 border border-gray-200">
                                                    <span className={`text-xs font-black ${v.availableForSale ? 'text-green-600' : 'text-red-400'}`}>
                                                        {v.availableForSale ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {variants.length === 0 && (
                            <p className="text-sm text-gray-400">No specification data available.</p>
                        )}
                    </div>

                    {/* DETAILS */}
                    <div>
                        <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6 flex items-center gap-3">
                            <span className="w-6 h-px bg-leuco-purple inline-block" />
                            Details
                        </h2>
                        <dl className="flex flex-col gap-5">
                            {product.productType && (
                                <div>
                                    <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Product Type</dt>
                                    <dd className="text-sm font-bold text-gray-800">{product.productType}</dd>
                                </div>
                            )}
                            {product.vendor && (
                                <div>
                                    <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Vendor</dt>
                                    <dd className="text-sm font-bold text-gray-800">{product.vendor}</dd>
                                </div>
                            )}
                            {/* Parse tags into grouped detail fields */}
                            {(() => {
                                const tags = product.tags ?? [];
                                // Group tags into labeled categories based on common Shopify tag conventions
                                const applications = tags.filter(t => t.toLowerCase().startsWith('application:') || t.toLowerCase().startsWith('app:')).map(t => t.split(':').slice(1).join(':').trim());
                                const machineTypes = tags.filter(t => t.toLowerCase().startsWith('machine:') || t.toLowerCase().startsWith('machine type:')).map(t => t.split(':').slice(1).join(':').trim());
                                const materials = tags.filter(t => t.toLowerCase().startsWith('material:') || t.toLowerCase().startsWith('material type:')).map(t => t.split(':').slice(1).join(':').trim());
                                const otherTags = tags.filter(t =>
                                    !t.toLowerCase().startsWith('application:') &&
                                    !t.toLowerCase().startsWith('app:') &&
                                    !t.toLowerCase().startsWith('machine:') &&
                                    !t.toLowerCase().startsWith('machine type:') &&
                                    !t.toLowerCase().startsWith('material:') &&
                                    !t.toLowerCase().startsWith('material type:')
                                );

                                return (
                                    <>
                                        {applications.length > 0 && (
                                            <div>
                                                <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Applications</dt>
                                                <dd className="text-sm font-bold text-gray-800">{applications.join(', ')}</dd>
                                            </div>
                                        )}
                                        {machineTypes.length > 0 && (
                                            <div>
                                                <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Machine Types</dt>
                                                <dd className="text-sm font-bold text-gray-800">{machineTypes.join(', ')}</dd>
                                            </div>
                                        )}
                                        {materials.length > 0 && (
                                            <div>
                                                <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Material Types</dt>
                                                <dd className="text-sm font-bold text-gray-800">{materials.join(', ')}</dd>
                                            </div>
                                        )}
                                        {otherTags.length > 0 && (
                                            <div>
                                                <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tags</dt>
                                                <dd className="flex flex-wrap gap-2">
                                                    {otherTags.map(tag => (
                                                        <span key={tag} className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </dd>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
