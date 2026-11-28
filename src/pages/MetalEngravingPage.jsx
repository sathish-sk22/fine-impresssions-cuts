import React, { useState } from 'react';
import { BUSINESS, getWhatsAppLink, WA_LINK } from '../data/businessData';
import { Link } from '../context/NavigationContext';

const FAQ_ITEMS = [
  {
    q: "Which metals can you engrave at your Chennai workshop?",
    a: "We engrave a broad range of industrial and decorative metals, including Brass (half-hard, forging brass, engraving brass), Stainless Steel (SS304, SS316, SS410), Aluminium (commercial grade, 6061-T6, 7075-T6), Copper, Bronze, Mild Steel, and pre-hardened Tool Steels (D2, EN31, HCHCr)."
  },
  {
    q: "What is the difference between surface laser marking and deep metal engraving?",
    a: "Laser marking changes the surface color, oxidizes, or lightly etches the metal (depth under 0.05 mm), making it ideal for barcodes, serials, and 2D logos. Deep metal engraving physically removes material using rotary carbide/diamond cutters or high-power pulse lasers to depths ranging from 0.2 mm to over 10 mm, creating tactile reliefs, stamping dies, ink-fill cavities, and long-life industrial dials."
  },
  {
    q: "Can you fill engraved letters with colored enamel or paint?",
    a: "Yes. For machine panels, control dials, valve tags, and brand badges, we offer professional paint filling (black, white, red, green, or custom RAL shades) using high-grade industrial epoxy enamels that resist oils, solvents, and outdoor UV exposure."
  },
  {
    q: "What is the minimum line width and letter height you can engrave on metal?",
    a: "Using micro-milling solid carbide cutters with tip radii down to 0.1 mm, we can machine crisp text with character heights as small as 0.8 mm, with razor-sharp corner definitions and mirror-smooth cavity floors."
  },
  {
    q: "Do you handle custom one-off prototypes as well as bulk production runs?",
    a: "Yes. From a single custom brass stamp or machine replacement plaque to continuous monthly batches of thousands of stainless steel equipment plates or component dials, our workshop in Mannurpet, Padi accommodates both low-volume prototyping and mass production."
  }
];

const METAL_PHOTOS = [
  {
    src: "/products/p1-aluminum-debossing-plate.jpg",
    title: "Precision Aluminium Debossing Plate",
    category: "Machined Aluminium Tooling",
    desc: "Mirror-faced aircraft aluminium debossing block CNC milled with micro-tapered relief walls for packaging & paper stamping."
  },
  {
    src: "/products/p3-steel-embossing-die.jpg",
    title: "Hardened Steel Embossing Die",
    category: "Tool Steel Engraving",
    desc: "Heavy-duty steel die deep engraved for high-pressure industrial metal and leather stamping applications."
  },
  {
    src: "/engraving/engraving-2.jpg",
    title: "Brass Crest Master Seal",
    category: "Brass Engraving",
    desc: "Deep sculpted brass master plate engraved with multi-tier heraldic relief for hot-foil stamping and seal pressing."
  },
  {
    src: "/engraving/engraving-5.jpg",
    title: "Industrial Machine Spec Plate",
    category: "Control & Equipment Tags",
    desc: "Stainless steel grade 304 identification plate deep engraved for chemical plant pump and valve assemblies."
  },
  {
    src: "/recent-works/rw-2-brass-sizes.jpg",
    title: "Precision Brass Size Mark Blocks",
    category: "Footwear & Leather Hardware",
    desc: "Series of micro-engraved brass size inserts machined for international footwear manufacturer sizing stamps."
  },
  {
    src: "/recent-works/rw-3-kl-macro.jpg",
    title: "Micro-Carbide Monogram Detail",
    category: "Macro Precision Detail",
    desc: "Extreme close-up revealing crisp bevel wall geometry, zero burr edges, and uniform floor depth on brass stock."
  }
];

