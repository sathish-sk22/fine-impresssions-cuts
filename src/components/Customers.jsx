import React from 'react';
import { CUSTOMERS } from '../data/businessData';
import { useLanguage } from '../context/LanguageContext';

// Preload customer logos into persistent global array
if (typeof window !== 'undefined') {
  window.__PRELOADED_IMAGES__ = window.__PRELOADED_IMAGES__ || [];
  CUSTOMERS.forEach((item) => {
    if (item.logo) {
      const pre = new Image();
      pre.src = item.logo;
      if (pre.decode) pre.decode().catch(() => {});
      window.__PRELOADED_IMAGES__.push(pre);
    }
  });
}

/**
 * Customers brand logo ticker with seamless infinite horizontal motion.
 * If a customer has a `logo` URL/path, the image is rendered directly.
 * Otherwise, a stylized vector brand mark is displayed as a clean placeholder.
 */
export default function Customers() {
  const { t } = useLanguage();
  // Duplicate array for an unbroken, infinite seamless loop
  const marqueeItems = [...CUSTOMERS, ...CUSTOMERS];

  return (
    <section id="customers" className="customers-section" aria-label="Our Customers">
      <div className="wrap">
        <div className="customers-header">
          <span className="customers-eyebrow">{t('cust_eyebrow', 'NOTABLE CLIENTS')}</span>
          <h2 className="customers-title">{t('cust_title', 'Our Customers')}</h2>
          <p className="customers-sub">
            {t('cust_sub', 'Trusted by manufacturing workshops, studios, and businesses for permanent marking and custom engraving.')}
          </p>
        </div>
      </div>

      {/* Infinite motion marquee ticker */}
      <div className="customers-marquee-container" tabIndex={0} aria-label="Customer brands marquee, pause on hover">
        <div className="customers-marquee-track">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="customer-brand-item"
              data-aspect={item.aspect || 'balanced'}
              title={item.name}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="customer-logo-img"
                  loading="eager"
                />
              ) : (
                <RenderBrandMark symbol={item.symbol} name={item.name} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * High-definition typographic & vector brand representations
 * matching the user's reference mockup until they supply custom files.
 */
function RenderBrandMark({ symbol, name }) {
  switch (symbol) {
    case 'insight':
      return (
        <span className="brand-mark brand-mark-insight">
          <span className="brand-icon-circle">●</span>
          <span className="brand-wordmark">{name}</span>
        </span>
      );
    case 'kpmg':
      return (
        <span className="brand-mark brand-mark-kpmg">
          <span className="brand-wordmark serif">{name}</span>
        </span>
      );
    case 'caterpillar':
      return (
        <span className="brand-mark brand-mark-cat">
          <span className="brand-wordmark bold">CAT</span>
        </span>
      );
    case 'accenture':
      return (
        <span className="brand-mark brand-mark-accenture">
          <span className="brand-wordmark">{name}</span>
          <span className="brand-accent">&gt;</span>
        </span>
      );
    case 'ey':
      return (
        <span className="brand-mark brand-mark-ey">
          <span className="brand-wordmark">EY</span>
        </span>
      );
    case 'deloitte':
      return (
        <span className="brand-mark brand-mark-deloitte">
          <span className="brand-wordmark">{name}</span>
          <span className="brand-dot">.</span>
        </span>
      );
    default:
      return <span className="brand-mark brand-mark-generic">{name}</span>;
  }
}
