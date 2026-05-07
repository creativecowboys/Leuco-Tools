import re

filepath = '/Users/cowboysmac/Creative Cowboys Dropbox/Creative Cowboys/Anti-Gravity/Leuco Tools/lib/blog-articles.ts'

with open(filepath, 'r') as f:
    lines = f.readlines()

# Keep lines 1-513 (indices 0-512) — up to and including the HeatSync closing '  },'
kept = lines[:513]

# The new content to append (all remaining articles + closing)
new_articles = '''  "leuco-t3-system": {
    slug: "leuco-t3-system",
    title: "LEUCO t3-System",
    blog: "tooling-innovations",
    intro: "LEUCO\\u2019s t3-System is setting a new standard in solid wood and wood-based material machining. With patent-pending triangular turnover knives and an innovative shear-angle design, the t3-System delivers chip-free surfaces, superior edge quality, and zero overcuts \\u2014 proven in head-to-head testing against leading competitors at Weinmann\\u2019s multifunction bridge facility.",
    featuresSectionLabel: "WHY CHOOSE THE t3-SYSTEM",
    heroCta: { label: "SHOP t3-SYSTEM", href: "https://shopleuco.com/collections/t3-system" },
    shopSystemHref: "https://shopleuco.com/collections/t3-system",
    sections: [
      { heading: "Faster Feed, Superior Chip Evacuation", paragraphs: ["In head-to-head testing at Weinmann, the t3-System achieved 12 m/min feed rates using only 30% spindle power \\u2014 while the competitor produced burn marks at 10 m/min. Optimized spiral plunge-cutting and chip evacuation keep gullets clear and dust extraction efficient."] },
      { heading: "Centered Shear Angle, No Overcuts", paragraphs: ["Triangular knives are positioned so cutting pressure acts inward \\u2014 eliminating the overcuts that plague standard square-insert tools. The result: clean edges, no burn marks, and no rework, even when cutting crossgrain or across the grain."] },
      { heading: "Drill and Chamfer in One Pass", paragraphs: ["The 45\\u00b0 upper cutting edges allow drilling and chamfering to happen simultaneously, eliminating a separate process step and saving measurable production time on every hole."] },
      { heading: "Easy Maintenance, 10-Minute Knife Change", paragraphs: ["All 18 turnover knives can be removed, cleaned, and repositioned in 10\\u201315 minutes with a standard Allen key. Three cutting edges per knife extend tool life well beyond standard square-insert competitors."] },
    ],
    interstitialBanner: {
      headline: "The Triangular Form Defeats The Square Form",
      subtext: "Proven in live comparison testing at Weinmann \\u2014 superior edge quality, zero burn marks, zero rework.",
      backgroundImage: "/blog-images/t3-banner.jpg",
      style: "dark",
      ctaHref: "https://shopleuco.com/collections/t3-system",
      ctaLabel: "SHOP t3-SYSTEM",
    },
    productCards: [
      {
        heading: "t3-System Shank-Type Cutter",
        description: "The flagship t3 cutter for CNC machines and joinery machinery. Patent-pending triangular turnover knives at optimized shear angles deliver chip-free socket holes, cable ducts, and freeform cuts \\u2014 in one pass, with no overcuts.",
        image: { src: "/blog-images/t3-banner.jpg", alt: "LEUCO t3-System Cutter" },
        ctaLabel: "SHOP t3-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/t3-system",
        imageRight: false,
      },
      {
        heading: "Test Results: t3 vs. Square Insert",
        description: "Side-by-side results from Weinmann\\u2019s WALLTEC M-300 testing: LEUCO t3 achieved 12 m/min at 30% spindle power with zero burn marks. The competitor showed burn marks before reaching 10 m/min.",
        image: { src: "/blog-images/t3-test-01.jpg", alt: "t3 System test result" },
        ctaLabel: "SHOP t3-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/t3-system",
        imageRight: true,
      },
      {
        heading: "Edge Quality Detail",
        description: "A clear milling quality result: chip-free edges, no burn marks, and a clean 45\\u00b0 chamfer produced in a single pass. The t3 consistently outperforms conventional tooling in finish quality.",
        image: { src: "/blog-images/t3-test-02.jpg", alt: "t3 System edge quality" },
        ctaLabel: "SHOP t3-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/t3-system",
        imageRight: false,
      },
    ],
    images: [{"src": "/blog-images/t3-banner.jpg", "alt": "LEUCO t3-System"}, {"src": "/blog-images/t3-test-01.jpg", "alt": "t3-System Test Result 1"}, {"src": "/blog-images/t3-test-02.jpg", "alt": "t3-System Test Result 2"}, {"src": "/blog-images/t3-test-03.jpg", "alt": "t3-System Test Result 3"}],
  },
  "leuco-plastics-processing": {
    slug: "leuco-plastics-processing",
    title: "LEUCO Plastics Processing",
    blog: "tooling-innovations",
    intro: "As plastics become increasingly common in furniture and kitchen applications, the challenges of cutting them cleanly and efficiently grow with them. LEUCO\\u2019s Plastics Processing saw blades are purpose-engineered for thermoplastics, polycarbonate, PMMA, anti-fingerprint coatings, and abrasive thermosets \\u2014 minimizing cutting marks and eliminating the need to rework visible edges.",
    sections: [
      { heading: "Designed for Thermoplastics & Thermosets", paragraphs: ["Thermoplastics like polycarbonate and polystyrene melt when sawn with standard blades. Thermosets like HPL tend to chip. LEUCO\\u2019s Plastics blades address both challenges with precision tooth geometry, close pitch, and optimized heat management."] },
      { heading: "The G5 Specialty Blade", paragraphs: ["LEUCO\\u2019s Highline Tungsten Carbide G5 Saw Blade for Thin Plastics provides the highest quality when sawing thin polycarbonate panels, twin-wall sheets, and extruded polystyrene. Convex tooth sides prevent groove formation and surface flares on sensitive materials."] },
      { heading: "LowNoise & Precision Tolerances", paragraphs: ["Available in a LowNoise configuration to reduce vibration and auxiliary noise for machine operators. Topline-quality run-out and concentricity tolerances ensure consistent, repeatable results cut after cut."] },
      { heading: "- Minimize Cutting Marks", paragraphs: [] },
      { heading: "- Eliminate Reworking Edges", paragraphs: [] },
      { heading: "- Precision Run-Out", paragraphs: [] },
      { heading: "- Low Noise Options", paragraphs: [] },
      { heading: "- Expansion Slots Available", paragraphs: [] },
      { heading: "- Versatile Compatibility", paragraphs: [] },
    ],
    images: [],
  },
  "leuco-airface-system": {
    slug: "leuco-airface-system",
    title: "LEUCO airFace System",
    blog: "tooling-innovations",
    intro: "Inspired by the silent flight of the owl, LEUCO\\u2019s airFace System introduces a patent-pending surface technology to diamond-tipped jointing cutters that measurably reduces idle noise \\u2014 up to 2 dB(A) \\u2014 while improving airflow around the cutting edges. The result is the quietest jointing cutter with a steel body on the market.",
    featuresSectionLabel: "WHY CHOOSE airFace",
    heroCta: { label: "SHOP AIRFACE CUTTERS", href: "https://shopleuco.com/collections/cutter-heads" },
    shopSystemHref: "https://shopleuco.com/collections/cutter-heads",
    sections: [
      { heading: "The Owl Wing Principle", paragraphs: ["Owl feathers feature a serrated trailing edge that scatters turbulent airflow, enabling nearly noiseless flight. LEUCO adapted this principle to the body grooves of jointing cutters \\u2014 the irregular \\u201cowl-wing edge\\u201d gullet channels airflow at the cutting edge, reducing the turbulence that causes idle-running noise."] },
      { heading: "Measurable Noise Reduction", paragraphs: ["DIAMAX airFace and SmartJointer airFace: -1 dB(A) at idle vs. their already-quiet predecessors. DIAREX airFace: -2 dB(A) at idle. These are the quietest steel-body jointing cutters available."] },
      { heading: "No Studs, Better Airflow", paragraphs: ["The airFace design eliminates the studs behind the cutting edge that were previously required for stability. A tungsten carbide supporting plate provides rigidity, while the stud-free body surface allows optimal airflow channeling across the entire tool."] },
      { heading: "Precision Balancing", paragraphs: ["Traditional balancing used bores drilled into the body \\u2014 disrupting the surface and airflow. airFace tools use defined threads for balancing screws, maintaining surface integrity and preserving the aerodynamic benefit of the airFace profile."] },
    ],
    interstitialBanner: {
      headline: "Always One Wing Beat Ahead",
      subtext: "The quietest jointing cutters with steel body on the market \\u2014 engineered from nature\\u2019s example.",
      backgroundImage: "/blog-images/airface-poster.png",
      style: "dark",
      ctaHref: "https://shopleuco.com/collections/cutter-heads",
      ctaLabel: "SHOP AIRFACE CUTTERS",
    },
    productCards: [
      {
        heading: "LEUCO SmartJointer airFace",
        description: "Exchangeable stainless steel segments, easy replacement with minimal accessories, lightweight aluminum body with constant diameter, and the full noise-reducing airFace surface. -1 dB(A) at idle vs. the previous generation.",
        image: { src: "/blog-images/airface-jointer.jpg", alt: "LEUCO SmartJointer airFace" },
        ctaLabel: "SHOP AIRFACE CUTTERS",
        ctaHref: "https://shopleuco.com/collections/cutter-heads",
        imageRight: false,
      },
      {
        heading: "The Owl Wing Inspiration",
        description: "The serrated trailing edge of owl feathers scatters turbulent air, enabling silent flight. LEUCO\\u2019s engineers applied this principle to tool body grooves \\u2014 creating an irregular gullet profile that channels air and measurably reduces noise emission.",
        image: { src: "/blog-images/airface-owl.jpg", alt: "Owl wing bionik inspiration" },
        ctaLabel: "LEARN MORE",
        ctaHref: "https://shopleuco.com/collections/cutter-heads",
        imageRight: true,
      },
      {
        heading: "Before vs. After airFace",
        description: "Before airFace: Air turbulences at the cutting edge generated noise that negatively impacted the working environment. After airFace: The owl-wing gullet channels airflow and scatters turbulence \\u2014 measurably quieter at every rpm.",
        image: { src: "/blog-images/airface-after.jpg", alt: "After airFace noise reduction" },
        ctaLabel: "SHOP AIRFACE CUTTERS",
        ctaHref: "https://shopleuco.com/collections/cutter-heads",
        imageRight: false,
      },
    ],
    images: [{"src": "/blog-images/airface-poster.png", "alt": "LEUCO airFace System"}, {"src": "/blog-images/airface-owl.jpg", "alt": "Owl wing bionik inspiration"}, {"src": "/blog-images/airface-jointer.jpg", "alt": "LEUCO Diamond SmartJointer airFace"}, {"src": "/blog-images/airface-before.jpg", "alt": "Before airFace"}, {"src": "/blog-images/airface-after.jpg", "alt": "After airFace"}],
  },
  "leuco-hp-spirals": {
    slug: "leuco-hp-spirals",
    title: "LEUCO HP Spirals",
    blog: "tooling-innovations",
    intro: "LEUCO HP Spirals are the trusted workhorses of CNC panel processing \\u2014 used for sizing, jointing, grooving, and dividing, with a helical cutting edge that produces excellent chip-free finishes at high feed rates. Re-sharpenable and cost-effective, they deliver 2\\u20133\\u00d7 the edge life of standard carbide spirals.",
    featuresSectionLabel: "CHOOSE THE RIGHT SPIRAL",
    heroCta: { label: "SHOP HP SPIRALS", href: "https://shopleuco.com/collections/hp-spirals" },
    shopSystemHref: "https://shopleuco.com/collections/hp-spirals",
    sections: [
      { heading: "Why Spirals?", paragraphs: ["The helical or spiral cutting edge produces an excellent chip-free finish on the material being cut at high rates of feed. They are relatively low in cost, re-sharpenable, and suitable for a wide range of panel materials."] },
      { heading: "Upcut", paragraphs: ["Best cut quality on the panel\\u2019s bottom surface. Chips evacuate upward, keeping the lower face clean."] },
      { heading: "Downcut", paragraphs: ["Best cut quality on the panel\\u2019s upper surface. Chips evacuate downward for a clean top edge."] },
      { heading: "Compression", paragraphs: ["Combines upcut and downcut edges for excellent quality on both upper and lower surfaces. Available in standard (thicker panels) and mortise (thinner panels and grooves) variations."] },
      { heading: "Coatings & Service", paragraphs: ["Most HP Spirals are coated to reduce heat at the carbide edge, extending tool life. Regular resharpening and proper service intervals are key to maintaining optimal performance."] },
    ],
    productCards: [
      {
        heading: "HP Compression Spiral",
        description: "The most versatile HP Spiral \\u2014 combining upcut and downcut edges for chip-free finishes on both panel faces. The overlap zone must be positioned in the panel core for best results. Available in standard and mortise configurations.",
        image: { src: "/blog-images/hp-spirals-compression.png", alt: "Compression and DownCut spiral types" },
        ctaLabel: "SHOP HP SPIRALS",
        ctaHref: "https://shopleuco.com/collections/hp-spirals",
        imageRight: false,
      },
      {
        heading: "HP Spirals at IWF",
        description: "LEUCO HP Spirals are proven on the show floor and in production environments worldwide. A staple of the CNC woodworking industry, trusted for their consistent quality, re-sharpenability, and edge-life advantage over standard tooling.",
        image: { src: "/blog-images/hp-spirals-iwf.jpg", alt: "LEUCO HP Spirals" },
        ctaLabel: "SHOP HP SPIRALS",
        ctaHref: "https://shopleuco.com/collections/hp-spirals",
        imageRight: true,
      },
    ],
    images: [{"src": "/blog-images/hp-spirals-compression.png", "alt": "Compression and DownCut spiral types"}, {"src": "/blog-images/hp-spirals-iwf.jpg", "alt": "LEUCO HP Spirals"}],
  },
  "leuco-nn-system": {
    slug: "leuco-nn-system",
    title: "LEUCO nn-System",
    blog: "tooling-innovations",
    intro: "LEUCO\\u2019s NoNoise (nn) System reduces the idle-running noise of diamond-tipped saw blades by up to 6 dB(A) \\u2014 a radical improvement achieved through minimized gullets and innovative HR tooth geometry. The result: a quieter workshop, superior cutting quality, and compatibility across table saws, panel sizing saws, miter saws, and CNC machines.",
    featuresSectionLabel: "WHY CHOOSE THE nn-SYSTEM",
    heroCta: { label: "SHOP nn-SYSTEM", href: "https://shopleuco.com/collections/nn-system" },
    shopSystemHref: "https://shopleuco.com/collections/nn-system",
    sections: [
      { heading: "Up to 6 dB(A) Quieter at Idle", paragraphs: ["Standard diamond-tipped saw blades \\u201cwhistle\\u201d at idle \\u2014 sometimes louder than during operation. The nn-System\\u2019s minimized gullet design directly attacks this source of noise, delivering a measurable 6 dB(A) reduction compared to conventional diamond-tipped blades."] },
      { heading: "Innovative HR Tooth Geometry", paragraphs: ["The \\u201cHR\\u201d hollow back tooth noticeably reduces cutting pressure while enabling near-zero backlash. This delivers excellent cutting quality across nearly all wooden panels, including high-gloss coatings and solid timber."] },
      { heading: "2.5mm Cutting Width, Many Diameters", paragraphs: ["nn-System blades are available in a range of diameters for final trimming saws, table saws, vertical panel sizing saws, miter saws, and through-feed machines \\u2014 all with a precision 2.5mm cutting width for minimal kerf loss."] },
      { heading: "Scoring Blades Available", paragraphs: ["Diamond-tipped scoring saw blades and conical alternate top bevel teeth are available to complete the nn-System setup for two-sided scoring machines."] },
    ],
    productCards: [
      {
        heading: "Acoustic Comparison: Without nn-System",
        description: "A standard tungsten carbide saw blade at 3,000 rpm on a Holz-Her table saw generates substantial idle-running noise \\u2014 visible as a loud \\u2018hot spot\\u2019 in acoustic camera imaging. Standard diamond-tipped blades at 4,500 rpm on a MAKA CNC show a similar pattern.",
        image: { src: "/blog-images/nn-without.jpg", alt: "Acoustic camera without nn-System" },
        ctaLabel: "SHOP nn-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/nn-system",
        imageRight: false,
      },
      {
        heading: "Acoustic Comparison: With nn-System",
        description: "The LEUCO nn-System blade at the same rpm shows dramatically reduced noise in acoustic camera imaging \\u2014 up to 6 dB(A) quieter at idle. Less noise means a healthier work environment and compliance with increasingly strict industrial noise regulations.",
        image: { src: "/blog-images/nn-with.jpg", alt: "Acoustic camera with nn-System" },
        ctaLabel: "SHOP nn-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/nn-system",
        imageRight: true,
      },
    ],
    images: [{"src": "/blog-images/nn-without.jpg", "alt": "Acoustic camera without nn-System"}, {"src": "/blog-images/nn-with.jpg", "alt": "Acoustic camera with nn-System"}],
  },
  "leuco-p-system": {
    slug: "leuco-p-system",
    title: "LEUCO p-System",
    blog: "tooling-innovations",
    intro: "LEUCO\\u2019s p-System represents the pinnacle of face-shear technology \\u2014 a 70-degree shear angle that nearly doubles the capability of conventional diamond tools. The \\u201cp\\u201d stands for Peeling: the cutting edge doesn\\u2019t mill in the traditional sense, it peels fibers away with extraordinary force, achieving finish-cut quality on even the most demanding fibrous and exotic materials.",
    featuresSectionLabel: "THE p-SYSTEM ADVANTAGE",
    heroCta: { label: "SHOP p-SYSTEM", href: "https://shopleuco.com/collections/p-system" },
    shopSystemHref: "https://shopleuco.com/collections/p-system",
    sections: [
      { heading: "It\\u2019s All About Face Shear", paragraphs: ["The evolution of face shear: carbide insert tools at 0\\u201315\\u00b0, then diamond tools at 35\\u201345\\u00b0, then the p-System at 70\\u00b0 \\u2014 nearly double the shear of previous tools. The p-System\\u2019s extreme shear angle makes the impossible possible on fibrous and challenging materials."] },
      { heading: "Finish-Cut Quality, No Post-Processing", paragraphs: ["The p-System produces edges in finish-cut quality. Time-consuming grinding is no longer necessary. Edges come off the machine ready for assembly."] },
      { heading: "Chip-Free on Veneered Boards", paragraphs: ["Cutting veneer like a sharp knife \\u2014 the p-System exerts minimal cutting force and makes a clean cut regardless of whether the veneer overlap is 2mm or 10mm."] },
      { heading: "Fibrous & Exotic Materials", paragraphs: ["Thanks to the large shear angle, fibers are cleanly cut and often don\\u2019t require post-processing. Ideal for materials that are impossible to finish-cut with conventional tooling."] },
    ],
    productCards: [
      {
        heading: "Finished Cut \\u2014 No Rework",
        description: "The p-System produces edges in finish-cut quality. Time-consuming grinding is eliminated. The peeling action of the 70\\u00b0 shear angle cleanly severs fibers rather than tearing them, delivering a surface ready for the next step.",
        image: { src: "/blog-images/p-system-02.jpg", alt: "p-System finished cut quality" },
        ctaLabel: "SHOP p-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/p-system",
        imageRight: false,
      },
      {
        heading: "Reduce Downtime",
        description: "In end-grain cutting, the p-System allows the cutting head to pass the edge against the feed without causing edge chipping \\u2014 a critical advantage that eliminates costly interruptions and rework cycles.",
        image: { src: "/blog-images/p-system-01.jpg", alt: "p-System reduces downtime" },
        ctaLabel: "SHOP p-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/p-system",
        imageRight: true,
      },
      {
        heading: "Chip-Free Veneered Boards",
        description: "The p-System cuts veneer with minimal force \\u2014 like a sharp knife. Clean cuts regardless of whether the veneer overlap is 2mm or 10mm. Applicable to edge banding, through-feed, and stationary machines.",
        image: { src: "/blog-images/p-system-03.jpg", alt: "p-System chip-free jointing" },
        ctaLabel: "SHOP p-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/p-system",
        imageRight: false,
      },
      {
        heading: "Fibrous & Exotic Materials",
        description: "The large shear angle cleanly severs even the most fibrous exotic materials \\u2014 often without post-processing. The p-System handles materials that are impossible to finish-cut with lower-shear tools.",
        image: { src: "/blog-images/p-system-04.jpg", alt: "p-System exotic materials" },
        ctaLabel: "SHOP p-SYSTEM",
        ctaHref: "https://shopleuco.com/collections/p-system",
        imageRight: true,
      },
    ],
    images: [{"src": "/blog-images/p-system-01.jpg", "alt": "p-System saves time"}, {"src": "/blog-images/p-system-02.jpg", "alt": "p-System finished cut"}, {"src": "/blog-images/p-system-03.jpg", "alt": "p-System chip-free"}, {"src": "/blog-images/p-system-04.jpg", "alt": "p-System exotics"}],
  },
};\n'''

with open(filepath, 'w') as f:
    f.writelines(kept)
    f.write(new_articles)

print("Done. Total lines:", len(kept) + new_articles.count('\\n'))
