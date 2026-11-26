import React from 'react';
import { BUSINESS, getWhatsAppLink, DEFAULT_QUOTE_MESSAGE, MATERIALS } from '../data/businessData';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import LaserSimulator from './LaserSimulator';

export default function Hero() {
  const [copyRef, copyVisible] = useScrollReveal({ threshold: 0.1 });
  const { t } = useLanguage();

  const tagline = t('hero_tagline', BUSINESS.tagline);
  const headline = t('hero_headline', BUSINESS.headline);
  const description = t('hero_description', BUSINESS.description);
  const waCta = t('hero_whatsapp_cta', 'Send your logo on WhatsApp');
  const quoteMsg = t('wa_quote_message', DEFAULT_QUOTE_MESSAGE);
  const waQuoteUrl = getWhatsAppLink(quoteMsg);
  const workCta = t('hero_work_cta', 'See our work');
  const materialsList = t('materials', MATERIALS);

  return (
    <section className="hero hero-fullscreen">
      {/* 3D Laser marking simulator covering the entire viewport */}
      <div className="fullscreen-3d-bg">
        <LaserSimulator />
      </div>

      {/* Floating text & CTA overlay */}
      <div className="wrap hero-wrap">
        <div
          className={`hero-overlay-card reveal-group ${copyVisible ? 'is-visible' : ''}`}
          ref={copyRef}
        >
          <p className="eyebrow reveal-item" style={{ transitionDelay: '0ms' }}>
            {tagline}
          </p>
          <h1 className="reveal-item" style={{ transitionDelay: '80ms' }}>
            {headline}
          </h1>
          <p className="lede reveal-item" style={{ transitionDelay: '160ms' }}>
            {description}
          </p>

          <div className="cta-row reveal-item" style={{ transitionDelay: '240ms' }}>
            <a
              className="btn primary magnetic-btn"
              href={waQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {waCta}
            </a>
            <a
              className="btn btn-work-highlight magnetic-btn"
              href="#gallery"
            >
              <span>{workCta}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <ul
            className="materials reveal-item"
            aria-label={t('hero_materials_title', 'Materials we work on')}
            style={{ transitionDelay: '320ms' }}
          >
            {materialsList.map((m, i) => (
              <li key={m} style={{ transitionDelay: `${340 + i * 50}ms` }}>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
