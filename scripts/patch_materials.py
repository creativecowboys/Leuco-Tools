import re

FILE = '/Users/cowboysmac/Creative Cowboys Dropbox/Creative Cowboys/Anti-Gravity/Leuco Tools/lib/blog-articles.ts'

with open(FILE, 'r') as f:
    content = f.read()

CONTACT = "https://shopleuco.com/pages/contact-us-1"
CTA = "REQUEST A SAMPLE CUT"

ARTICLES = [
    {
        "slug": "foam-glass-sandwich-material-cutting-solutions",
        "img": "foam-glass",
        "label": "FOAM GLASS SANDWICH CUTTING SOLUTIONS",
        "headline": "Precision Cutting for Composite Materials",
        "subtext": "From foam core to outer skin — LEUCO tools handle it all with engineered precision.",
        "c1h": "About Foam Glass Sandwich Panels",
        "c1d": "Foam Glass Sandwich Panels combine a foam glass core between protective skins of aluminum, carbon fiber, or FRP. Their lightweight structure and thermal insulation make them ideal for aircraft, ships, vehicles, RVs, and medical equipment — but their composition demands specialized cutting solutions.",
        "c2h": "LEUCO Cutting Solutions for Foam Glass Sandwich",
        "c2d": "LEUCO offers innovative cutting, drilling, and boring solutions specifically engineered for foam glass sandwich panels. Our tools achieve clean, precise cuts while minimizing waste and maximizing efficiency — giving manufacturers the capability to produce high-quality products from this challenging composite material. Contact us today to get a sample cut.",
    },
    {
        "slug": "mineral-composite-material-cutting-solutions",
        "img": "mineral-composite",
        "label": "MINERAL COMPOSITE CUTTING SOLUTIONS",
        "headline": "Cut Mineral Composites with Confidence",
        "subtext": "Specialized tooling for Corian\u00ae, quartz, and acrylic composite surfaces.",
        "c1h": "About Mineral Composite Materials",
        "c1d": "Mineral composites blend one-third acrylic resin with two-thirds minerals such as quartz or granite. The result is a robust, non-porous, easy-to-clean material prized for kitchen countertops and sinks. Corian\u00ae, a well-known mineral composite brand, offers seamless, wear-resistant surfaces popular across residential and commercial applications.",
        "c2h": "LEUCO Solutions for Mineral Composites",
        "c2d": "LEUCO provides specialized tooling for cutting, drilling, boring, and processing mineral composites. Our expertise ensures precision and efficiency in manufacturing — helping businesses overcome the inherent challenges of working with these dense, durable materials without compromising the integrity of the finished product.",
    },
    {
        "slug": "maridur-30-70-material-cutting-solutions",
        "img": "maridur",
        "label": "MARIDUR 30-70 CUTTING SOLUTIONS",
        "headline": "The Interior & Exterior Material — Done Right",
        "subtext": "Maridur 30-70 cutting solutions from the experts in precision tooling.",
        "c1h": "About Maridur 30-70",
        "c1d": "Maridur 30-70 is a high-performance engineering material composed of densely packed synthetic resin, prized for its dimensional stability and resistance to deformation. It is widely used for interior finishing products including lateral panels, front panels, handrails, insulating glass panes, cornices, skirting boards, and ceiling claddings.",
        "c2h": "LEUCO Solutions for Maridur 30-70",
        "c2d": "LEUCO provides cutting-edge tooling solutions specifically designed to handle the unique challenges of Maridur 30-70. Our advanced tool technology ensures precise cuts and extends tool life, reducing downtime and increasing productivity. We stand out as one of the few companies offering tailored solutions for processing Maridur materials at scale.",
    },
    {
        "slug": "lightweight-plywood-material-cutting-solutions",
        "img": "lightweight-plywood",
        "label": "LIGHTWEIGHT PLYWOOD CUTTING SOLUTIONS",
        "headline": "Lightweight Results. Heavyweight Performance.",
        "subtext": "Albasia, Poplar, Kiritec — LEUCO tools deliver precision cuts without splintering.",
        "c1h": "About Lightweight Plywood",
        "c1d": "Lightweight plywood — known by names like Albasia, Kiritec, Joiner Board, and Poplar Chipboard — offers an excellent balance of strength and weight. It is particularly valuable in boat building, furniture manufacturing, interior design, roofing, caravans, exhibition stands, partition walls, and door making.",
        "c2h": "LEUCO Solutions for Lightweight Plywood",
        "c2d": "LEUCO provides advanced tooling specifically designed for the delicate nature of lightweight plywood. Our tools help manufacturers achieve precision cuts and perfect finishes, enhancing production efficiency and quality. You can trust the integrity of LEUCO tools to handle the versatility of lightweight plywood without splintering or inaccurate cuts.",
    },
    {
        "slug": "felt-panel-material-cutting-solutions",
        "img": "felt-panel",
        "label": "FELT PANEL CUTTING SOLUTIONS",
        "headline": "Clean Cuts Through Felt. Every Time.",
        "subtext": "Specialized tooling that handles dense fibrous materials without fraying.",
        "c1h": "About Architectural Felt Panels",
        "c1d": "Architectural felt panels are used as acoustic panels in open-plan offices, conference rooms, and public spaces. They also serve in furniture design, wall coverings, and partition solutions. Made from recycled materials, they contribute to eco-friendly building practices while providing both visual interest and functional sound management.",
        "c2h": "LEUCO Solutions for Felt Panels",
        "c2d": "LEUCO has positioned itself as a leader in providing solutions for cutting felt panels. Our specialized cutting tools handle the unique properties of felt panels — ensuring clean, precise cuts while maximizing tool longevity. This capability is crucial for manufacturers who rely on efficient production processes and high-quality end products.",
    },
    {
        "slug": "laminated-glass-material-cutting-solutions",
        "img": "laminated-glass",
        "label": "LAMINATED GLASS CUTTING SOLUTIONS",
        "headline": "Laminated Glass Cut to Perfection",
        "subtext": "LEUCO blades engineered to cut through PVB interlayers cleanly and safely.",
        "c1h": "About Laminated Glass",
        "c1d": "Laminated glass is crafted by bonding two sheets of glass together with a polyvinyl butyral (PVB) interlayer. It maintains its structure when broken, blocks up to 99% of UV rays, and provides superior acoustic performance. It is widely used for windows, doors, shopfronts, partitioning, and noise-sensitive environments like schools and hospitals.",
        "c2h": "LEUCO Solutions for Laminated Glass",
        "c2d": "LEUCO engineers have developed specialized blades and techniques that address the unique challenges of laminated glass and its PVB interlayer. This innovation simplifies the cutting process while preserving the integrity and performance of the material. For businesses who need to work with laminated glass, LEUCO offers a reliable and efficient solution.",
    },
    {
        "slug": "expanded-glass-material-cutting-solutions",
        "img": "expanded-glass",
        "label": "EXPANDED GLASS CUTTING SOLUTIONS",
        "headline": "Expanded Glass. Expanded Possibilities.",
        "subtext": "LEUCO tools handle the porous, brittle nature of expanded glass with precision.",
        "c1h": "About Expanded Glass Panels",
        "c1d": "Expanded glass panels (sometimes called Verolith) are lightweight, highly insulating materials made from recycled glass heated until expansion creates a porous structure. They are ideal for energy-efficient buildings, lightweight concrete, carrier plates, plasterboard, acoustic panels, and sophisticated 3D architectural elements.",
        "c2h": "LEUCO Solutions for Expanded Glass",
        "c2d": "LEUCO offers innovative cutting tools tailored specifically for expanded glass panels. Our tools address the material\u2019s unique challenges — its porous nature and potential brittleness — ensuring precise cuts and minimal waste. LEUCO\u2019s expertise in tool development makes us the go-to choice for manufacturers working with expanded glass and specialty materials.",
    },
    {
        "slug": "anti-fingerprint-coated-material-cutting-solutions",
        "img": "anti-fingerprint",
        "label": "ANTI-FINGERPRINT PANEL CUTTING SOLUTIONS",
        "headline": "Preserve the Coating. Perfect the Cut.",
        "subtext": "LEUCO blades prevent chipping, cracking, and peeling on anti-fingerprint panels.",
        "c1h": "About Anti-Fingerprint Coated Panels",
        "c1d": "Anti-fingerprint coated panels resist fingerprints, smudges, and stains — making them ideal for kitchen cabinets, office furniture, and public installations. They enhance aesthetics and increase durability, providing protection against scratches and daily wear. The coating is delicate, however, and demands precision cutting to preserve its surface integrity.",
        "c2h": "LEUCO Solutions for Anti-Fingerprint Panels",
        "c2d": "LEUCO has developed advanced cutting tools and methodologies specifically designed to handle anti-fingerprint coated panels with precision. Our solutions ensure clean cuts that preserve the integrity of the coating, setting us apart in an industry where such expertise is rare. We are a leader in supporting manufacturers who aim to deliver perfection.",
    },
    {
        "slug": "aluminum-profile-material-cutting-solutions",
        "img": "aluminum-profile",
        "label": "ALUMINUM PROFILE CUTTING SOLUTIONS",
        "headline": "Aluminum Profiles. No Burrs. No Compromise.",
        "subtext": "Straight cuts and miter cuts with minimal burr formation on every profile.",
        "c1h": "About Aluminum Window Profile Material",
        "c1d": "Aluminum Window Profile material provides durability, strength, and corrosion resistance. With sealing profiles and foam core insulation, it enhances weather resistance, stops drafts, optimizes thermal insulation, and improves energy efficiency. Its sleek, modern design is favored by architects and engineers across residential, commercial, and automotive industries.",
        "c2h": "LEUCO Solutions for Aluminum Profiles",
        "c2d": "LEUCO provides industry-leading cutting tool solutions specifically paired with expert support for aluminum profile cutting. We help manufacturers achieve straight and miter cuts with minimal burr formation, accurate dimensions for proper sealing and insulation, and controlled heat management during the cutting process. We\u2019re your ally in production and profitability for life.",
    },
    {
        "slug": "plastic-profile-cutting-solutions",
        "img": "plastic-profile",
        "label": "PLASTIC PROFILE CUTTING SOLUTIONS",
        "headline": "Plastic Profiles Cut Clean. Every Time.",
        "subtext": "Polished cutting edges for higher feed rates — without heat damage.",
        "c1h": "About Plastic Window Profiles",
        "c1d": "Plastic window profiles (uPVC) are made from unplasticized polyvinyl chloride — lightweight yet strong, resistant to weathering, corrosion, and rot. They are widely used for residential and commercial window frames, renovation projects, architectural designs, high-rise applications, and sliding windows and doors.",
        "c2h": "LEUCO Solutions for Plastic Profiles",
        "c2d": "LEUCO provides the highest quality HW tools with polished cutting edges that enable cleaner cuts at higher feed rates — avoiding the heat buildup that causes melting, warping, and burr formation. If you\u2019re tired of thermal deformation and material adhesion in your door and window profile production, LEUCO has the tools and expertise to vault your enterprise to the top.",
    },
    {
        "slug": "foam-composite-cutting-solutions",
        "img": "foam-composite",
        "label": "FOAM COMPOSITE CUTTING SOLUTIONS",
        "headline": "Foam Composite — The Future of Lightweight Manufacturing",
        "subtext": "LEUCO tools process foam core panels without tearing the planking or middle layer.",
        "c1h": "About Foam Composite Material",
        "c1d": "Foam Composite (decorative sandwich panel) is made by a multi-layer process: two outer shells — often plywood — over a foam core. Benefits include better insulation, outstanding moisture resistance, great weight-to-thickness ratio, and broad customization. Known for use as outer skin for caravans, RVs, and marine vehicles, its uses are predicted to be unlimited.",
        "c2h": "LEUCO Solutions for Foam Composite",
        "c2d": "LEUCO offers industry-leading foam composite cutting solutions that increase productivity, accuracy, and profitability. We provide the most advanced technology available, from experts in helping the manufacturing industry. Our solutions save time and money, help avoid wasted materials, and deliver peace of mind for all your foam composite manufacturing needs.",
    },
    {
        "slug": "lightweight-panel-cutting-solutions",
        "img": "lightweight-panel",
        "label": "LIGHTWEIGHT PANEL CUTTING SOLUTIONS",
        "headline": "Lightweight Panel. Maximum Precision.",
        "subtext": "Efficiency Poplar and Lightweight Plywood Panel — cut without delamination.",
        "c1h": "About Lightweight Panel Material",
        "c1d": "Lightweight Panel material (also known as Efficiency Poplar or Lightweight Plywood Panel) is popular across furniture, automotive, caravans, and interior building construction. Its strength and lightweight properties combined with soundproofing and thermal insulating capabilities make it an excellent option for designers and engineers across many industries.",
        "c2h": "LEUCO Solutions for Lightweight Panels",
        "c2d": "LEUCO provides cutting-edge technology and expert support to ensure longer edge life, superior cut quality, and reduced noise levels in lightweight panel production. Our tools are engineered to cut without delamination or surface damage — staying ahead of your production needs and helping you save money and time in the long run.",
    },
    {
        "slug": "magnetic-board-cutting-solutions",
        "img": "magnetic-board",
        "label": "MAGNETIC BOARD CUTTING SOLUTIONS",
        "headline": "Magnetic Board Cut Right — Every Time",
        "subtext": "Specialized tool geometries for the steel-laminate and organic core combination.",
        "c1h": "About Magnetic Board Material",
        "c1d": "Magnetic board (magnet bond board) is made with a wood or fiberboard base covered in ferromagnetic high-pressure laminate such as steel. The result is a durable board that attracts magnets with a smooth writing surface, available in a range of patterns, styles, and colors. Used in classrooms, retail, offices, hospitals, and transportation.",
        "c2h": "LEUCO Solutions for Magnetic Board",
        "c2d": "The combination of steel laminate with organic core presents unique cutting challenges requiring specialized tool geometries. LEUCO provides cutting-edge technology ensuring longer edge life, superior cut quality, and reduced noise. Note: we recommend care when cutting magnetic board materials due to the potential for sparks, and do not recommend diamond tools for milling.",
    },
    {
        "slug": "fiber-cement-panel-cutting-solutions",
        "img": "fiber-cement",
        "label": "FIBER CEMENT PANEL CUTTING SOLUTIONS",
        "headline": "Fiber Cement. Precision That Endures.",
        "subtext": "LEUCO diamond blades — long edge life, low noise, precision on abrasive materials.",
        "c1h": "About Fiber Cement Exterior Panels",
        "c1d": "Fiber cement panels have cemented their place as a sustainable and durable exterior cladding material. They mimic the raw appeal of wood, metal, and stone while offering outstanding durability and maintenance ease. Their abrasive and rigid nature, however, wears down standard carbide blades with alarming speed.",
        "c2h": "LEUCO Solutions for Fiber Cement",
        "c2d": "LEUCO specialty diamond blades are designed for longevity and superior performance — cutting through abrasive fiber cement with precision. LEUCO has taken a quantum leap in revolutionizing the cutting process for fiber cement panels. Our blades are not just a cutting solution; they set a new standard where every panel is cut not just to fit, but to inspire.",
    },
    {
        "slug": "linoleum-material-cutting-solutions",
        "img": "linoleum",
        "label": "LINOLEUM CUTTING SOLUTIONS",
        "headline": "Linoleum Cut Clean. Naturally.",
        "subtext": "LEUCO tools handle fibrous, pliable linoleum without abrasion or deep indentation.",
        "c1h": "About Linoleum Material",
        "c1d": "Linoleum is made from natural products including linseed oil and cork, making it eco-friendly and sustainable. Low maintenance and easy to clean, it is a popular choice for high-traffic areas like hallways, kitchens, and bathrooms. Available in a wide range of colors and patterns, it has been used in homes and commercial settings for over a century.",
        "c2h": "LEUCO Solutions for Linoleum",
        "c2d": "LEUCO\u2019s cutting-edge technology and experienced team ensure longer edge life, superior cut quality, and reduced noise for linoleum production. Our tools handle linoleum\u2019s pliable, fibrous nature — preventing deep abrasions and indentations that can ruin freshly cut material. We stay ahead of your production needs, helping you save money and time in the long run.",
    },
    {
        "slug": "mdf-material-cutting-solutions",
        "img": "mdf",
        "label": "MDF CUTTING SOLUTIONS",
        "headline": "MDF. Precision on Every Panel.",
        "subtext": "LEUCO solutions minimize dust, maximize edge quality, and extend tool life.",
        "c1h": "About MDF Organic Material",
        "c1d": "Medium-Density Fiberboard (MDF) is one of the most highly favored manufacturing materials today. Made waves in the industry since the 1970s for its versatile nature and eco-friendly properties. Used for flooring, table surfaces, partition walls, furniture, cabinetry, and flat-pack construction — it can even be cut to look like higher-end materials.",
        "c2h": "LEUCO Solutions for MDF",
        "c2d": "LEUCO provides cutting-edge technology and an experienced team of experts to ensure longer edge life, superior cut quality, and reduced noise in MDF production. Our tools address the main concerns of high-volume manufacturers: fine dust generation, vulnerability to splintering under heat, and the need for precision at production speed.",
    },
    {
        "slug": "gypsum-fiber-material-cutting-solutions",
        "img": "gypsum-fiber",
        "label": "GYPSUM FIBER CUTTING SOLUTIONS",
        "headline": "Gypsum Fiber — Strength That Demands Precision",
        "subtext": "LEUCO tools handle the brittle, heavy nature of gypsum fiber with controlled cuts.",
        "c1h": "About Gypsum Fiber Material",
        "c1d": "Gypsum fiber has evolved from a simple building material to a high-tech solution that withstands tough conditions. Its fire, moisture, and element resistance make it perfect for wallboards, roofing panels, and floor tiles. Its popularity has skyrocketed as architects and engineers recognize its benefits — but its brittleness and weight present real manufacturing challenges.",
        "c2h": "LEUCO Solutions for Gypsum Fiber",
        "c2d": "LEUCO provides cutting-edge technology ensuring longer edge life, superior cut quality, and reduced noise for gypsum fiber production. Our tools address the brittleness and weight challenges of this demanding material — delivering controlled, clean cuts that prevent cracking. We stay ahead of your production needs, helping you save money and time in the long run.",
    },
    {
        "slug": "light-concrete-material-cutting-solutions",
        "img": "light-concrete",
        "label": "LIGHT CONCRETE CUTTING SOLUTIONS",
        "headline": "Light Concrete. Heavy Demands Met.",
        "subtext": "LEUCO tools deliver clean cuts on foam concrete without crumbling or jagged edges.",
        "c1h": "About Light Concrete Material",
        "c1d": "Lightweight cellular concrete (foam concrete) is used in lightweight blocks, panels, precast structures, bridges, tunnels, and infrastructure. Much lighter than traditional concrete, it is ideal for roofing tiles, building blocks, and insulation applications — an eco-friendly option made from recycled materials with excellent thermal properties.",
        "c2h": "LEUCO Solutions for Light Concrete",
        "c2d": "LEUCO provides cutting-edge technology and an experienced team of experts to ensure longer edge life, superior cut quality, and reduced noise for light concrete cutting. Our tools address the material\u2019s vulnerability to crumbling and jagged cuts — delivering clean, controlled results that maximize production and profitability for manufacturers working with this demanding material.",
    },
    {
        "slug": "polycarbonate-material-cutting-solutions",
        "img": "polycarbonate",
        "label": "POLYCARBONATE CUTTING SOLUTIONS",
        "headline": "Polycarbonate. Cut Clean. Stay Cool.",
        "subtext": "Low friction, heat-controlled cutting for tear-free polycarbonate panel edges.",
        "c1h": "About Polycarbonate Panels",
        "c1d": "Polycarbonate panels are gaining popularity in interior and exterior architecture for their ability to scatter light and absorb sound. Their honeycomb core provides exceptional strength and rigidity. Highly impact-resistant, available in various colors, and suitable for custom design needs — they are a top choice for large-scale industrial and architectural projects.",
        "c2h": "LEUCO Solutions for Polycarbonate",
        "c2d": "LEUCO provides cutting-edge technology and an experienced team to ensure longer edge life, superior cut quality, and reduced noise for polycarbonate cutting. Our tools address the material\u2019s heat sensitivity (max 250\u00b0F/121\u00b0C) and low friction threshold — delivering clean, tear-free edges without the risk of thermal damage to the panel\u2019s structural integrity.",
    },
    {
        "slug": "compact-plate-cutting-solutions",
        "img": "compact-plate",
        "label": "COMPACT PLATE (HPL) CUTTING SOLUTIONS",
        "headline": "Compact Plate. No Chips. No Grooves.",
        "subtext": "LEUCO precision blades cut HPL without compromising the melamine resin layer.",
        "c1h": "About Compact Plate (HPL)",
        "c1d": "Compact Plate — also known as High Pressure Laminate, Formica, and Solid Core Panels — is made by fusing layers of paper or fabric with resin under high heat and pressure. Hygienic, scratch-proof, moisture-resistant, and high-strength, it is utilized on more decorative furniture fronts than any other currently used material.",
        "c2h": "LEUCO Solutions for Compact Plate",
        "c2d": "LEUCO provides cutting-edge technology and expert support to ensure longer edge life, superior cut quality, and reduced noise for HPL cutting. Our precision blades handle the material\u2019s density and protective melamine resin layer — delivering clean cuts without chipping or cracking. We stay ahead of your production needs, helping you save money and time in the long run.",
    },
]

