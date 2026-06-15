'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ShopifyProduct } from '@/lib/shopify';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface CollectionGridProps {
    initialProducts: ShopifyProduct[];
    title: string;
}

const SORT_LABELS: Record<SortOption, string> = {
    featured: 'Featured',
    'price-asc': 'Price: Low → High',
    'price-desc': 'Price: High → Low',
    'name-asc': 'Name: A → Z',
    'name-desc': 'Name: Z → A',
};

// ─── Unified Spec Parser ──────────────────────────────────────────────────────

interface ParsedSpecsUnified {
    diameter: string;
    bore: string;
    teeth: string;
    flutes: string;
}

function parseVariantSpecsUnified(sizeString: string, productType = ''): ParsedSpecsUnified | null {
    if (!sizeString) return null;
    let s = sizeString.trim().replace(/×/g, 'x');
    const original = s;

    let prefix = '';
    const prefixMatch = s.match(/^(CIR|SAW|HL|HLP|HLB|CUT|BOR|KNI|CLA|ACC|SHA)\b/i);
    if (prefixMatch) {
        prefix = prefixMatch[1].toUpperCase();
        s = s.substring(prefixMatch[0].length).trim();
    }

    s = s.replace(/^\d{6,10}\s+/, '');

    let teeth = 'N/A';
    let flutes = 'N/A';

    const zMatch = original.match(/Z=?(\d+(?:[+]\d+)?)/i);
    const flMatch = original.match(/(\d+)\s*FL/i);
    const rawZ = zMatch ? zMatch[1] : (flMatch ? flMatch[1] : 'N/A');

    const typeLower = productType.toLowerCase();
    const isSpiral = prefix === 'SHA' || typeLower.includes('spiral') || typeLower.includes('shank') || typeLower.includes('boring');

    if (isSpiral) {
        flutes = rawZ;
    } else if (prefix === 'CIR' || prefix === 'SAW' || prefix === 'HL' || prefix === 'HLP' || prefix === 'HLB' || typeLower.includes('saw') || prefix === 'CUT' || typeLower.includes('cutter')) {
        teeth = rawZ;
    }

    let diameter = 'N/A';
    let bore = 'N/A';

    // 1. Detect tool-level unit (toolUnit) for fallback
    let toolUnit: 'mm' | '"' = 'mm';
    if (original.toLowerCase().includes('mm')) {
        toolUnit = 'mm';
    } else if (original.includes('"') || original.includes('”') || /\binch(es)?\b/i.test(original) || /\d\s*in\b/i.test(original)) {
        toolUnit = '"';
    } else if (original.includes('/')) {
        toolUnit = '"';
    } else {
        const isMetricDefault = prefix === 'KNI' || prefix === 'CUT' || prefix === 'BOR' || prefix === 'CLA' ||
            typeLower.includes('knives') || typeLower.includes('inserts') ||
            typeLower.includes('cutter') || typeLower.includes('boring') ||
            typeLower.includes('clamping') || typeLower.includes('clamp');
        if (isMetricDefault) {
            toolUnit = 'mm';
        } else {
            // Last numeric segment magnitude fallback (overall length)
            const cleanedPart = s.split(/Z|:|;|,/i)[0].replace(/[^0-9.x]/g, ' ');
            const parts = cleanedPart.split(/\s*x\s*|\s+/).map(p => p.trim()).filter(Boolean);
            if (parts.length > 0) {
                const lastNum = parseFloat(parts[parts.length - 1]);
                if (!isNaN(lastNum)) {
                    toolUnit = lastNum >= 15 ? 'mm' : '"';
                }
            }
        }
    }

    // 2. Format segment using individual segment rules
    const formatSegment = (val: string, type: 'diameter' | 'bore') => {
        if (!val) return 'N/A';
        const cleaned = val.replace(/"/g, '').replace(/”/g, '').trim();

        // Explicit segment unit overrides
        if (val.includes('"') || val.includes('”') || val.includes('/')) {
            return cleaned + '"';
        }
        if (val.toLowerCase().includes('mm')) {
            return cleaned + 'mm';
        }

        const num = parseFloat(cleaned);
        if (isNaN(num)) return 'N/A';

        // Saw blades magnitude override (forced)
        if (prefix === 'CIR' || prefix === 'SAW' || prefix === 'HL' || prefix === 'HLP' || prefix === 'HLB' || typeLower.includes('saw')) {
            if (type === 'diameter') {
                return num < 30 ? cleaned + '"' : cleaned + 'mm';
            }
            if (type === 'bore') {
                return num < 5 ? cleaned + '"' : cleaned + 'mm';
            }
        }

        // General tools segment-level rule:
        // Values >= 5 without unit tokens are always millimeters (mm)
        // Values < 5 default to the tool-level unit (toolUnit)
        if (num >= 5) {
            return cleaned + 'mm';
        }
        return cleaned + toolUnit;
    };

    // Special HeatSync parser
    if (s.includes('ITD=')) {
        const itdMatch = s.match(/ITD=([\d/.]+(")?)/i);
        if (itdMatch) bore = formatSegment(itdMatch[1], 'bore');
        const dskMatch = s.match(/DSK=(\d+)/i);
        if (dskMatch) diameter = formatSegment(dskMatch[1], 'diameter');
        return { diameter, bore, teeth, flutes };
    }

    let dimsPart = s.split(/Z|:|;|,/i)[0].trim();
    const segments = dimsPart.split(/\s*x\s*/i).map(seg => seg.trim()).filter(Boolean);

    if (segments.length === 0) return null;

    if (prefix === 'CIR' || prefix === 'SAW' || prefix === 'HL' || prefix === 'HLP' || prefix === 'HLB' || typeLower.includes('saw')) {
        diameter = formatSegment(segments[0], 'diameter');
        if (segments.length >= 4) {
            bore = formatSegment(segments[3], 'bore');
        } else if (segments.length >= 3) {
            bore = formatSegment(segments[2], 'bore');
        }
    } else if (prefix === 'CUT' || typeLower.includes('cutter')) {
        diameter = formatSegment(segments[0], 'diameter');
        if (segments.length >= 4) {
            bore = formatSegment(segments[3], 'bore');
        }
    } else if (prefix === 'BOR' || typeLower.includes('boring')) {
        diameter = formatSegment(segments[1], 'diameter');
        bore = formatSegment(segments[0], 'bore');
    } else if (prefix === 'KNI' || typeLower.includes('knives') || typeLower.includes('inserts')) {
        diameter = formatSegment(segments[1], 'diameter');
    } else if (prefix === 'CLA' || typeLower.includes('clamp')) {
        diameter = formatSegment(segments[1], 'diameter');
    } else if (prefix === 'ACC' || typeLower.includes('parts') || typeLower.includes('accessories')) {
        diameter = formatSegment(segments[1], 'diameter');
        bore = formatSegment(segments[0], 'bore');
    } else if (prefix === 'SHA' || typeLower.includes('spiral') || typeLower.includes('shank') || typeLower.includes('cutter')) {
        diameter = formatSegment(segments[0], 'diameter');
        if (segments.length === 5) {
            bore = formatSegment(segments[3], 'bore');
        } else if (segments.length >= 3) {
            bore = formatSegment(segments[2], 'bore');
        }
    } else {
        diameter = formatSegment(segments[0], 'diameter');
        if (segments.length >= 3) {
            bore = formatSegment(segments[2], 'bore');
        }
    }

    if (diameter === 'N/A' && bore === 'N/A' && teeth === 'N/A' && flutes === 'N/A') return null;

    return { diameter, bore, teeth, flutes };
}

// ─── Material & Application Helpers ──────────────────────────────────────────

function getProductMaterial(p: ShopifyProduct) {
    const titleLower = p.title.toLowerCase();
    const tagsLower = p.tags?.map(t => t.toLowerCase()) || [];

    if (tagsLower.includes('diamond tools') || titleLower.includes('diamond') || titleLower.includes('pcd')) {
        return 'Diamond (PCD)';
    }
    if (tagsLower.some(t => t.includes('solid carbide')) || titleLower.includes('solid carbide')) {
        return 'Solid Carbide';
    }
    return 'Tungsten Carbide (TCT)';
}

function getProductApplications(p: ShopifyProduct) {
    const apps: string[] = [];
    const titleLower = p.title.toLowerCase();
    const tagsLower = p.tags?.map(t => t.toLowerCase()) || [];

    if (titleLower.includes('rip') || tagsLower.includes('rip saws') || titleLower.includes('ripping')) {
        apps.push('Ripping');
    }
    if (titleLower.includes('crosscut') || titleLower.includes('crosscuts')) {
        apps.push('Crosscut');
    }
    if (titleLower.includes('combination') || titleLower.includes('combo')) {
        apps.push('Combination');
    }
    if (titleLower.includes('fine finish') || titleLower.includes('ultra fine finish')) {
        apps.push('Fine Finish');
    }
    if (titleLower.includes('polish') || titleLower.includes('ultimate')) {
        apps.push('Polish / Ultimate Finish');
    }
    if (titleLower.includes('scoring') || tagsLower.includes('scoring saw blades') || tagsLower.includes('conical scoring')) {
        apps.push('Scoring');
    }
    if (titleLower.includes('grooving') || titleLower.includes('groove')) {
        apps.push('Grooving');
    }
    if (titleLower.includes('trimming') || tagsLower.includes('tree trimming saw blades')) {
        apps.push('Tree Trimming');
    }
    if (titleLower.includes('general purpose')) {
        apps.push('General Purpose');
    }
    if (tagsLower.includes('jointing') || titleLower.includes('jointing')) {
        apps.push('Jointing');
    }
    if (tagsLower.includes('rabbeting') || titleLower.includes('rabbeting')) {
        apps.push('Rabbeting');
    }
    if (tagsLower.includes('rounding') || titleLower.includes('rounding')) {
        apps.push('Rounding');
    }

    if (apps.length === 0) {
        if (p.productType === 'Cutter Heads') {
            apps.push('Jointing / Planing');
        } else {
            apps.push('General Purpose');
        }
    }
    return apps;
}

// ─── Sorting Helpers for Spec Values ──────────────────────────────────────────

function parseSizeToNumber(val: string): number {
    const cleaned = val.replace(/"|”|mm/g, '').trim();
    if (cleaned.includes('/')) {
        const parts = cleaned.split('/');
        if (parts.length === 2) {
            const num = parseFloat(parts[0]);
            const den = parseFloat(parts[1]);
            if (!isNaN(num) && !isNaN(den) && den !== 0) {
                return num / den;
            }
        }
    }
    const mixedMatch = cleaned.match(/^(\d+)(?:\s+|-)(\d+)\/(\d+)$/);
    if (mixedMatch) {
        const whole = parseFloat(mixedMatch[1]);
        const num = parseFloat(mixedMatch[2]);
        const den = parseFloat(mixedMatch[3]);
        return whole + (num / den);
    }
    return parseFloat(cleaned) || 0;
}

const sortSizes = (arr: string[]) => {
    return [...arr].sort((a, b) => {
        const aNum = parseSizeToNumber(a);
        const bNum = parseSizeToNumber(b);
        const aUnit = a.includes('"') || a.includes('”') ? 'in' : 'mm';
        const bUnit = b.includes('"') || b.includes('”') ? 'in' : 'mm';
        if (aUnit !== bUnit) {
            return aUnit === 'in' ? -1 : 1;
        }
        return aNum - bNum;
    });
};

const sortInts = (arr: string[]) => {
    return [...arr].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
};

// ─── Filter Section UI ────────────────────────────────────────────────────────

function FilterSection({ title, values, selected, onChange }: {
    title: string;
    values: string[];
    selected: string[];
    onChange: (val: string) => void;
}) {
    if (values.length === 0) return null;
    return (
        <div className="border-b border-gray-100 py-4">
            <h4 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-3 select-none">{title}</h4>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin">
                {values.map((val) => {
                    const isChecked = selected.includes(val);
                    return (
                        <label key={val} className="flex items-center gap-3 cursor-pointer group text-sm select-none font-medium">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onChange(val)}
                                className="sr-only"
                            />
                            <div className={`w-4 h-4 border-2 transition-all flex items-center justify-center shrink-0 ${isChecked
                                    ? 'bg-leuco-purple border-leuco-purple'
                                    : 'border-gray-200 group-hover:border-leuco-purple'
                                }`}>
                                {isChecked && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className={`transition-colors ${isChecked ? 'text-leuco-black font-black' : 'text-gray-600 group-hover:text-leuco-purple'}`}>
                                {val}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Main CollectionGrid Component ────────────────────────────────────────────

export default function CollectionGrid({ initialProducts, title }: CollectionGridProps) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortOption>('featured');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Selected Facet states
    const [selectedDiameters, setSelectedDiameters] = useState<string[]>([]);
    const [selectedBores, setSelectedBores] = useState<string[]>([]);
    const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);
    const [selectedFlutes, setSelectedFlutes] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

    // 1. Pre-parse all products
    const parsedProducts = useMemo(() => {
        return initialProducts.map(p => {
            const material = getProductMaterial(p);
            const applications = getProductApplications(p);

            const diameters = new Set<string>();
            const bores = new Set<string>();
            const teethSet = new Set<string>();
            const flutesSet = new Set<string>();

            const sizeOption = p.options?.find(o => o.name.toLowerCase() === 'size');
            const sizeValues = sizeOption ? sizeOption.values : p.variants.edges.map(v => v.node.title);

            for (const val of sizeValues) {
                if (!val || val.toLowerCase() === 'default title' || val.toLowerCase() === 'one size fits all' || (val.toLowerCase().includes('size') && !val.includes('x') && !val.includes('ITD'))) {
                    continue;
                }
                const specs = parseVariantSpecsUnified(val, p.productType);
                if (specs) {
                    if (specs.diameter !== 'N/A') diameters.add(specs.diameter);
                    if (specs.bore !== 'N/A') bores.add(specs.bore);
                    if (specs.teeth !== 'N/A') teethSet.add(specs.teeth);
                    if (specs.flutes !== 'N/A') flutesSet.add(specs.flutes);
                }
            }

            return {
                product: p,
                material,
                applications,
                diameters: Array.from(diameters),
                bores: Array.from(bores),
                teeth: Array.from(teethSet),
                flutes: Array.from(flutesSet),
            };
        });
    }, [initialProducts]);

    // 2. Compute all available facets for the current collection
    const allFacets = useMemo(() => {
        const diameters = new Set<string>();
        const bores = new Set<string>();
        const teethSet = new Set<string>();
        const flutesSet = new Set<string>();
        const materials = new Set<string>();
        const applications = new Set<string>();

        for (const item of parsedProducts) {
            item.diameters.forEach(d => diameters.add(d));
            item.bores.forEach(b => bores.add(b));
            item.teeth.forEach(t => teethSet.add(t));
            item.flutes.forEach(f => flutesSet.add(f));
            materials.add(item.material);
            item.applications.forEach(a => applications.add(a));
        }

        return {
            diameters: sortSizes(Array.from(diameters)),
            bores: sortSizes(Array.from(bores)),
            teeth: sortInts(Array.from(teethSet)),
            flutes: sortInts(Array.from(flutesSet)),
            materials: Array.from(materials).sort(),
            applications: Array.from(applications).sort(),
        };
    }, [parsedProducts]);

    // 3. Determine which filters should be shown for this category
    const titleLower = title.toLowerCase();
    const isSawOrCutterColl = titleLower.includes('saw') || titleLower.includes('cutter');
    const isSpiralColl = titleLower.includes('spiral') || titleLower.includes('boring');
    const isOtherColl = titleLower.includes('clamp') || titleLower.includes('kniv') || titleLower.includes('insert') || titleLower.includes('part') || titleLower.includes('accessor');

    const showTeethFilter = !isSpiralColl && !isOtherColl && allFacets.teeth.length > 0;
    const showFlutesFilter = !isSawOrCutterColl && !isOtherColl && allFacets.flutes.length > 0;
    const showBoreFilter = !isOtherColl && allFacets.bores.length > 0;
    const showDiameterFilter = allFacets.diameters.length > 0;

    // 4. Handle state mutations for checkboxes
    const toggleFilter = (selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) => {
        if (selected.includes(val)) {
            setSelected(selected.filter(item => item !== val));
        } else {
            setSelected([...selected, val]);
        }
    };

    // 5. Apply filters & sorting in real time
    const filtered = useMemo(() => {
        let result = [...parsedProducts];

        if (selectedDiameters.length > 0) {
            result = result.filter(item => item.diameters.some(d => selectedDiameters.includes(d)));
        }
        if (selectedBores.length > 0) {
            result = result.filter(item => item.bores.some(b => selectedBores.includes(b)));
        }
        if (selectedTeeth.length > 0) {
            result = result.filter(item => item.teeth.some(t => selectedTeeth.includes(t)));
        }
        if (selectedFlutes.length > 0) {
            result = result.filter(item => item.flutes.some(f => selectedFlutes.includes(f)));
        }
        if (selectedMaterials.length > 0) {
            result = result.filter(item => selectedMaterials.includes(item.material));
        }
        if (selectedApplications.length > 0) {
            result = result.filter(item => item.applications.some(a => selectedApplications.includes(a)));
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(item =>
                item.product.title.toLowerCase().includes(q) ||
                item.product.productType.toLowerCase().includes(q) ||
                item.product.tags?.some(t => t.toLowerCase().includes(q))
            );
        }

        if (inStockOnly) {
            result = result.filter(item =>
                item.product.variants.edges.some(v => v.node.availableForSale)
            );
        }

        const productsToReturn = result.map(item => item.product);

        switch (sort) {
            case 'price-asc':
                productsToReturn.sort((a, b) =>
                    parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
                );
                break;
            case 'price-desc':
                productsToReturn.sort((a, b) =>
                    parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
                );
                break;
            case 'name-asc':
                productsToReturn.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                productsToReturn.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        return productsToReturn;
    }, [parsedProducts, search, sort, inStockOnly, selectedDiameters, selectedBores, selectedTeeth, selectedFlutes, selectedMaterials, selectedApplications]);

    const hasActiveFilters =
        search.trim() !== '' ||
        inStockOnly ||
        sort !== 'featured' ||
        selectedDiameters.length > 0 ||
        selectedBores.length > 0 ||
        selectedTeeth.length > 0 ||
        selectedFlutes.length > 0 ||
        selectedMaterials.length > 0 ||
        selectedApplications.length > 0;

    const clearAll = () => {
        setSearch('');
        setSort('featured');
        setInStockOnly(false);
        setSelectedDiameters([]);
        setSelectedBores([]);
        setSelectedTeeth([]);
        setSelectedFlutes([]);
        setSelectedMaterials([]);
        setSelectedApplications([]);
    };

    // Shared filter layout
    const renderFilterPanel = () => (
        <div className="space-y-2">
            {showDiameterFilter && (
                <FilterSection
                    title="Blade Diameter"
                    values={allFacets.diameters}
                    selected={selectedDiameters}
                    onChange={toggleFilter(selectedDiameters, setSelectedDiameters)}
                />
            )}
            {showTeethFilter && (
                <FilterSection
                    title="Tooth Count"
                    values={allFacets.teeth}
                    selected={selectedTeeth}
                    onChange={toggleFilter(selectedTeeth, setSelectedTeeth)}
                />
            )}
            {showFlutesFilter && (
                <FilterSection
                    title="Flutes"
                    values={allFacets.flutes}
                    selected={selectedFlutes}
                    onChange={toggleFilter(selectedFlutes, setSelectedFlutes)}
                />
            )}
            {showBoreFilter && (
                <FilterSection
                    title="Arbor Bore"
                    values={allFacets.bores}
                    selected={selectedBores}
                    onChange={toggleFilter(selectedBores, setSelectedBores)}
                />
            )}
            <FilterSection
                title="Material"
                values={allFacets.materials}
                selected={selectedMaterials}
                onChange={toggleFilter(selectedMaterials, setSelectedMaterials)}
            />
            <FilterSection
                title="Application / Cut Type"
                values={allFacets.applications}
                selected={selectedApplications}
                onChange={toggleFilter(selectedApplications, setSelectedApplications)}
            />
        </div>
    );

    return (
        <div>
            {/* Section heading */}
            <div className="mb-8">
                <h2 className="text-4xl font-black tracking-tighter mb-2">{title}</h2>
                <div className="h-1.5 w-24 bg-leuco-purple" />
            </div>

            {/* Filter / Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 items-stretch sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products in collection..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-leuco-purple transition-colors bg-white text-leuco-black"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-sm font-black hover:border-leuco-purple transition-colors whitespace-nowrap"
                >
                    <Filter size={15} />
                    Filters
                    {(selectedDiameters.length + selectedBores.length + selectedTeeth.length + selectedFlutes.length + selectedMaterials.length + selectedApplications.length) > 0 && (
                        <span className="ml-1 bg-leuco-purple text-white text-xs px-2 py-0.5 rounded-full font-black">
                            {selectedDiameters.length + selectedBores.length + selectedTeeth.length + selectedFlutes.length + selectedMaterials.length + selectedApplications.length}
                        </span>
                    )}
                </button>

                {/* Sort dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen((o) => !o)}
                        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-200 bg-white text-sm font-black hover:border-leuco-purple transition-colors whitespace-nowrap"
                    >
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={15} />
                            {SORT_LABELS[sort]}
                        </div>
                        <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {sortOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-xl z-20 min-w-[200px]">
                                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => { setSort(key); setSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors ${sort === key ? 'text-leuco-purple font-black bg-leuco-purple/5' : ''}`}
                                    >
                                        {SORT_LABELS[key]}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* In-stock toggle */}
                <button
                    onClick={() => setInStockOnly((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-black transition-all whitespace-nowrap ${inStockOnly
                        ? 'bg-leuco-purple text-white border-leuco-purple'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-leuco-purple'
                        }`}
                >
                    <span className={`w-3 h-3 rounded-full border-2 transition-colors ${inStockOnly ? 'bg-white border-white' : 'border-gray-400'}`} />
                    In Stock Only
                </button>

                {/* Clear all */}
                {hasActiveFilters && (
                    <button
                        onClick={clearAll}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-black text-gray-500 hover:text-leuco-purple transition-colors whitespace-nowrap"
                    >
                        <X size={14} />
                        Clear
                    </button>
                )}
            </div>

            {/* Core Layout: Sidebar + Grid */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-[260px] shrink-0 sticky top-24 bg-white border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-2">
                        <span className="text-sm font-black tracking-tight flex items-center gap-2 text-leuco-black">
                            <Filter size={14} className="text-leuco-purple" />
                            Filters
                        </span>
                        {hasActiveFilters && (
                            <button onClick={clearAll} className="text-xs font-black text-leuco-purple hover:underline">
                                Clear All
                            </button>
                        )}
                    </div>
                    {renderFilterPanel()}
                </div>

                {/* Grid Area */}
                <div className="flex-1 w-full">
                    {/* Results count */}
                    <p className="text-xs font-black text-gray-400 tracking-widest uppercase mb-6">
                        {filtered.length} of {initialProducts.length} {initialProducts.length === 1 ? 'product' : 'products'}
                    </p>

                    {filtered.length === 0 ? (
                        <div className="py-24 text-center border border-dashed border-gray-200">
                            <p className="text-2xl font-black text-gray-300 mb-2">No products found</p>
                            <p className="text-sm text-gray-400 font-medium mb-6">Try adjusting your search or active filters.</p>
                            <button onClick={clearAll} className="bg-leuco-purple text-white px-6 py-3 font-black text-sm transition-colors hover:bg-leuco-purple/95">
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
                    {/* Content */}
                    <div className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-50 p-6 overflow-y-auto flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                            <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                                <Filter size={16} className="text-leuco-purple" />
                                Filters
                            </h3>
                            <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1">
                            {renderFilterPanel()}
                        </div>
                        <div className="pt-6 border-t border-gray-100 mt-6 flex gap-3">
                            <button onClick={clearAll} className="flex-1 py-3 border border-gray-200 text-sm font-black text-gray-500 hover:border-leuco-purple hover:text-leuco-purple transition-colors">
                                Clear All
                            </button>
                            <button onClick={() => setMobileFiltersOpen(false)} className="flex-1 py-3 bg-leuco-purple text-white text-sm font-black transition-colors hover:bg-leuco-purple/90">
                                View Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
