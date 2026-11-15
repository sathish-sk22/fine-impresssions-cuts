import React from 'react';
import { STEPS } from '../data/businessData';
import { useScrollReveal } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

function StepItem({ step, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <li
      className={`step hover-lift ${isVisible ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="n">{step.n}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </li>
  );
}

export default function Process() {
  const [headRef, headVisible] = useScrollReveal({ threshold: 0.2 });
  const { t } = useLanguage();

  const eyebrow = t('process_eyebrow', 'How it works');
  const title = t('process_title', 'From your logo to the finished piece');
  const stepsList = t('steps', STEPS);

  return (
    <section className="band" id="process">
      <div className="wrap">
        <header
          className={`section-head reveal-group ${headVisible ? 'is-visible' : ''}`}
          ref={headRef}
        >
          <p className="eyebrow reveal-item" style={{ transitionDelay: '0ms' }}>{eyebrow}</p>
          <h2 className="reveal-item" style={{ transitionDelay: '80ms' }}>{title}</h2>
        </header>

        <ol className="steps">
          {stepsList.map((s, i) => (
            <StepItem key={s.n} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
