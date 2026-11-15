import React, { useState, useEffect, useRef } from 'react';
import img1 from '../assets/laser-marking/laser-marking-1.jpg';
import img2 from '../assets/laser-marking/laser-marking-2.jpg';
import img3 from '../assets/laser-marking/laser-marking-3.jpg';
import img4 from '../assets/laser-marking/laser-marking-4.jpg';

// Instant background preloading with .decode() for immediate first-load availability
if (typeof window !== 'undefined') {
  window.__PRELOADED_IMAGES__ = window.__PRELOADED_IMAGES__ || [];
  [img1, img2, img3, img4].forEach((src) => {
    const pre = new Image();
    pre.src = src;
    if (pre.decode) pre.decode().catch(() => {});
    window.__PRELOADED_IMAGES__.push(pre);
  });
}

const SLIDES = [
  {
    id: 'fixture-plate',
    src: img1,
    alt: 'Industrial checking fixture nameplate with crisp laser etching',
    caption: 'Checking Fixture Plate',
    detail: 'High-contrast black anodized plate'
  },
  {
    id: 'metal-dial',
    src: img2,
    alt: 'Precision metal dial with laser marked star emblem',
    caption: 'Precision Metal Dial',
    detail: 'Laser engraved star emblem'
  },
  {
    id: 'steel-spindle',
    src: img3,
    alt: 'Machined steel spindle with laser marked serial numbers',
    caption: 'Machined Steel Spindle',
    detail: 'Permanent serial & MFR codes'
  },
  {
    id: 'drdo-panel',
    src: img4,
    alt: 'Defense electronics enclosure panel with DRDO emblem',
    caption: 'Defense Enclosure Panel',
    detail: 'LRDE - DRDO defense emblem'
  }
];

/**
 * Pure Automatic Swipe Showcase for Laser Marking.
 * Seamless, automatic forward swiping with zero manual buttons or slide counters.
 */
export default function LaserMarkingSlider() {
  const total = SLIDES.length;
  // Clone first slide at the end for an infinite forward swipe without rewinding
  const loopSlides = [...SLIDES, SLIDES[0]];

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

  // When clone slide finishes swiping in, reset seamlessly to 0 without transition
  const handleTransitionEnd = () => {
    if (currentIndex >= total) {
      setWithTransition(false);
      setCurrentIndex(0);
    }
  };

  const activeIndex = currentIndex % total;
  const activeSlide = SLIDES[activeIndex];

  return (
    <figure className="laser-slider-wrapper" aria-label="Automatic laser marking photo showcase">
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
