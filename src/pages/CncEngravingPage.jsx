import React, { useState } from 'react';
import { BUSINESS, getWhatsAppLink } from '../data/businessData';
import { Link } from '../context/NavigationContext';

const FAQ_ITEMS = [
  {
    q: "What file formats do you accept for CNC engraving in Chennai?",
    a: "We accept all standard 2D vector and 3D CAD formats including DXF, DWG, STEP (.stp), IGES (.igs), AI (Adobe Illustrator), CorelDraw (.cdr), and PDF. If you only have a hand sketch, photograph, or existing physical master die, our in-house CAD team can digitize and create the precise 2D/3D model for you."
  },
  {
    q: "What is the difference between 2D CNC engraving and 3D CNC engraving?",
    a: "2D CNC engraving cuts profiles, lettering, and cavities at uniform flat depths (ideal for basic brand stamps, cutting outlines, and flat face dies). 3D CNC engraving machines continuous multi-axis sculpted relief, rounded contours, textured backgrounds, and organic facial or devotional details (such as Lord Ganesha plates, shoe sole moulds, and coin dies)."
  },
  {
    q: "What is your standard turnaround time for CNC dies in Chennai?",
    a: "Standard brass or aluminum 2D dies are typically completed within 24 to 48 hours. Complex 3D steel embossing dies, multi-piece punch sets, or hardened tooling usually take 3 to 5 business days, including heat treatment. Urgent same-day emergency tooling can also be accommodated upon request."
  },
  {
    q: "Do you provide heat treatment and hardening for steel dies?",
    a: "Yes. All our tool steel dies (such as D2, HCHCr, and EN31) undergo vacuum heat treatment and controlled tempering to achieve optimal hardness (typically 58 to 62 HRC). This guarantees edge sharpness and prevents die deformation under continuous hydraulic press pressure."
  },
  {
    q: "Can you recreate a broken or worn-out die from an old physical sample?",
    a: "Yes, frequently. Many factories bring us worn or imported dies with no digital drawings. We take precise micrometer and optical measurements, recreate the 2D/3D CAD geometry with shrinkage compensation, and machine an exact drop-in replacement."
  }
];

const CNC_PHOTOS = [
  {
    src: "/products/p2-cnc-cutting-die-punch.jpg",
    title: "CNC Cutting Die with Hardened Punch",
    category: "Footwear & Gasket Tooling",
    desc: "Custom precision steel cutter and matching male punch engineered for high-cycle industrial punching."
  },
  {
    src: "/products/p4-steel-cutting-dies.jpg",
    title: "Precision Steel Cutting Dies",
    category: "Tool Steel Dies",
    desc: "Hardened D2 tool steel cutting edges milled to tight tolerances for clean leather and synthetic cutting."
  },
  {
    src: "/products/p5-spiral-cutting-die.jpg",
    title: "Spiral Cutting Die",
    category: "Custom Industrial Dies",
    desc: "Complex geometry spiral cutting profile CNC machined from hardened tool steel blocks."
  },
  {
    src: "/products/p6-ss-plate-mould.jpg",
    title: "Stainless Steel Plate Mould",
    category: "Precision Mould Tooling",
    desc: "Multi-cavity stainless steel compression mould plate for industrial rubber and polymer forming."
  },
  {
    src: "/engraving/engraving-1.jpg",
    title: "Deep CNC Engraved Master Die",
    category: "Relief Die Machining",
    desc: "High-relief engraved master block featuring crisp bevels and mirror-smooth cavity bottom finish."
  },
  {
    src: "/recent-works/rw-12-wave-macro.jpg",
    title: "3D Wave Relief Surface Machining",
    category: "3D CNC Relief",
    desc: "Macro view of micro-stepover continuous 3D contouring executed on our high-speed CNC spindle."
  }
];

