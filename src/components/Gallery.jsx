import React, { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

// 6 Real workshop manufacturing dies & moulds
import p1 from '../assets/products/p1-aluminum-debossing-plate.jpg';
import p2 from '../assets/products/p2-cnc-cutting-die-punch.jpg';
import p3 from '../assets/products/p3-steel-embossing-die.jpg';
import p4 from '../assets/products/p4-steel-cutting-dies.jpg';
import p5 from '../assets/products/p5-spiral-cutting-die.jpg';
import p6 from '../assets/products/p6-ss-plate-mould.jpg';

// 12 Dedicated, distinct Recent Works images
import rw1 from '../assets/recent-works/rw-1-levis-wallet.jpg';
import rw2 from '../assets/recent-works/rw-2-brass-sizes.jpg';
import rw3 from '../assets/recent-works/rw-3-kl-macro.jpg';
import rw4 from '../assets/recent-works/rw-4-drdo-crest.jpg';
import rw5 from '../assets/recent-works/rw-5-serial-macro.jpg';
import rw6 from '../assets/recent-works/rw-6-floral-macro.jpg';
import rw7 from '../assets/recent-works/rw-7-clarks-gold.jpg';
import rw8 from '../assets/recent-works/rw-8-roeckl-text.jpg';
import rw9 from '../assets/recent-works/rw-9-mesh-macro.jpg';
import rw10 from '../assets/recent-works/rw-10-elephant-icon.jpg';
import rw11 from '../assets/recent-works/rw-11-seido-details.jpg';
import rw12 from '../assets/recent-works/rw-12-wave-macro.jpg';

// Instant background preloading with .decode() for immediate first-load availability
if (typeof window !== 'undefined') {
  window.__PRELOADED_IMAGES__ = window.__PRELOADED_IMAGES__ || [];
  [p1, p2, p3, p4, p5, p6, rw1, rw2, rw3, rw4, rw5, rw6, rw7, rw8, rw9, rw10, rw11, rw12].forEach((src) => {
    const pre = new Image();
    pre.src = src;
    if (pre.decode) pre.decode().catch(() => {});
    window.__PRELOADED_IMAGES__.push(pre);
  });
}

/**
 * 6 Recent Work columns, each rotating through 100% unique finished project photos.
 * Staggered auto-crossfade ensures continuous, lively motion without repeating
 * what's already showcased in the service sliders above.
 */
const RECENT_WORKS_CHANNELS = [
  {
    id: 'rw-col-1',
    interval: 3400,
    items: [
      { src: p1, label: 'Aluminum debossing plate', category: 'Footwear & Leather Die' },
      { src: rw1, label: 'Levi\'s embossed wallet in tin box', category: 'Finished piece' },
      { src: rw7, label: 'Clarks Contour Cushion gold foil', category: 'Footwear insole' }
    ]
  },
  {
    id: 'rw-col-2',
    interval: 4200,
    items: [
      { src: p2, label: 'CNC cutting die with punch', category: 'Tooling & Punch' },
      { src: rw2, label: 'Desigual brass sizing die set', category: 'Interchangeable blocks' },
      { src: rw8, label: 'Roeckl debossed fine leather detail', category: 'Leather patch' }
    ]
  },
  {
    id: 'rw-col-3',
    interval: 3600,
    items: [
      { src: p3, label: 'Steel embossing die', category: 'Precision Steel Block' },
      { src: rw3, label: 'Karl Lagerfeld circular KL impression', category: 'Monogram relief' },
      { src: rw9, label: 'CNC machined honeycomb mesh plate', category: 'Pattern die' }
    ]
  },
  {
    id: 'rw-col-4',
    interval: 4400,
    items: [
      { src: p4, label: 'Steel cutting dies', category: 'Hardened Cutting Dies' },
      { src: rw4, label: 'LRDE - DRDO defense research emblem', category: 'Military spec' },
      { src: rw10, label: 'Elefanten elephant brand mark', category: 'Footwear leather' }
    ]
  },
  {
    id: 'rw-col-5',
    interval: 3800,
    items: [
      { src: p5, label: 'Spiral cutting die', category: 'Concentric Blade Tool' },
      { src: rw5, label: 'Machined steel spindle laser collar', category: 'Part numbering' },
      { src: rw11, label: 'Seido Industries checking fixture grid', category: 'Data plate' }
    ]
  },
  {
    id: 'rw-col-6',
    interval: 4600,
    items: [
      { src: p6, label: 'SS plate mould', category: 'Radial Texture Mould' },
      { src: rw6, label: 'Intricate brass scrollwork relief', category: 'CNC milling' },
      { src: rw12, label: 'Wave surface multi-axis toolpath', category: 'Surface texture' }
    ]
  }
];

const ALL_RECENT_ITEMS = RECENT_WORKS_CHANNELS.flatMap((ch) => ch.items);

function AutoChangingWorkItem({ channel, index, onOpenFullscreen, fullscreenHint }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px 80px 0px' });
  const [itemIndex, setItemIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setItemIndex((prev) => (prev + 1) % channel.items.length);
        setIsFading(false);
      }, 450); // Smooth crossfade
    }, channel.interval);

    return () => clearInterval(timer);
  }, [channel.interval, channel.items.length, isPaused]);

  const current = channel.items[itemIndex];

  return (
    <div
      className={`gallery-item auto-changing-job ${isVisible ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onOpenFullscreen(current)}
      title={`Click to view full screen: ${current.label}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenFullscreen(current);
        }
      }}
    >
      <figure className="slot has-photo auto-job-slot">
        <img
          src={current.src}
          alt={current.label}
          loading="eager"
          className={`auto-job-img ${isFading ? 'is-fading' : ''}`}
        />

        {/* Hover Fullscreen Hint Badge */}
        <div className="auto-job-zoom-hint" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          <span>{fullscreenHint || 'Full screen'}</span>
        </div>

        {/* Dynamic Live Status & Description */}
        <figcaption className="slot-label auto-job-label">
          <span className="auto-job-dot" />
          <span>{current.label}</span>
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * Fullscreen Lightbox Modal Viewer
 */
