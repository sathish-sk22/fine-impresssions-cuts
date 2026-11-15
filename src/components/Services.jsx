import React from 'react';
import { SERVICES } from '../data/businessData';
import Slot from './Slot';
import LaserMarkingSlider from './LaserMarkingSlider';
import LeatherEmbossingSlider from './LeatherEmbossingSlider';
import EngravingSlider from './EngravingSlider';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

function ServiceCard({ service, index, t }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  // Map service ID to translated content
  let tag = service.tag;
  let title = service.title;
  let text = service.text;
  let uses = service.uses;
  let cta = service.cta;

  if (service.id === 'laser-marking') {
    tag = t('service_laser_tag', tag);
    title = t('service_laser_title', title);
    text = t('service_laser_text', text);
    uses = t('service_laser_uses', uses);
    cta = t('service_laser_cta', cta);
  } else if (service.id === 'embossing') {
    tag = t('service_emboss_tag', tag);
    title = t('service_emboss_title', title);
    text = t('service_emboss_text', text);
    uses = t('service_emboss_uses', uses);
    cta = t('service_emboss_cta', cta);
  } else if (service.id === 'engraving') {
    tag = t('service_engrave_tag', tag);
    title = t('service_engrave_title', title);
    text = t('service_engrave_text', text);
    uses = t('service_engrave_uses', uses);
    cta = t('service_engrave_cta', cta);
  }

  return (
    <article
      className={`service hover-lift ${isVisible ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {service.id === 'laser-marking' ? (
        <LaserMarkingSlider />
      ) : service.id === 'embossing' ? (
        <LeatherEmbossingSlider />
      ) : service.id === 'engraving' ? (
        <EngravingSlider />
      ) : (
        <Slot slot={service.slot} label={service.photoLabel} />
      )}
      <p className="tag">{tag}</p>
      <h3>{title}</h3>
      <p>{text}</p>
      <ul className="good-for">
        {uses.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
      <a className="btn ghost sm magnetic-btn" href="#contact">
        {cta}
      </a>
    </article>
  );
}

export default function Services() {
  const [headRef, headVisible] = useScrollReveal({ threshold: 0.2 });
  const { t } = useLanguage();

  return (
    <section className="band alt" id="services">
      <div className="wrap">
        <header
          className={`section-head reveal-group ${headVisible ? 'is-visible' : ''}`}
          ref={headRef}
        >
          <p className="eyebrow reveal-item" style={{ transitionDelay: '0ms' }}>
            {t('services_eyebrow', 'What we do')}
          </p>
          <h2 className="reveal-item" style={{ transitionDelay: '80ms' }}>
            {t('services_title', 'Three ways to put your mark on it')}
          </h2>
        </header>

        <div className="service-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id || s.slot} service={s} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
