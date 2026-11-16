import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { FullscreenLightbox } from './Gallery';
import goldGanesha from '../assets/extras/gold-ganesha-plate.jpg';
import goldGoddess from '../assets/extras/gold-goddess-emboss.jpg';

const DEFAULT_EXTRAS = [
  { title: "Design help", text: "Send a rough sketch or a photo and we prepare the file for marking." },
  { title: "Bulk and gift orders", text: "Corporate gifts, wedding favours and festival hampers in any quantity." }
];

export default function Extras() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });
  const [fullscreenItem, setFullscreenItem] = useState(null);
  const { t } = useLanguage();

  const eyebrow = t('extras_eyebrow', 'Beyond the main three');
  const title = t('extras_title', 'Extra things we do');
  const lede = t('extras_lede', 'Not every job fits one box. These are the special things we also take on.');
  const btn = t('extras_btn', 'Ask about a special job');
  const dimBottom = t('extras_dim_bottom', 'Special jobs');
  const dimLeft = t('extras_dim_left', 'Real work');
  const drgNo = t('extras_drg_no', '003');
  const scale = t('extras_scale', '1:1');
  const sheetTitle = t('extras_sheet_title', 'Extra things we do');
  const items = t('extras_items', DEFAULT_EXTRAS);
  const fullscreenHint = t('gallery_fullscreen_hint', 'Full screen');

  // Interactive photos that support fullscreen zoom like Gallery
  const photoFront = {
    src: goldGanesha,
    label: t('extras_photo_front_label', 'Gold embossed Lord Ganesha foil plate'),
    category: t('extras_photo_front_cat', 'Special metal embossing')
  };

  const photoBack = {
    src: goldGoddess,
    label: t('extras_photo_back_label', 'Deep relief embossed gold deity plate'),
    category: t('extras_photo_back_cat', 'Custom devotional dies')
  };

  const allPhotos = [photoFront, photoBack];

  return (
    <section className="opt optB" id="extras" aria-label={title}>
      <div className={`in reveal-group ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        <div className="copy">
          <header className="sh reveal-item" style={{ transitionDelay: '0ms' }}>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p className="lede">{lede}</p>
          </header>

          <ul className="list reveal-item" style={{ transitionDelay: '80ms' }}>
            {items.map((item, i) => (
              <li key={item.title || i}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="reveal-item" style={{ transitionDelay: '160ms' }}>
            <a className="btn" href="#contact">
              {btn}
            </a>
          </div>

          {/* Desktop connecting dashed curved arrow (compact short pointer) */}
          <svg className="arrow" viewBox="0 0 160 60" fill="none" aria-hidden="true">
            <path
              d="M6 46C45 48 85 36 144 14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="7 6"
              strokeLinecap="round"
            />
            <path
              d="M130 13L145 14L137 25"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Mobile connecting dashed curved arrow */}
        <svg className="arrow-m" viewBox="0 0 120 70" fill="none" aria-hidden="true">
          <path
            d="M10 4C60 8 100 30 96 62"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="10 9"
            strokeLinecap="round"
          />
          <path
            d="M104 50.5L96 62L91 48.9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Blueprint Photos Stage with tilted frames, zoom hover hint and fullscreen click */}
        <div className="photos reveal-item" style={{ transitionDelay: '200ms' }}>
          <div className="dim-b">
            <span>{dimBottom}</span>
          </div>
          <div className="dim-l">
            <span>{dimLeft}</span>
          </div>

          {/* Back tilted photo (clickable zoom) */}
          <div
            className="frame back"
            role="button"
            tabIndex={0}
            onClick={() => setFullscreenItem(photoBack)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFullscreenItem(photoBack);
              }
            }}
            title={`${fullscreenHint}: ${photoBack.label}`}
            aria-label={`${fullscreenHint}: ${photoBack.label}`}
          >
            <figure className="slot">
              <img src={goldGoddess} alt={photoBack.label} loading="lazy" />
              {/* Zoom badge hint */}
              <div className="auto-job-zoom-hint" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span>{fullscreenHint}</span>
              </div>
            </figure>
          </div>

          {/* Front tilted photo (clickable zoom) */}
          <div
            className="frame front"
            role="button"
            tabIndex={0}
            onClick={() => setFullscreenItem(photoFront)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFullscreenItem(photoFront);
              }
            }}
            title={`${fullscreenHint}: ${photoFront.label}`}
            aria-label={`${fullscreenHint}: ${photoFront.label}`}
          >
            <figure className="slot">
              <img src={goldGanesha} alt={photoFront.label} loading="lazy" />
              {/* Zoom badge hint */}
              <div className="auto-job-zoom-hint" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span>{fullscreenHint}</span>
              </div>
            </figure>
          </div>
        </div>

        {/* Blueprint title block */}
        <div className="sheet">
          <span>Drg no</span>
          <b>{drgNo}</b>
          <span>Scale</span>
          <b>{scale}</b>
          <span>Sheet</span>
          <b>{sheetTitle}</b>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal Viewer like Gallery */}
      {fullscreenItem && (
        <FullscreenLightbox
          item={fullscreenItem}
          allItems={allPhotos}
          onClose={() => setFullscreenItem(null)}
          onNavigate={(newItem) => setFullscreenItem(newItem)}
        />
      )}
    </section>
  );
}
