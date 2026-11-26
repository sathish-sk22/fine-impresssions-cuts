import React, { useState } from 'react';
import { BUSINESS, getWhatsAppLink, WA_LINK } from '../data/businessData';
import { Link } from '../context/NavigationContext';

const FAQ_ITEMS = [
  {
    q: "Why is CNC machined brass the preferred material for leather embossing dies?",
    a: "Brass provides unmatched thermal conductivity, rapid and uniform heat distribution, and crisp edge durability. Unlike cheaper magnesium or zinc etching plates that degrade under heat and pressure, solid CNC milled brass dies withstand hundreds of thousands of stamping cycles without losing sharp detail or buckling under heavy press tonnages."
  },
  {
    q: "What is the difference between blind debossing, embossing, and hot-foil stamping?",
    a: "Blind debossing presses the heated brass die directly into the leather, creating a permanent, elegant sunken impression without added color. Embossing creates a raised, 3D tactile relief using matching male and female die sets. Hot-foil stamping uses a heated die to transfer metallic (gold, silver, bronze) or pigment foil permanently into the impression."
  },
  {
    q: "Can you emboss on both genuine finished leather and synthetic PU/PVC?",
    a: "Yes. We engineer dies for full-grain vegetable-tanned leather, chrome-tanned shoe uppers, suede, split leather, as well as synthetic PU, PVC, and microfiber leather. We calibrate draft angles and bevel depths to ensure the die releases cleanly without tearing or scorching synthetic backings."
  },
  {
    q: "Do you supply the heated embossing dies, or do you also offer embossing job-work in Chennai?",
    a: "We do both. We manufacture precision CNC brass embossing dies and debossing blocks for factories that have their own hydraulic, pneumatic, or toggle presses. Additionally, at our workshop in Mannurpet, Padi, Chennai, we operate high-precision temperature-controlled stamping presses to provide contract embossing and foil stamping job work for shoe components, wallets, diaries, and leather accessories."
  },
  {
    q: "What draft angle do you machine on leather embossing dies?",
    a: "We typically machine a 15-degree to 25-degree draft angle with micro-radiused edges. This prevents the die from cutting or puncturing the leather fibers during high-pressure stamping while ensuring effortless separation after the dwell cycle."
  }
];

const LEATHER_PHOTOS = [
  {
    src: "/recent-works/rw-1-levis-wallet.jpg",
    title: "Embossed Leather Wallet Crest",
    category: "Full Grain Leather Stamping",
    desc: "Deep sculpted blind debossing on premium full-grain leather wallet executed for global lifestyle apparel brand."
  },
  {
    src: "/recent-works/rw-7-clarks-gold.jpg",
    title: "Gold Foil Footwear Insole Stamping",
    category: "Hot Foil Stamping",
    desc: "Metallic gold hot-foil embossed brand insignia on leather footwear sockliner produced for international shoe exporter."
  },
  {
    src: "/recent-works/rw-8-roeckl-text.jpg",
    title: "Fine-Line Micro Text Embossing",
    category: "Precision Typography",
    desc: "Crisp micro-text logo stamped onto luxury glove leather showing pristine letter separation and zero foil bleed."
  },
  {
    src: "/leather-embossing/embossing-1.jpg",
    title: "Solid Brass Leather Stamping Die",
    category: "CNC Brass Tooling",
    desc: "High-grade brass master die with tapped back holes for easy mounting on pneumatic hot stamping machines."
  },
  {
    src: "/leather-embossing/embossing-3.jpg",
    title: "3D Relief Texture Embossing Plate",
    category: "Pattern Stamping",
    desc: "Geometric pattern debossing plate engineered to create uniform tactile surface textures on leather panels."
  },
  {
    src: "/leather-embossing/embossing-4.jpg",
    title: "Custom Shoe Brand Outsole / Tongue Die",
    category: "Footwear Component Die",
    desc: "Heavy-duty brass embossing die engineered to press crisp logos onto leather shoe tongues and counter panels."
  }
];

