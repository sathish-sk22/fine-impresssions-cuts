import React, { useState, useEffect, useRef } from 'react';
import eng1 from '../assets/engraving/engraving-1.jpg';
import eng2 from '../assets/engraving/engraving-2.jpg';
import eng3 from '../assets/engraving/engraving-3.jpg';
import eng4 from '../assets/engraving/engraving-4.jpg';
import eng5 from '../assets/engraving/engraving-5.jpg';
import eng6 from '../assets/engraving/engraving-6.jpg';

// Instant background preloading with .decode() for immediate first-load availability
if (typeof window !== 'undefined') {
  window.__PRELOADED_IMAGES__ = window.__PRELOADED_IMAGES__ || [];
  [eng1, eng2, eng3, eng4, eng5, eng6].forEach((src) => {
    const pre = new Image();
    pre.src = src;
    if (pre.decode) pre.decode().catch(() => {});
    window.__PRELOADED_IMAGES__.push(pre);
  });
}

const ENGRAVING_SLIDES = [
  {
    id: 'floral-die',
    src: eng1,
    alt: 'CNC engraved floral scrollwork brass die plate',
    caption: 'Floral Brass Die Plate',
    detail: 'Precision 3D CNC relief milling'
  },
  {
    id: 'roeckl-steel-dies',
    src: eng2,
    alt: 'CNC machined steel dies for leather embossing',
    caption: 'Machined Steel Dies',
    detail: 'Hardened steel embossing blocks'
  },
  {
    id: 'honeycomb-die',
    src: eng3,
    alt: 'Intricate metal textured honeycomb scale pattern die plate',
    caption: 'Honeycomb Scale Die',
    detail: 'Micro-textured pattern plate'
  },
  {
    id: 'wave-plate',
    src: eng4,
    alt: 'Wave and flame textured CNC engraved metal plate',
    caption: 'Wave Texture Plate',
    detail: 'Multi-axis dimensional surface'
  },
  {
    id: 'desigual-dies',
    src: eng5,
    alt: 'Desigual brass branding dies with interchangeable size blocks',
    caption: 'Desigual Branding Dies',
    detail: 'Custom brass dies with size set'
  },
  {
    id: 'levis-die-wallet',
    src: eng6,
    alt: 'Levi\'s brass die with embossed leather wallet',
    caption: 'Levi\'s Die & Wallet',
    detail: 'Brass batwing stamp & finished piece'
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