export default function CncEngravingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const waQuoteUrl = getWhatsAppLink("Hi Fine Impressions & Cuts, I would like to enquire about CNC engraving services in Chennai.");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="service-page cnc-page">
      {/* Breadcrumb Navigation */}
      <nav className="sp-breadcrumb-wrap wrap" aria-label="Breadcrumb">
        <ol className="sp-breadcrumbs">
          <li><Link to="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><a href="/#services">Services</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">CNC Engraving</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="sp-hero wrap">
        <div className="sp-hero-content">
          <div className="sp-hero-badge">
            <span className="pulse-dot" />
            <span>PADI, CHENNAI • PRECISION CNC MACHINING</span>
          </div>
          <h1 className="sp-hero-title">
            CNC Engraving Services in Chennai – 2D & 3D Precision Dies
          </h1>
          <p className="sp-hero-lede">
            High-precision 2D and 3D CNC engraving for industrial dies, moulds, cutting punches, and custom branding tools. Backed by 20+ years of toolroom engineering in Chennai, we manufacture ultra-durable dies with micron-level tolerances for factories, export houses, and tooling engineers.
          </p>
          <div className="sp-hero-actions">
            <a
              href={waQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary magnetic-btn"
            >
              Request CNC Quote on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^0-9+]/g, '')}`}
              className="btn ghost magnetic-btn"
            >
              Call: {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* Hero Highlights Card */}
        <div className="sp-hero-specs-card">
          <h2 className="sp-specs-heading">Technical Highlights</h2>
          <ul className="sp-specs-list">
            <li>
              <span className="sp-spec-label">Machining Capability</span>
              <span className="sp-spec-val">2D Profiles & Full 3D Reliefs</span>
            </li>
            <li>
              <span className="sp-spec-label">Positional Accuracy</span>
              <span className="sp-spec-val">±0.02 mm (20 microns)</span>
            </li>
            <li>
              <span className="sp-spec-label">Primary Materials</span>
              <span className="sp-spec-val">D2, HCHCr, Brass, AL 6061, SS 304</span>
            </li>
            <li>
              <span className="sp-spec-label">Hardness Range</span>
              <span className="sp-spec-val">Up to 62 HRC (Heat Treated)</span>
            </li>
            <li>
              <span className="sp-spec-label">Turnaround</span>
              <span className="sp-spec-val">24 to 48 Hours for Standard Dies</span>
            </li>
            <li>
              <span className="sp-spec-label">Workshop Location</span>
              <span className="sp-spec-val">Mannurpet, Padi, Chennai</span>
            </li>
          </ul>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="band alt sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">OUR PROCESS</p>
            <h2>How Our CNC Engraving Process Works</h2>
            <p className="lede">
              From vector artwork to heat-treated metal tooling ready for high-tonnage presses.
            </p>
          </header>

          <div className="sp-steps-grid">
            <div className="sp-step-card">
              <span className="sp-step-num">01</span>
              <h3>CAD Modeling & Relief Sculpting</h3>
              <p>
                We review your 2D vector files (DXF, AI, PDF) or 3D CAD models. For organic emblems and devotional artwork, our sculptors generate precise 3D z-depth reliefs with proper draft angles for clean material release.
              </p>
            </div>
            <div className="sp-step-card">
              <span className="sp-step-num">02</span>
              <h3>High-Speed CAM Milling</h3>
              <p>
                We execute multi-pass machining using micro-grain solid carbide cutters on rigid high-speed CNC spindles. Stepover values down to 0.02mm produce smooth continuous contours with zero facet marks.
              </p>
            </div>
            <div className="sp-step-card">
              <span className="sp-step-num">03</span>
              <h3>Bench Detailing & Heat Treatment</h3>
              <p>
                Every die is hand-inspected under optical magnification. Critical cutting edges are dressed, and tool steels undergo controlled vacuum hardening (58–62 HRC) to endure hundreds of thousands of impressions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Project Photographs */}
      <section className="band sp-section">
        <div className="wrap">
          <header className="section-head">
            <p className="eyebrow">PORTFOLIO OF RECENT WORK</p>
            <h2>Real CNC Dies Manufactured in Chennai</h2>
            <p className="lede">
              Actual photographs of recent CNC engraved dies, cutting sets, and moulds produced in our Padi workshop.
            </p>
          </header>

          <div className="sp-gallery-grid">
            {CNC_PHOTOS.map((photo, i) => (
              <figure key={i} className="sp-gallery-card">
                <div className="sp-gallery-img-wrap">
                  <img
                    src={photo.src}
                    alt={`${photo.title} - CNC engraving services in Chennai`}
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
            <p className="eyebrow">CAPABILITIES & SPECIFICATIONS</p>
            <h2>Materials We Machine & Industries Served</h2>
            <p className="lede">
              Engineered tooling tailored to specific production machinery and press ratings.
            </p>
          </header>

          <div className="sp-two-col-grid">
            <div className="sp-info-card">
              <h3 className="sp-info-title">Supported Tooling Materials</h3>
              <ul className="sp-bullet-list">
                <li>
                  <strong>Tool Steels (D2, HCHCr, EN31):</strong> Ideal for long-run cutting dies, male/female punch sets, coin dies, and metal stamping tools requiring vacuum hardening.
                </li>
                <li>
                  <strong>Engraving Brass (C360 / Lead-Free):</strong> High thermal conductivity and smooth machineability, perfect for hot foil stamping and leather heat-embossing dies.
                </li>
                <li>
                  <strong>Aircraft-Grade Aluminum (6061-T6, 7075):</strong> Lightweight, cost-effective for large-format packaging debossing plates and prototype shoe moulds.
                </li>
                <li>
                  <strong>Stainless Steel (SS 304, SS 316):</strong> Corrosion-resistant moulds for medical items, pharmaceutical blister packs, and food-grade packaging.
                </li>
              </ul>
            </div>

            <div className="sp-info-card">
              <h3 className="sp-info-title">Industries Served in Chennai</h3>
              <ul className="sp-bullet-list">
                <li>
                  <strong>Footwear & Leather Goods:</strong> Export shoe upper cutting dies, insole hot-foil stamps, outsole compression moulds, and leather wallet debossing dies.
                </li>
                <li>
                  <strong>Automotive & Engineering:</strong> Gasket cutting tools, stamped component dies, serial marker blocks, and chassis inspection templates.
                </li>
                <li>
                  <strong>Packaging & Printing:</strong> Embossing and debossing rollers, carton embossing dies, and high-speed packaging seal blocks.
                </li>
                <li>
                  <strong>Medals & Devotional Works:</strong> Deep 3D sculpted deity plates, commemorative coins, brass plaques, and corporate awards.
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
            <h2>Frequently Asked Questions About CNC Engraving</h2>
            <p className="lede">
              Answers to common queries from Chennai tooling engineers, factory managers, and designers.
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
            <h2>Explore Other Marking & Tooling Services</h2>
          </header>

          <div className="sp-related-grid">
            <div className="sp-related-card">
              <h3>Laser Marking Services</h3>
              <p>Non-contact permanent fiber laser marking on metals and alloys for serial numbers, barcodes, and logos.</p>
              <Link to="/laser-marking" className="sp-related-link">
                View Laser Marking →
              </Link>
            </div>
            <div className="sp-related-card">
              <h3>Metal Engraving Services</h3>
              <p>Custom mechanical and chemical-clean engraving on brass, stainless steel, and aluminium plaques and components.</p>
              <Link to="/metal-engraving" className="sp-related-link">
                View Metal Engraving →
              </Link>
            </div>
            <div className="sp-related-card">
              <h3>Leather Embossing Services</h3>
              <p>Custom brass dies, foil stamping blocks, and debossing plates manufactured for leather footwear and accessories.</p>
              <Link to="/leather-embossing" className="sp-related-link">
                View Leather Embossing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact CTA */}
      <section className="band sp-cta-band">
        <div className="wrap sp-cta-inner">
          <div className="sp-cta-text">
            <h2>Need a Precision CNC Die Machined in Chennai?</h2>
            <p>
              Send us your drawing or design on WhatsApp. We confirm dimensions, material choice, and deliver an accurate price and lead-time quotation within hours.
            </p>
            <p className="sp-cta-address">
              📍 <strong>Workshop:</strong> {BUSINESS.address}
            </p>
          </div>
          <div className="sp-cta-actions">
            <a
              href={waQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary magnetic-btn"
            >
              Get Instant WhatsApp Quote
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