export default function LeatherEmbossingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const waQuoteUrl = getWhatsAppLink("Hi Fine Impressions & Cuts, I would like to enquire about leather embossing services and dies in Chennai.");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="service-page leather-embossing-page">
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
              <span itemProp="name" aria-current="page">Leather Embossing Services</span>
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
                <span>Chennai Leather Hub Tooling &bull; 20+ Years Heritage</span>
              </div>
              <h1 className="sp-title">
                Custom Leather Embossing Services &amp; Precision Dies in Chennai
              </h1>
              <p className="sp-subtitle">
                Master manufacturers of solid brass embossing dies, debossing plates, and hot-foil stamping blocks. Serving Chennai's world-renowned footwear, tannery, and leather goods export industries with over 20 years of craftsmanship.
              </p>

              <div className="sp-badges">
                <span className="sp-badge">Solid CNC Milled Brass Dies</span>
                <span className="sp-badge">Blind Deboss &bull; 3D Relief &bull; Hot Foil</span>
                <span className="sp-badge">Footwear &bull; Wallets &bull; Bags &bull; Belts</span>
                <span className="sp-badge">Job Work &amp; Custom Tooling</span>
              </div>

              <div className="sp-hero-actions">
                <a
                  href={waQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary sp-cta-btn"
                >
                  <span className="btn-icon">⚡</span>
                  Request Leather Embossing Quote on WhatsApp
                </a>
                <a href="#samples" className="btn btn-secondary">
                  View Leather Work Gallery
                </a>
              </div>

              <div className="sp-location-note">
                <span>📍 Centrally located in Mannurpet, Padi, Chennai &bull; Direct support for Ambur, Ranipet &amp; Chennai export clusters</span>
              </div>
            </div>

            <div className="sp-hero-card">
              <div className="sp-specs-card">
                <div className="sp-specs-header">
                  <div className="sp-card-status"></div>
                  <span>Tooling &amp; Stamping Specs</span>
                </div>
                <dl className="sp-specs-list">
                  <div className="sp-spec-row">
                    <dt>Die Material</dt>
                    <dd>High-purity free-cutting brass (solid block CNC milled)</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Stamping Techniques</dt>
                    <dd>Blind Debossing, Raised Embossing, Metallic Hot Foil</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Compatible Presses</dt>
                    <dd>Hydraulic, Pneumatic hot-stamping, Manual toggle, HF</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Draft Angle</dt>
                    <dd>15&deg; to 25&deg; release taper with micro-eased edges</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Mounting Options</dt>
                    <dd>Tapped rear M4/M6/M8 holes, dovetail slots, or flat back</dd>
                  </div>
                  <div className="sp-spec-row">
                    <dt>Leather Types</dt>
                    <dd>Veg-tanned, Chrome-tanned, Nubuck, Suede, PU/PVC leather</dd>
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
            <span className="sp-section-tag">Chennai Leather Craftsmanship</span>
            <h2>Two Decades of Tooling for Global Footwear &amp; Leather Brands</h2>
            <p className="sp-section-desc">
              Chennai and the northern Tamil Nadu leather corridor (Ambur, Vaniyambadi, Ranipet) represent India's foremost hub for premium leather footwear and luxury small leather goods. Since 2004, Fine Impressions &amp; Cuts has provided the precision brass embossing dies, debossing plates, and contract stamping expertise that give prestigious brands their distinct tactile identity.
            </p>
          </div>

          <div className="sp-three-col-grid">
            <div className="sp-feature-card">
              <div className="sp-feature-icon">✨</div>
              <h3>Deep Tactile Blind Debossing</h3>
              <p>
                Our brass dies are machined with controlled draft tapers and depth stops that depress the leather surface smoothly, locking the grain fibers into a rich, permanent contrast that never rebounds over decades of daily product use.
              </p>
            </div>
            <div className="sp-feature-card">
              <div className="sp-feature-icon">🌟</div>
              <h3>Precision Hot-Foil Stamping</h3>
              <p>
                Engineered with mirror-polished faces and razor-sharp typographic perimeter walls, our dies transfer gold, silver, metallic copper, and matte colored foils with zero feathering, no foil flaking, and immaculate edge definition.
              </p>
            </div>
            <div className="sp-feature-card">
              <div className="sp-feature-icon">👞</div>
              <h3>Shoe Component Dies &amp; Insoles</h3>
              <p>
                From shoe upper logo emblems and heel collar accents to size-run insole stamps and tongue badges, we fabricate matched sets that fit standard European and American footwear press platen setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embossing Techniques Explained */}
      <section className="sp-section sp-techniques-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Techniques &amp; Methods</span>
            <h2>Choosing the Right Embossing Method for Your Leather Goods</h2>
            <p className="sp-section-desc">
              Different leather grains, tannages, and finishes respond best to specific stamping temperatures, pressures, and die configurations:
            </p>
          </div>

          <div className="sp-four-grid">
            <div className="sp-sector-box">
              <span className="sp-sector-num">01</span>
              <h4>Blind Debossing</h4>
              <p>Heat and mechanical tonnage applied without foil. Best for vegetable-tanned leather, bridle leather, and pull-up hides where natural oils darken to create an organic burnished patina.</p>
            </div>
            <div className="sp-sector-box">
              <span className="sp-sector-num">02</span>
              <h4>Metallic Hot-Foil Stamping</h4>
              <p>Heated brass die (110&deg;C - 140&deg;C) releases metallic foil film onto finished shoe linings, wallet interiors, luxury gift boxes, and passport covers with brilliant reflectivity.</p>
            </div>
            <div className="sp-sector-box">
              <span className="sp-sector-num">03</span>
              <h4>2-Piece Male &amp; Female Embossing</h4>
              <p>Matching concave and convex dies press through the leather thickness to create an elevated 3D raised motif that stands proud on bag panels and belt tips.</p>
            </div>
            <div className="sp-sector-box">
              <span className="sp-sector-num">04</span>
              <h4>High-Frequency (HF) Brass Dies</h4>
              <p>Specially grounded brass electrode dies designed for high-frequency radio welding and debossing on synthetic PU, PVC, and synthetic shoe materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Work Gallery */}
      <section id="samples" className="sp-section sp-gallery-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Workshop Portfolio</span>
            <h2>Real Leather Embossing &amp; Brass Dies Manufactured in Chennai</h2>
            <p className="sp-section-desc">
              Inspect actual client products stamped using Fine Impressions &amp; Cuts brass dies—trusted by global fashion brands, footwear exporters, and boutique leather crafters:
            </p>
          </div>

          <div className="sp-gallery-grid">
            {LEATHER_PHOTOS.map((photo, i) => (
              <figure key={i} className="sp-gallery-item">
                <div className="sp-img-frame">
                  <img
                    src={photo.src}
                    alt={photo.title + " - Leather Embossing Chennai"}
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

      {/* Applications & Products */}
      <section className="sp-section sp-products-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Product Applications</span>
            <h2>Leather Goods &amp; Accessories We Brand in Chennai</h2>
          </div>

          <div className="sp-three-col-grid">
            <div className="sp-feature-card">
              <div className="sp-feature-icon">👠</div>
              <h3>Footwear &amp; Shoe Manufacturing</h3>
              <p>Branded insoles, sockliner gold stamping, quarter logo embossing, tongue patches, and outsole rubber mould inserts for leather formal shoes, sneakers, and safety boots.</p>
            </div>
            <div className="sp-feature-card">
              <div className="sp-feature-icon">💼</div>
              <h3>Wallets, Bags &amp; Small Leather Goods</h3>
              <p>Cardholder slots, wallet exterior crests, handbag hangtags, passport case monogramming, and luggage label embossing with crisp corner geometry.</p>
            </div>
            <div className="sp-feature-card">
              <div className="sp-feature-icon">📒</div>
              <h3>Corporate Diaries &amp; Premium Gifts</h3>
              <p>Hardcover PU/leather journal debossing, custom corporate logo stamping, menu folders for luxury hotels, and desk accessory branding in bulk volumes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Workflow */}
      <section className="sp-section sp-process-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Our Workflow</span>
            <h2>How We Engineer Your Custom Brass Embossing Die</h2>
          </div>

          <div className="sp-steps-grid">
            <div className="sp-step-card">
              <div className="sp-step-num">Step 01</div>
              <h4>Vector Artwork &amp; Depth Tuning</h4>
              <p>We review your logo or design file (AI, CDR, DXF, or PDF), checking line weights to ensure every serif and detail will press cleanly into your specific leather thickness.</p>
            </div>
            <div className="sp-step-card">
              <div className="sp-step-num">Step 02</div>
              <h4>Solid Block Brass Selection</h4>
              <p>We select certified high-purity free-cutting brass billets, surfaced and fly-cut to ensure absolute thermal flatness across the die face.</p>
            </div>
            <div className="sp-step-card">
              <div className="sp-step-num">Step 03</div>
              <h4>High-Speed CNC Micro Milling</h4>
              <p>Our micro-carbide spindles carve the relief profile with engineered draft angles (15&deg;&ndash;25&deg;), guaranteeing clean press release without tearing leather grain.</p>
            </div>
            <div className="sp-step-card">
              <div className="sp-step-num">Step 04</div>
              <h4>Mounting Prep &amp; Press Trial</h4>
              <p>We tap custom mounting holes on the rear plate according to your machine specs, perform a test burnish stamping trial on leather, and inspect under optical magnification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="sp-section sp-faq-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Got Questions?</span>
            <h2>Frequently Asked Questions About Leather Embossing in Chennai</h2>
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
            <h2>Related Tooling &amp; Industrial Marking Services</h2>
          </div>

          <div className="sp-related-grid">
            <Link to="/cnc-engraving" className="sp-related-card">
              <div className="sp-related-icon">⚙️</div>
              <h4>CNC Engraving Services</h4>
              <p>Steel cutting dies, punch sets, and 2D/3D precision tooling machined for footwear, automotive, and industrial manufacturing.</p>
              <span className="sp-related-link">Explore CNC Engraving &rarr;</span>
            </Link>

            <Link to="/metal-engraving" className="sp-related-card">
              <div className="sp-related-icon">✨</div>
              <h4>Metal Engraving Services</h4>
              <p>Precision deep metal engraving on brass, stainless steel, and aluminium for industrial equipment nameplates and dies.</p>
              <span className="sp-related-link">Explore Metal Engraving &rarr;</span>
            </Link>

            <Link to="/laser-marking" className="sp-related-card">
              <div className="sp-related-icon">⚡</div>
              <h4>Industrial Laser Marking</h4>
              <p>High-contrast permanent fiber laser marking of serial numbers, QR codes, and barcodes on industrial metals and plastics.</p>
              <span className="sp-related-link">Explore Laser Marking &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="sp-cta-band">
        <div className="sp-container">
          <div className="sp-cta-inner">
            <span className="sp-cta-badge">Partner With Leather Specialists</span>
            <h2>Order Your Custom Brass Embossing Die or Stamping Job Work</h2>
            <p>
              Send your logo artwork or product dimensions on WhatsApp. We confirm draft angles, die thicknesses, mounting threads, and deliver fast quotations within hours.
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
