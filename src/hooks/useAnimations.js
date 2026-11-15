import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer hook that marks an element as "in view"
 * once it scrolls into the viewport. Once revealed, it stays revealed.
 *
 * @param {object} options
 * @param {string} options.threshold - 0..1, fraction visible to trigger
 * @param {string} options.rootMargin - shrink/expand the trigger box
 * @returns {[React.RefObject, boolean]}
 */
export function useScrollReveal({ threshold = 0.05, rootMargin = '0px 0px 80px 0px' } = {}) {
  const ref = useRef(null);
  // Default to true so images and sections are immediately visible on first load without delay
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  return [ref, isVisible];
}

/**
 * 3D tilt effect driven by mouse position over an element.
 * Returns a ref to attach and the computed transform style.
 * Resets smoothly when the cursor leaves.
 *
 * @param {object} options
 * @param {number} options.maxTilt - max degrees of rotation (default 8)
 * @param {number} options.scale - scale on hover (default 1.02)
 * @param {number} options.glareOpacity - 0..1 glare intensity
 * @returns {{ ref, style, glareStyle, onMouseMove, onMouseLeave }}
 */
export function useTilt({ maxTilt = 8, scale = 1.02, glareOpacity = 0.18 } = {}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const rafRef = useRef(null);

  const onMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0..1
      const y = (e.clientY - rect.top) / rect.height;    // 0..1
      const tiltX = (0.5 - y) * maxTilt;
      const tiltY = (x - 0.5) * maxTilt;
      setTransform(`perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale},${scale},1)`);
      setGlarePos({ x: x * 100, y: y * 100, opacity: glareOpacity });
    });
  };

  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    setGlarePos({ x: 50, y: 50, opacity: 0 });
  };

  const style = {
    transform,
    transition: 'transform 0.25s cubic-bezier(.03,.98,.52,.99)',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };

  const glareStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 3,
    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 60%)`,
    transition: 'background 0.25s ease',
  };

  return { ref, style, glareStyle, onMouseMove, onMouseLeave };
}

/**
 * Magnetic hover effect: element subtly follows the cursor when hovered.
 * Good for buttons and small interactive elements.
 *
 * @param {object} options
 * @param {number} options.strength - pixel pull toward cursor (default 6)
 * @returns {{ ref, style, onMouseMove, onMouseLeave }}
 */
export function useMagnetic({ strength = 6 } = {}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2) * strength;
    const dy = (e.clientY - cy) / (rect.height / 2) * strength;
    setOffset({ x: dx, y: dy });
  };

  const onMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px)`,
    transition: 'transform 0.3s cubic-bezier(.03,.98,.52,.99)',
  };

  return { ref, style, onMouseMove, onMouseLeave };
}

/**
 * Parallax scroll offset. Returns a small translateY value based on scroll position.
 *
 * @param {number} speed - parallax speed factor (default 0.08)
 * @returns {[React.RefObject, object]}
 */
export function useParallax(speed = 0.08) {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        // How far the element center is from viewport center, normalized
        const center = rect.top + rect.height / 2;
        const delta = (center - viewH / 2) * speed;
        setOffsetY(delta);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  const style = {
    transform: `translateY(${offsetY.toFixed(1)}px)`,
    willChange: 'transform',
  };

  return [ref, style];
}
