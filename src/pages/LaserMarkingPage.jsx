import React, { useState } from 'react';
import { BUSINESS, getWhatsAppLink } from '../data/businessData';
import { Link } from '../context/NavigationContext';

const FAQ_ITEMS = [
  {
    q: "Will industrial laser marking rub off, fade, or corrode over time?",
    a: "No. Our high-precision fiber laser induces a permanent metallurgical transformation (annealing) or controlled microscopic vaporization of the metal surface. The resulting mark is impervious to hydraulic fluids, industrial degreasers, autoclave sterilization, salt spray, and extreme operational heat."
  },
  {
    q: "Can you laser mark curved or cylindrical components like shafts and spindles?",
    a: "Yes. Our facility is equipped with dedicated motorized rotary indexing axes. This allows continuous 360-degree radial marking of circumferential degree scales, serial numbers, part codes, and orientation arrows on round shafts, turned spindles, bushings, and tubes."
  },
  {
    q: "Do you handle one-off prototypes as well as bulk production batches in Chennai?",
    a: "Yes, absolutely. We regularly process single prototype defense enclosures and customized tool tags, as well as production runs of 10,000+ automotive fasteners or medical components. Our custom jigs ensure rapid cycle times and 100% positional repeatability."
  },
  {
    q: "What types of barcodes and 2D Data Matrix codes can you generate?",
    a: "We laser mark high-contrast 2D Data Matrix (ECC 200), QR codes, Code 128, and GS1-compliant linear barcodes. Every code is verified for edge contrast and scanner readability to meet strict automotive (AIAG) and aerospace/defense identification standards."
  },
  {
    q: "Can laser marking damage or distort delicate, thin-walled parts?",
    a: "No. Unlike stamping, punching, or chemical etching, fiber laser marking is a non-contact process that exerts zero mechanical force. With localized laser beam focus (spot size down to 20 microns), the Heat Affected Zone (HAZ) is virtually zero, preventing thermal warping."
  }
];

const LASER_PHOTOS = [
  {
    src: "/laser-marking/laser-marking-1.jpg",
    title: "CNC Fixture Plate with Scale & Coordinates",
    category: "Metals & Alloys",
    desc: "Black-annealed crisp scale graduations, reference datum lines, and part numbering on aircraft aluminium."
  },
  {
    src: "/laser-marking/laser-marking-2.jpg",
    title: "Machined Cylindrical Steel Spindle",
    category: "Turned Components",
    desc: "Circumferential serial numbering and manufacturer codes marked using rotary axis integration."
  },
  {
    src: "/laser-marking/laser-marking-3.jpg",
    title: "Curved Pipe & 2D Data Matrix Barcode",
    category: "Component Traceability",
    desc: "High-density 2D Data Matrix code and alphanumeric tracking text marked on curved industrial steel."
  },
  {
    src: "/laser-marking/laser-marking-4.jpg",
    title: "Defense Electronics Panel with DRDO Emblem",
    category: "Defense & Aerospace",
    desc: "Deep high-contrast DRDO national defense emblem marked on powder-coated aluminium instrument chassis."
  },
  {
    src: "/recent-works/rw-4-drdo-crest.jpg",
    title: "Macro View: High-Resolution Defense Crest",
    category: "Micro-Precision Marking",
    desc: "Intricate micro-vector lines and razor-sharp typographic definition with zero burning or blur."
  },
  {
    src: "/recent-works/rw-5-serial-macro.jpg",
    title: "Serial Number & Traceability Marking",
    category: "Automotive & Tooling",
    desc: "Permanent wear-resistant alphanumeric tracking serials etched directly on hardened tool steel."
  }
];

