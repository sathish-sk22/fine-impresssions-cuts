import React from 'react';
import { IMAGES } from '../data/businessData';

/**
 * Slot component that displays a photo if available in IMAGES config,
 * or an architectural blueprint/hatch placeholder with a reticle crosshair.
 */
export default function Slot({ slot, label, ratio }) {
  const src = IMAGES[slot];
  const style = ratio ? { '--ar': ratio } : undefined;

  return (
    <figure
      className={`slot${src ? ' has-photo' : ''}`}
      data-slot={slot}
      style={style}
    >
      {src ? (
        <img src={src} alt={label} loading="eager" />
      ) : (
        <figcaption className="slot-label">{label}</figcaption>
      )}
    </figure>
  );
}
