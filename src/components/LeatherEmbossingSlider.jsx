import React, { useState, useEffect, useRef } from 'react';
import emb1 from '../assets/leather-embossing/embossing-1.jpg';
import emb2 from '../assets/leather-embossing/embossing-2.jpg';
import emb3 from '../assets/leather-embossing/embossing-3.jpg';
import emb4 from '../assets/leather-embossing/embossing-4.jpg';
import emb5 from '../assets/leather-embossing/embossing-5.jpg';
import emb6 from '../assets/leather-embossing/embossing-6.jpg';
import emb7 from '../assets/leather-embossing/embossing-7.jpg';

// Instant background preloading with .decode() for immediate first-load availability
if (typeof window !== 'undefined') {
  window.__PRELOADED_IMAGES__ = window.__PRELOADED_IMAGES__ || [];
  [emb1, emb2, emb3, emb4, emb5, emb6, emb7].forEach((src) => {
    const pre = new Image();
    pre.src = src;
    if (pre.decode) pre.decode().catch(() => {});
    window.__PRELOADED_IMAGES__.push(pre);
  });
}

const EMBOSSING_SLIDES = [
  {
    id: 'roeckl',
    src: emb1,
    alt: 'Roeckl genuine leather debossed emblem and cross marks',
    caption: 'Roeckl Leather Patch',
    detail: 'Precision heat & pressure deboss'
  },
  {
    id: 'elefanten',
    src: emb2,
    alt: 'Elefanten circular embossed logo on fine leather',
    caption: 'Elefanten Circular Stamp',
    detail: 'Deep die stamp on footwear leather'
  },
  {
    id: 'guess-relief',
    src: emb3,
    alt: 'GUESS EST. 1981 high relief 3D embossing',
    caption: 'GUESS EST. 1981 Relief',
    detail: 'Raised dimensional 3D embossing'
  },
  {
    id: 'monogram-pattern',
    src: emb4,
    alt: 'Luxury monogram repeat pattern embossed leather sheet',
    caption: 'Monogram Repeat Sheet',
    detail: 'All-over textured pattern press'
  },
  {
    id: 'hugo',
    src: emb5,
    alt: 'HUGO bold debossed lettering on black grain leather',
    caption: 'HUGO Leather Deboss',
    detail: 'Clean deboss on textured calfskin'
  },
  {
    id: 'clarks-gold',
    src: emb6,
    alt: 'Clarks Contour Cushion gold foil embossed leather insole',
    caption: 'Clarks Contour Insole',
    detail: 'Hot foil metallic gold stamping'
  },
  {
    id: 'karl-lagerfeld',
    src: emb7,
    alt: 'Karl Lagerfeld circular monogram debossed on leather jacket',
    caption: 'Karl Lagerfeld KL Logo',
    detail: 'Custom circular die impression'
  }
];

/**
 * Pure Automatic Swipe Showcase for Leather Embossing.
 * Automatically and seamlessly swipes forward continuously through real client embossing jobs.
 */
export default function LeatherEmbossingSlider() {
  const total = EMBOSSING_SLIDES.length;
  // Clone first slide at the end for an unbroken infinite forward loop
  const loopSlides = [...EMBOSSING_SLIDES, EMBOSSING_SLIDES[0]];

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
  const activeSlide = EMBOSSING_SLIDES[activeIndex];

  return (
    <figure className="laser-slider-wrapper" aria-label="Automatic leather embossing photo showcase">
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
