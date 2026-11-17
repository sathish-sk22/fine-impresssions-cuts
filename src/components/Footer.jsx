import React from 'react';
import { BUSINESS, WA_LINK } from '../data/businessData';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-wrap">
        {/* Main Multi-Column Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="footer-col footer-col-brand">
            <a href="#top" className="footer-brand" onClick={scrollToTop}>
              <img
                src={logoImg}
                alt="Fine Impressions and Cuts logo"
                className="footer-logo-img"
              />
              <span className="footer-brand-title">{BUSINESS.name}</span>
            </a>
            <p className="footer-desc">
              {t('footer_about', 'Laser marking, leather embossing and CNC engraving for shops, factories and gift buyers.')}
            </p>
            <div className="footer-badge">
              <span className="footer-dot-pulse" />
              <span>{BUSINESS.hours}</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer_quick_links', 'Quick Links')}</h4>
            <ul className="footer-links-list">
              <li><a href="#services">{t('nav_services', 'Services')}</a></li>
              <li><a href="#extras">{t('extras_title', 'Extra things we do')}</a></li>
              <li><a href="#gallery">{t('nav_gallery', 'Our work')}</a></li>
              <li><a href="#process">{t('nav_process', 'How it works')}</a></li>
              <li><a href="#customers">{t('nav_customers', 'Customers')}</a></li>
              <li>
                <a
                  href="/Fine-Impressions-and-Cuts-Catalog.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-catalog-link"
                >
                  <span>{t('nav_catalog', 'Catalog')}</span>
                  <span className="footer-pdf-tag">PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Offered */}
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer_services_title', 'Our Services')}</h4>
            <ul className="footer-links-list">
              <li><a href="#services">{t('service_laser_title', 'Laser Marking')}</a></li>
              <li><a href="#services">{t('service_emboss_title', 'Leather Embossing')}</a></li>
              <li><a href="#services">{t('service_engrave_title', 'CNC Engraving')}</a></li>
              <li><a href="#extras">Devotional & Gold Foil Embossing</a></li>
              <li><a href="#services">Shoe & Bag Metal Dies</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Workshop Location */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">{t('footer_workshop_title', 'Workshop & Visit')}</h4>
            <address className="footer-address">
              <p className="footer-address-text">{BUSINESS.address}</p>
            </address>
            <div className="footer-contact-actions">
              <a href={`tel:${BUSINESS.phone.replace(/[^0-9+]/g, '')}`} className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Mobile: {BUSINESS.phone}</span>
              </a>
              {BUSINESS.phoneAlt && (
                <a href={`tel:${BUSINESS.phoneAlt.replace(/[^0-9+]/g, '')}`} className="footer-contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Alt: {BUSINESS.phoneAlt}</span>
                </a>
              )}
              {BUSINESS.landline && (
                <a href={`tel:${BUSINESS.landline.replace(/[^0-9+]/g, '')}`} className="footer-contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Landline: {BUSINESS.landline}</span>
                </a>
              )}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp: {BUSINESS.phone}</span>
              </a>
              {BUSINESS.email && (
                <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Enquiry for Marking / Embossing / Dies')}`} className="footer-contact-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Email: {BUSINESS.email}</span>
                </a>
              )}
              <a
                href={BUSINESS.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-maps-btn"
              >
                <span>{t('contact_open_maps', 'Open in Google Maps')}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Location & Back to Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} <strong>{BUSINESS.name}</strong>. {t('footer_rights', 'All rights reserved.')}
          </p>
          <div className="footer-bottom-meta">
            <span className="footer-city-tag">Chennai, Tamil Nadu, India</span>
            <span className="footer-sep" aria-hidden="true">•</span>
            <button type="button" onClick={scrollToTop} className="footer-back-to-top" title="Scroll back to top">
              <span>{t('footer_back_to_top', 'Back to top')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
