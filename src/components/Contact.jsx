import React from 'react';
import { BUSINESS, getWhatsAppLink, DEFAULT_QUOTE_MESSAGE } from '../data/businessData';
import CopyButton from './CopyButton';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';

function ContactRow({ label, children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      className={`contact-row slide-in-row ${isVisible ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function Contact() {
  const [headRef, headVisible] = useScrollReveal({ threshold: 0.2 });
  const { t } = useLanguage();
  const { openQuoteModal } = useQuoteModal();
  const quoteMsg = t('wa_quote_message', DEFAULT_QUOTE_MESSAGE);
  const waQuoteUrl = getWhatsAppLink(quoteMsg);

  return (
    <section className="band" id="contact">
      <div className="wrap contact-grid">
        <div>
          <header
            className={`section-head flush reveal-group ${headVisible ? 'is-visible' : ''}`}
            ref={headRef}
          >
            <p className="eyebrow reveal-item" style={{ transitionDelay: '0ms' }}>
              {t('contact_eyebrow', 'Contact')}
            </p>
            <h2 className="reveal-item" style={{ transitionDelay: '80ms' }}>
              {t('contact_title', 'Send your logo, get a quote')}
            </h2>
            <p className="lede reveal-item" style={{ transitionDelay: '160ms' }}>
              {t('contact_lede', 'Message us the design and what you want it on. We reply with the price and a sample plan.')}
            </p>
          </header>

          <dl className="contact-list">
            <ContactRow label={t('contact_whatsapp_label', 'WhatsApp')} delay={0}>
              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-number-link"
                id="wa-number"
                title="Chat on WhatsApp"
                onClick={(e) => {
                  e.preventDefault();
                  openQuoteModal();
                }}
              >
                {BUSINESS.phone}
              </a>
              <a
                className="btn primary sm magnetic-btn"
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openQuoteModal();
                }}
              >
                {t('contact_open_wa', 'Open WhatsApp')}
              </a>
              <CopyButton target="wa-number" text={BUSINESS.phone} />
            </ContactRow>

            <ContactRow label={t('contact_phone_label', 'Phone')} delay={60}>
              <a
                href={`tel:${BUSINESS.phone.replace(/[^0-9+]/g, '')}`}
                className="contact-number-link"
                id="ph-number"
                title="Call main mobile"
              >
                {BUSINESS.phone}
              </a>
              <CopyButton target="ph-number" text={BUSINESS.phone} />
              {BUSINESS.phoneAlt && (
                <>
                  <span className="phone-separator">/</span>
                  <a
                    href={`tel:${BUSINESS.phoneAlt.replace(/[^0-9+]/g, '')}`}
                    className="contact-number-link"
                    id="ph-alt"
                    title="Call alternate mobile"
                  >
                    {BUSINESS.phoneAlt}
                  </a>
                  <CopyButton target="ph-alt" text={BUSINESS.phoneAlt} />
                </>
              )}
            </ContactRow>

            {BUSINESS.landline && (
              <ContactRow label={t('contact_landline_label', 'Landline')} delay={90}>
                <a
                  href={`tel:${BUSINESS.landline.replace(/[^0-9+]/g, '')}`}
                  className="contact-number-link"
                  id="landline-number"
                  title="Call landline"
                >
                  {BUSINESS.landline}
                </a>
                <CopyButton target="landline-number" text={BUSINESS.landline} />
              </ContactRow>
            )}

            {BUSINESS.email && (
              <ContactRow label={t('contact_email_label', 'Email enquiries')} delay={110}>
                <a
                  href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Enquiry for Marking / Embossing / Dies')}`}
                  className="contact-number-link"
                  id="email-address"
                  title="Send email enquiry"
                >
                  {BUSINESS.email}
                </a>
                <a
                  className="btn ghost sm magnetic-btn"
                  href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Enquiry for Marking / Embossing / Dies')}`}
                >
                  {t('contact_send_email', 'Send email')}
                </a>
                <CopyButton target="email-address" text={BUSINESS.email} />
              </ContactRow>
            )}

            {BUSINESS.gstin && (
              <ContactRow label={t('contact_gstin_label', 'GSTIN')} delay={120}>
                <span className="contact-number-link" id="gstin-number" style={{ letterSpacing: '0.06em' }}>
                  {BUSINESS.gstin}
                </span>
                <CopyButton target="gstin-number" text={BUSINESS.gstin} />
              </ContactRow>
            )}

            <ContactRow label={t('contact_visit_label', 'Shop address')} delay={130}>
              <span className="contact-address-val">{BUSINESS.address}</span>
            </ContactRow>

            <ContactRow label={t('contact_hours_label', 'Working hours')} delay={180}>
              <span>{BUSINESS.hours}</span>
            </ContactRow>
          </dl>
        </div>

        {/* Final Photo Booth: Interactive Google Map + Address Card */}
        <div className="contact-map-booth" aria-label="Shop location map">
          <div className="map-frame-container">
            <iframe
              title="Fine Impressions and Cuts Google Map Location"
              src={BUSINESS.mapsEmbedUrl}
              className="map-iframe"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="map-booth-info">
            <div className="map-info-text">
              <a
                href={BUSINESS.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="map-badge"
                title="View FINE IMPRESSIONS & CUTS on Google Maps"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>FINE IMPRESSIONS & CUTS</span>
              </a>
              <p className="map-address-text">{BUSINESS.address}</p>
            </div>

            <a
              className="btn primary sm map-directions-btn magnetic-btn"
              href={BUSINESS.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('contact_open_maps', 'Open in Google Maps')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