export function FullscreenLightbox({ item, allItems, onClose, onNavigate }) {
  const currentIndex = allItems.findIndex((x) => x.src === item.src);
  const total = allItems.length;

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    const prevIdx = (currentIndex - 1 + total) % total;
    onNavigate(allItems[prevIdx]);
  }, [currentIndex, total, allItems, onNavigate]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % total;
    onNavigate(allItems[nextIdx]);
  }, [currentIndex, total, allItems, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image viewer"
    >
      <div className="lightbox-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar with Close Button */}
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close full screen view (Esc)"
          title="Close (Esc)"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Previous Navigation Button */}
        <button
          type="button"
          className="lightbox-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous image (Left arrow)"
          title="Previous (Left arrow)"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          className="lightbox-nav-btn next"
          onClick={handleNext}
          aria-label="Next image (Right arrow)"
          title="Next (Right arrow)"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Fullscreen Image Display */}
        <div className="lightbox-image-stage">
          <img
            key={item.src}
            src={item.src}
            alt={item.label}
            className="lightbox-fullscreen-img"
          />
        </div>

        {/* Centered Caption Footer Bar */}
        <div className="lightbox-footer-bar">
          <div className="lightbox-meta">
            <span className="lightbox-category-badge">{item.category}</span>
            <h3 className="lightbox-title">{item.label}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [headRef, headVisible] = useScrollReveal({ threshold: 0.2 });
  const [fullscreenItem, setFullscreenItem] = useState(null);
  const { t } = useLanguage();

  return (
    <section className="band alt" id="gallery">
      <div className="wrap">
        <header
          className={`section-head reveal-group ${headVisible ? 'is-visible' : ''}`}
          ref={headRef}
        >
          <p className="eyebrow reveal-item" style={{ transitionDelay: '0ms' }}>
            {t('gallery_eyebrow', 'Our work')}
          </p>
          <h2 className="reveal-item" style={{ transitionDelay: '80ms' }}>
            {t('gallery_title', 'Recent works')}
          </h2>
        </header>

        {/* 6 Auto-Changing Unique Recent Works Grid */}
        <div className="gallery">
          {RECENT_WORKS_CHANNELS.map((channel, i) => (
            <AutoChangingWorkItem
              key={channel.id}
              channel={channel}
              index={i}
              onOpenFullscreen={(item) => setFullscreenItem(item)}
              fullscreenHint={t('gallery_fullscreen_hint', 'Full screen')}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenItem && (
        <FullscreenLightbox
          item={fullscreenItem}
          allItems={ALL_RECENT_ITEMS}
          onClose={() => setFullscreenItem(null)}
          onNavigate={(newItem) => setFullscreenItem(newItem)}
        />
      )}
    </section>
  );
}