export default function MetalEngravingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const waQuoteUrl = getWhatsAppLink("Hi Fine Impressions & Cuts, I would like to enquire about metal engraving services in Chennai.");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="service-page metal-engraving-page">
      {/* Breadcrumbs */}
      <nav className="sp-breadcrumbs" aria-label="Breadcrumbs">
        <div className="sp-container">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="sp-sep">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" aria-current="page">Metal Engraving Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="sp-hero">
        <div className="sp-container">
          <div className="sp-hero-grid">
            <div className="sp-hero-content">
              <div className="sp-tag">
                <span className="sp-tag-dot"></span>
                <span>Chennai Precision Machine Shop &bull; Mannurpet, Padi</span>
              </div>
              <h1 className="sp-title">
                Precision Metal Engraving Services in Chennai
              </h1>
              <p className="sp-subtitle">
                High-definition custom metal engraving for brass embossing blocks, stainless steel machine plates, aluminium dials, control panels, and industrial components. Milled with micro-carbide cutters down to 0.02 mm tolerances.
              </p>

              <div className="sp-badges">
                <span className="sp-badge">Brass &bull; SS304 &bull; SS316 &bull; Aluminium</span>
                <span className="sp-badge">Deep Cavity & 3D Relief</span>
                <span className="sp-badge">Enamel & Paint Filling</span>
                <span className="sp-badge">Fast Turnaround in Chennai</span>
              </div>

              <div className="sp-hero-actions">
                <a
                  href={waQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary sp-cta-btn"
                >
                  Request Metal Engraving Quote on WhatsApp
                </a>
                <a href="#samples" className="btn btn-secondary">
                  View Metal Work Gallery
                </a>
              </div>

              <div className="sp-location-note">
                <span>Workshop located at Mannurpet, Padi industrial corridor, Chennai 600058</span>
              </div>
            </div>

            <div className="sp-hero-card">
              <div className="sp-specs-card">
                <div className="sp-specs-header">
                  <div className="sp-card-status"></div>
                  <span>Workshop Capability Specs</span>
                </div>
                <dl className="sp-specs-list">
                  <div className="sp-spec-row">
                    <dt>Substrates</dt>
                    <dd>Brass, SS304, SS316, Al 6061/7075, Copper, Tool Steel</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Max Engraving Depth</dt>
                    <dd>Up to 12 mm (Deep cavity 2.5D & 3D milling)</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Repeatability</dt>
                    <dd>&plusmn; 0.02 mm positioning accuracy</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Finishing Options</dt>
                    <dd>Mirror polish, Matte bead blast, Epoxy enamel color fill</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Tooling</dt>
                    <dd>Single-lip micro carbide cutters, ball nose, conical V-bits</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Supported Formats</dt>
                    <dd>DXF, DWG, STEP, IGES, AI, CorelDraw, PDF</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Intro & Overview */}
      <section className="sp-section sp-intro-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">About Our Service</span>
            <h2>Custom Metal Engraving for Engineering & Industrial Demands</h2>
            <p className="sp-section-desc">
              From our fully equipped precision machining facility in Mannurpet, Padi, Fine Impressions &amp; Cuts delivers high-accuracy metal engraving across Chennai and Tamil Nadu's leading manufacturing hubs. We combine CNC milling spindles with micro-carbide tooling to carve razor-sharp lettering, calibrated measurement scales, tactile corporate emblems, and heavy-duty stamping matrices.
            </p>
          </div>

          <div className="sp-three-col-grid">
            <div className="sp-feature-card">
              <h3>Deep Cavity Relief &amp; Stamping Dies</h3>
              <p>
                Unlike shallow marks that fade over time, our deep metal engraving removes base metal to substantial depths (0.5 mm to 8 mm+), creating robust masculine and feminine die sets for heat embossing, foil stamping, bookbinding, and leather pressing.
              </p>
            </div>
            <div className="sp-feature-card">
              <h3>Chemical &amp; Weatherproof SS Nameplates</h3>
              <p>
                Industrial machinery operating in harsh coastal Chennai and factory environments requires permanent identification. We deep-engrave SS304 and SS316 stainless steel plaques, filled with chemical-resistant industrial enamel, impervious to solvents and oils.
              </p>
            </div>
            <div className="sp-feature-card">
              <h3>Calibrated Dials &amp; Control Bezels</h3>
              <p>
                We mill precision vernier scales, degree graduations, index rings, and control panel bezels on circular and flat brass or aluminium components with micro-meter step resolution and zero burr accumulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Applications Table */}
      <section className="sp-section sp-materials-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Substrates &amp; Metallurgy</span>
            <h2>Materials We Engrave &amp; Recommended Industrial Applications</h2>
            <p className="sp-section-desc">
              Every metal responds differently to cutting speeds, chip loads, and tool geometry. We select the optimal carbide grade, rake angle, and spindle RPM for each substrate:
            </p>
          </div>

          <div className="sp-table-wrapper">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Metal / Alloy</th>
                  <th>Machining Characteristics</th>
                  <th>Typical Applications</th>
                  <th>Available Finishes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Engraving Brass (C36000 / Free Cutting)</strong></td>
                  <td>Excellent machinability, clean chip evacuation, smooth golden floor</td>
                  <td>Hot foil stamping dies, leather embossing plates, luxury plaques, watch dials</td>
                  <td>Polished mirror finish, antique patina, clear lacquer seal</td>
                </tr>
                <tr>
                  <td><strong>Stainless Steel (SS304 &amp; SS316)</strong></td>
                  <td>Tough, work-hardening, excellent corrosion resistance in Chennai coastal air</td>
                  <td>Industrial machine rating plates, valve tag sets, marine vessel plaques, medical dials</td>
                  <td>Brush satin, high gloss buffed, black/red epoxy color fill</td>
                </tr>
                <tr>
                  <td><strong>Aluminium (6061-T6 &amp; 7075 Aircraft)</strong></td>
                  <td>Lightweight, high thermal conductivity, rigid dimensional stability</td>
                  <td>Electronic enclosure panels, aerospace test dials, debossing counter-plates</td>
                  <td>Clear/black anodized, color contrasting, bead blasted</td>
                </tr>
                <tr>
                  <td><strong>Tool Steel (D2, HCHCr, EN31)</strong></td>
                  <td>High compressive strength, superior edge retention when hardened to 60 HRC</td>
                  <td>Sheet metal forming punches, coin striking dies, high-pressure embossing dies</td>
                  <td>Vacuum heat treated, precision surface ground, wire EDM prepped</td>
                </tr>
                <tr>
                  <td><strong>Electrolytic Copper</strong></td>
                  <td>Superb electrical and thermal conductivity, soft ductile cutting behavior</td>
                  <td>EDM spark erosion electrodes, electrical busbar markings, specialty architectural inserts</td>
                  <td>Natural bright copper, micro-milled spark-ready finish</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real Work Gallery */}
      <section id="samples" className="sp-section sp-gallery-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Workshop Portfolio</span>
            <h2>Real Metal Engraving Projects Machined in Chennai</h2>
            <p className="sp-section-desc">
              All photographs below showcase actual precision metal engraving jobs manufactured at our Padi workshop for Chennai industrial, footwear, and engineering clients:
            </p>
          </div>

          <div className="sp-gallery-grid">
            {METAL_PHOTOS.map((photo, i) => (
              <figure key={i} className="sp-gallery-item">
                <div className="sp-img-frame">
                  <img
                    src={photo.src}
                    alt={photo.title + " - Metal Engraving Chennai"}
                    loading="lazy"
                    width="480"
                    height="360"
                  />
                  <div className="sp-img-tag">{photo.category}</div>
                </div>
                <figcaption className="sp-gallery-caption">
                  <h4>{photo.title}</h4>
                  <p>{photo.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Applications & Sectors */}
      <section className="sp-section sp-sectors-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Industries Served</span>
            <h2>Who Relies on Our Chennai Metal Engraving Facility?</h2>
          </div>

          <div className="sp-four-grid">
            <div className="sp-sector-box">
              <span className="sp-sector-num">01</span>
              <h4>Automotive &amp; Ancillaries</h4>
              <p>Specialized machine gauge faces, inspection test fixtures, component serial plaques, and stamping punches for Chennai auto component suppliers in Ambattur, Sriperumbudur, and Maraimalai Nagar.</p>
            </div>
            <div className="sp-sector-box">
              <span className="sp-sector-num">02</span>
              <h4>Footwear &amp; Leather Goods</h4>
              <p>Brass brand embossing blocks, debossing stamps, outsole logo plates, and size marking dies for Chennai and Ranipet footwear exporters and tanneries.</p>
            </div>
            <div className="sp-sector-box">
              <span className="sp-sector-num">03</span>
              <h4>Industrial Machinery &amp; Valves</h4>
              <p>SS304/SS316 equipment rating nameplates, safety protocol signage, flow direction arrows, and hydraulic valve identification tags.</p>
            </div>
            <div className="sp-sector-box">
              <span className="sp-sector-num">04</span>
              <h4>Luxury Packaging &amp; Stationery</h4>
              <p>Hardened brass foil-stamping dies, blind debossing blocks, and custom corporate gift embossing seals for premium printing and packaging presses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Workflow */}
      <section className="sp-section sp-process-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Our Workflow</span>
            <h2>Step-by-Step Metal Engraving Process</h2>
          </div>

          <div className="sp-steps-grid">
            <div className="sp-step-card">
              <div className="sp-step-num">Step 01</div>
              <h4>CAD Verification &amp; Toolpathing</h4>
              <p>We audit your 2D/3D file, calculate precise draft angles (typically 15&deg; to 25&deg; for stamping release), and program multi-stage roughing and micro-finishing toolpaths in CAM.</p>
            </div>
            <div className="sp-step-card">
              <div className="sp-step-num">Step 02</div>
              <h4>Material Sourcing &amp; Face Squaring</h4>
              <p>Raw brass, stainless steel, or aluminium billets are fly-cut and surface ground to ensure absolute parallelism across the entire workpiece surface before engraving commences.</p>
            </div>
            <div className="sp-step-card">
              <div className="sp-step-num">Step 03</div>
              <h4>High-Speed Micro CNC Engraving</h4>
              <p>High-RPM spindles drive solid tungsten carbide micro-endmills with flood coolant, creating clean walls, smooth transitions, and burr-free microscopic details.</p>
            </div>
            <div className="sp-step-card">
              <div className="sp-step-num">Step 04</div>
              <h4>Deburring, Color Fill &amp; Inspection</h4>
              <p>Components are ultrasonically cleaned, hand-deburred under optical magnification, enamel-filled if specified, and checked for depth and dimensional compliance before delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="sp-section sp-faq-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Got Questions?</span>
            <h2>Frequently Asked Questions About Metal Engraving in Chennai</h2>
          </div>

          <div className="sp-faq-container">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`sp-faq-item ${openFaq === index ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="sp-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <span className="sp-faq-arrow" aria-hidden="true">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="sp-faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="sp-section sp-related-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Explore More</span>
            <h2>Related Precision Machining &amp; Marking Services</h2>
          </div>

          <div className="sp-related-grid">
            <Link to="/cnc-engraving" className="sp-related-card">
              <h4>CNC Engraving Services</h4>
              <p>2D &amp; 3D sculpted CNC cutting dies, punch sets, and custom industrial moulds engineered in tool steel and brass.</p>
              <span className="sp-related-link">Explore CNC Engraving &rarr;</span>
            </Link>

            <Link to="/laser-marking" className="sp-related-card">
              <h4>Industrial Laser Marking</h4>
              <p>Fiber laser surface annealing, permanent serial numbers, QR codes, and logos on finished metal and polymer parts.</p>
              <span className="sp-related-link">Explore Laser Marking &rarr;</span>
            </Link>

            <Link to="/leather-embossing" className="sp-related-card">
              <h4>Leather Embossing &amp; Stamping</h4>
              <p>Custom brass embossing dies, debossing plates, and hot-foil stamping blocks for shoes, wallets, and luxury leather goods.</p>
              <span className="sp-related-link">Explore Leather Embossing &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="sp-cta-band">
        <div className="sp-container">
          <div className="sp-cta-inner">
            <span className="sp-cta-badge">Ready for your metal project?</span>
            <h2>Send Your Drawings or Dimensions for a Fast Quote</h2>
            <p>
              Whether you need a custom brass die, stainless steel equipment plates, or precision machined dials, our team in Mannurpet, Padi, Chennai is ready to deliver.
            </p>

            <div className="sp-cta-actions">
              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Get Instant WhatsApp Quote
              </a>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="btn btn-secondary"
              >
                Call: {BUSINESS.phone}
              </a>
            </div>

            <div className="sp-cta-details">
              <span><strong>Address:</strong> {BUSINESS.address.full}</span>
              <span><strong>Email:</strong> {BUSINESS.email}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
