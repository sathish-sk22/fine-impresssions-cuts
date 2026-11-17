import React, { useState, useEffect, useRef } from 'react';
import p1 from '../assets/products/p1-aluminum-debossing-plate.jpg';
import p2 from '../assets/products/p2-cnc-cutting-die-punch.jpg';
import p3 from '../assets/products/p3-steel-embossing-die.jpg';
import p4 from '../assets/products/p4-steel-cutting-dies.jpg';
import p5 from '../assets/products/p5-spiral-cutting-die.jpg';
import p6 from '../assets/products/p6-ss-plate-mould.jpg';

// Instant background preloading with .decode() for immediate first-load availability
if (typeof window !== 'undefined') {
  window.__PRELOADED_IMAGES__ = window.__PRELOADED_IMAGES__ || [];
  [p1, p2, p3, p4, p5, p6].forEach((src) => {
    const pre = new Image();
    pre.src = src;
    if (pre.decode) pre.decode().catch(() => {});
    window.__PRELOADED_IMAGES__.push(pre);
  });
}

const ENGRAVING_SLIDES = [
  {
    id: 'aluminum-debossing-plate',
    src: p1,
    alt: 'Aluminum debossing plate for footwear and leather components',
    caption: 'Aluminum Debossing Plate',
    detail: 'Precision CNC milled tooling plate'
  },
  {
    id: 'cnc-cutting-die-punch',
    src: p2,
    alt: 'CNC cutting die with punch for precision leather shaping',
    caption: 'CNC Cutting Die with Punch',
    detail: 'Hardened steel punch tooling'
  },
  {
    id: 'steel-embossing-die',
    src: p3,
    alt: 'Steel embossing die for crisp signature crest impressions',
    caption: 'Steel Embossing Die',
    detail: 'Micro-relief engraved steel block'
  },
  {
    id: 'steel-cutting-dies',
    src: p4,
    alt: 'Multi-cavity steel cutting dies for shaped leather goods',
    caption: 'Steel Cutting Dies',
    detail: 'Formed & hardened cutting tools'
  },
  {
    id: 'spiral-cutting-die',
    src: p5,
    alt: 'Spiral cutting die for continuous coiled trimming',
    caption: 'Spiral Cutting Die',
    detail: 'Precision concentric blade die'
  },
  {
    id: 'ss-plate-mould',
    src: p6,
    alt: 'Stainless steel plate mould with radial textured pattern',
    caption: 'SS Plate Mould',
    detail: 'Radial textured industrial mould'
  }
];

/**
 * Pure Automatic Swipe Showcase for CNC Engraving.
 * Automatically swipes through CNC brass and steel dies and textured plates.
 */
export default function EngravingSlider() {
  const total = ENGRAVING_SLIDES.length;
  // Clone first slide at the end for an unbroken infinite forward loop
  const loopSlides = [...ENGRAVING_SLIDES, ENGRAVING_SLIDES[0]];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (currentIndex >= total) {
      // Reached clone slide: snap cleanly to 0 without transition after slide finishes swiping
      timeoutId = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(0);
      }, 660);
    } else {
      timeoutId = setTimeout(() => {
        setWithTransition(true);
        setCurrentIndex((prev) => (prev >= total ? 1 : prev + 1));
      }, 2800);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, total]);

  const handleTransitionEnd = () => {
    if (currentIndex >= total) {
      setWithTransition(false);
      setCurrentIndex(0);
    }
  };

  const activeIndex = currentIndex % total;
  const activeSlide = ENGRAVING_SLIDES[activeIndex];

  return (
    <figure className="laser-slider-wrapper" aria-label="Automatic CNC engraving photo showcase">
      <div className="laser-slider-viewport">
        {/* Automatic Swipe Slides Track */}
        <div
          className="laser-slides-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: withTransition
              ? 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopSlides.map((slide, idx) => (
            <div key={`${slide.id}-${idx}`} className="laser-slide-item">
              <img
                src={slide.src}
                alt={slide.alt}
                className="laser-slide-img"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Ambient Gradient Overlay for text readability */}
        <div className="laser-slider-scrim" />

        {/* Slide Caption */}
        <div className="laser-slide-meta">
          <figcaption className="laser-slide-caption">
            <strong>{activeSlide.caption}</strong>
            <small>{activeSlide.detail}</small>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