patched = 0
for art in ARTICLES:
    slug = art["slug"]
    img = art["img"]
    hero = f"/blog-images/mat-{img}-hero.jpg"
    feature = f"/blog-images/mat-{img}-feature.jpg"

    replacement = f"""    featuresSectionLabel: "{art['label']}",
    heroCta: {{ label: "REQUEST A SAMPLE CUT", href: "{CONTACT}" }},
    shopSystemHref: "{CONTACT}",
    interstitialBanner: {{
      headline: "{art['headline']}",
      subtext: "{art['subtext']}",
      backgroundImage: "{hero}",
      style: "dark",
      ctaHref: "{CONTACT}",
      ctaLabel: "REQUEST A SAMPLE CUT",
    }},
    productCards: [
      {{
        heading: "{art['c1h']}",
        description: "{art['c1d']}",
        image: {{ src: "{hero}", alt: "{art['c1h']}" }},
        ctaLabel: "REQUEST A SAMPLE CUT",
        ctaHref: "{CONTACT}",
        imageRight: false,
      }},
      {{
        heading: "{art['c2h']}",
        description: "{art['c2d']}",
        image: {{ src: "{feature}", alt: "{art['c2h']}" }},
        ctaLabel: "REQUEST A SAMPLE CUT",
        ctaHref: "{CONTACT}",
        imageRight: true,
      }},
    ],
    images: [],
  }},"""

    target = "    images: [],\n  },"
    slug_pos = content.find(f'"{slug}"')
    if slug_pos == -1:
        print(f"MISSING SLUG: {slug}")
        continue
    img_pos = content.find(target, slug_pos)
    if img_pos == -1:
        print(f"ALREADY PATCHED or missing images pattern: {slug}")
        continue

    content = content[:img_pos] + replacement + content[img_pos + len(target):]
    patched += 1
    print(f"Patched [{patched}]: {slug}")

with open(FILE, 'w') as f:
    f.write(content)

print(f"\nDone! {patched}/{len(ARTICLES)} articles patched.")