export default function LaserMarkingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const waQuoteUrl = getWhatsAppLink("Hi Fine Impressions & Cuts, I would like to enquire about industrial laser marking services in Chennai.");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="service-page laser-page">
      {/* Breadcrumbs */}
      <nav className="sp-breadcrumb-wrap wrap" aria-label="Breadcrumb">
        <ol className="sp-breadcrumbs">
          <li><Link to="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><a href="/#services">Services</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Laser Marking</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="sp-hero wrap">
        <div className="sp-hero-content">
          <div className="sp-hero-badge">
            <span className="pulse-dot" />
            <span>CHENNAI INDUSTRIAL FIBER LASER FACILITY</span>
          </div>
          <h1 className="sp-hero-title">
            Industrial Laser Marking Services in Chennai – Permanent Metal Marking
          </h1>
          <p className="sp-hero-lede">
            High-contrast, permanent fiber laser marking services in Chennai for industrial components, defense panels, automotive assemblies, and medical tools. Non-contact, ink-free, and heat-resistant marking of serial numbers, 2D Data Matrix codes, barcodes, and custom brand logos.
          </p>
          <div className="sp-hero-actions">
            <a
              href={waQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary magnetic-btn"
            >
              Get Laser Marking Quote on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^0-9+]/g, '')}`}
              className="btn ghost magnetic-btn"
            >
              Call: {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* Specs Card */}
        <div className="sp-hero-specs-card">
          <h2 className="sp-specs-heading">Laser Technical Specs</h2>
          <ul className="sp-specs-list">
            <li>
              <span className="sp-spec-label">Laser Technology</span>
              <span className="sp-spec-val">Precision MOPA & Q-Switched Fiber</span>
            </li>
            <li>
              <span className="sp-spec-label">Beam Focal Spot</span>
              <span className="sp-spec-val">~0.02 mm (20 microns)</span>
            </li>
            <li>
              <span className="sp-spec-label">Supported Metals</span>
              <span className="sp-spec-val">SS (304/316), AL, Brass, Titanium, MS</span>
            </li>
            <li>
              <span className="sp-spec-label">Rotary Marking</span>
              <span className="sp-spec-val">360° Cylindrical & Shaft Marking</span>
            </li>
            <li>
              <span className="sp-spec-label">Mark Durability</span>
              <span className="sp-spec-val">Permanent (Acid, Salt & Heat Proof)</span>
            </li>
            <li>
              <span className="sp-spec-label">Capacity</span>
              <span className="sp-spec-val">Prototypes to 10,000+ Piece Batches</span>
            </li>
          </ul>
        </div>
      </section>

      {/* How Fiber Laser Marking Works */}
      <section className="band alt sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">TECHNOLOGY & PROCESS</p>
            <h2>How Our Industrial Laser Marking Works</h2>
            <p className="lede">
              Zero contact, zero chemical inks, and zero mechanical stress for flawless component traceability.
            </p>
          </header>

          <div className="sp-steps-grid">
            <div className="sp-step-card">
              <span className="sp-step-num">01</span>
              <h3>Laser Annealing & Surface Darkening</h3>
              <p>
                By heating the surface without vaporizing base metal, fiber lasers create a deep, smooth black oxidation mark. Highly favoured for surgical instruments and food-grade stainless steels because the protective oxide layer remains unbroken.
              </p>
            </div>
            <div className="sp-step-card">
              <span className="sp-step-num">02</span>
              <h3>Laser Engraving & Deep Ablation</h3>
              <p>
                For harsh industrial operating environments subjected to abrasive wear or thick painting, we perform high-repetition deep engraving, vaporizing metal down to 0.1mm–0.5mm so characters remain readable after sandblasting or powder coating.
              </p>
            </div>
            <div className="sp-step-card">
              <span className="sp-step-num">03</span>
              <h3>Coating Removal & Color Contrast</h3>
              <p>
                On anodized aluminium, blackened fasteners, or painted defense panels, the laser cleanly vaporizes the top layer to reveal bright metallic silver beneath, yielding maximum optical contrast for 2D barcode scanners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Work Photographs */}
      <section className="band sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">PORTFOLIO OF RECENT WORK</p>
            <h2>Real Laser Marked Parts from Our Chennai Workshop</h2>
            <p className="lede">
              Photographs of defense equipment, cylindrical shafts, and production tooling marked in our facility.
            </p>
          </header>

          <div className="sp-gallery-grid">
            {LASER_PHOTOS.map((photo, i) => (
              <figure key={i} className="sp-gallery-card">
                <div className="sp-gallery-img-wrap">
                  <img
                    src={photo.src}
                    alt={`${photo.title} - Industrial laser marking services in Chennai`}
                    loading="lazy"
                    className="sp-gallery-img"
                  />
                  <span className="sp-gallery-badge">{photo.category}</span>
                </div>
                <figcaption className="sp-gallery-caption">
                  <h3 className="sp-gallery-title">{photo.title}</h3>
                  <p className="sp-gallery-desc">{photo.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Applications Grid */}
      <section className="band alt sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">METALS & INDUSTRIES</p>
            <h2>Compatible Materials & Industrial Applications</h2>
            <p className="lede">
              Serving Chennai's aerospace, automotive, defense, and manufacturing supply chains.
            </p>
          </header>

          <div className="sp-two-col-grid">
            <div className="sp-info-card">
              <h3 className="sp-info-title">Supported Metal Substrates</h3>
              <ul className="sp-bullet-list">
                <li>
                  <strong>Stainless Steel (304, 316, 410, 420):</strong> Clean black annealing for surgical tools, kitchenware, valves, and industrial nameplates.
                </li>
                <li>
                  <strong>Aluminium (Bare, Cast, & Anodized):</strong> Brilliant high-contrast white/silver engraving on black or colored anodized electronic enclosures.
                </li>
                <li>
                  <strong>Brass, Copper & Bronze:</strong> High-repetition marking for commemorative coins, valves, plumbing components, and electrical switchgear.
                </li>
                <li>
                  <strong>Titanium & Hardened Tool Steels:</strong> Permanent marking on aerospace fasteners, dies, punches, and CNC cutting tools up to 65 HRC.
                </li>
              </ul>
            </div>

            <div className="sp-info-card">
              <h3 className="sp-info-title">Industrial Applications in Chennai</h3>
              <ul className="sp-bullet-list">
                <li>
                  <strong>Defense & Aerospace:</strong> Enclosure faceplates, instrument markings, and DRDO/MoD spec tracking codes.
                </li>
                <li>
                  <strong>Automotive Tier 1 & Tier 2:</strong> Engine part VIN numbers, gearbox serials, brake pistons, and sensor housings.
                </li>
                <li>
                  <strong>Medical & Surgical Tools:</strong> UDI (Unique Device Identification) 2D Data Matrix codes resistant to repeated autoclave sterilization cycles.
                </li>
                <li>
                  <strong>Electrical & Hardware:</strong> Rating plates, schematic wiring diagrams, switch faceplates, and branded consumer hardware.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="band sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">CUSTOMER FAQS</p>
            <h2>Frequently Asked Questions About Laser Marking</h2>
            <p className="lede">
              Answers to technical questions regarding laser parameters, lead times, and sample verification.
            </p>
          </header>

          <div className="sp-faq-container">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`sp-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="sp-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="sp-faq-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="sp-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal Links: Related Services */}
      <section className="band alt sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">RELATED SERVICES</p>
            <h2>Explore Other Precision Services</h2>
          </header>

          <div className="sp-related-grid">
            <div className="sp-related-card">
              <h3>CNC Engraving Services</h3>
              <p>2D & 3D CNC machined dies, cutting punches, moulds, and heavy-duty steel tooling.</p>
              <Link to="/cnc-engraving" className="sp-related-link">
                View CNC Engraving →
              </Link>
            </div>
            <div className="sp-related-card">
              <h3>Metal Engraving Services</h3>
              <p>Precision mechanical and deep engraving on brass, aluminium, and stainless steel plates.</p>
              <Link to="/metal-engraving" className="sp-related-link">
                View Metal Engraving →
              </Link>
            </div>
            <div className="sp-related-card">
              <h3>Leather Embossing Services</h3>
              <p>Custom brass embossing dies, hot foil stamps, and debossing blocks for footwear and leather goods.</p>
              <Link to="/leather-embossing" className="sp-related-link">
                View Leather Embossing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="band sp-cta-band">
        <div className="wrap sp-cta-inner">
          <div className="sp-cta-text">
            <h2>Need Fast Industrial Laser Marking in Chennai?</h2>
            <p>
              Drop off your test batch or send drawing dimensions on WhatsApp. We offer immediate sample trials, confirmation of mark contrast, and quick job work turnaround.
            </p>
            <p className="sp-cta-address">
              <strong>Workshop:</strong> {BUSINESS.address}
            </p>
          </div>
          <div className="sp-cta-actions">
            <a
              href={waQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary magnetic-btn"
            >
              Get WhatsApp Quote
            </a>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^0-9+]/g, '')}`}
              className="btn ghost magnetic-btn"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
