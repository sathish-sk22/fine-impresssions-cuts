import React, { useState, useEffect, useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS, getWhatsAppLink } from '../data/businessData';

const OPTIONS = [
  {
    id: 'laser-marking',
    num: '1',
    name: 'Laser Marking',
    tag: 'Metals & Alloys',
    desc: 'Deep engraved serials, logos, barcodes & defense panels.'
  },
  {
    id: 'engraving',
    num: '2',
    name: 'Engraving',
    tag: '2D & 3D CNC',
    desc: 'CNC engraving dies, steel cutting dies & punches.'
  },
  {
    id: 'embossing',
    num: '3',
    name: 'Embossing',
    tag: 'Leather & Foil',
    desc: 'Leather embossing & hot foil stamping dies.'
  },
  {
    id: '3d-design',
    num: '4',
    name: '3D Design',
    tag: 'Relief & CAD',
    desc: 'Precision 2D & 3D CAD modeling from sketches or photos.'
  }
];

export default function QuoteModal() {
  const { isOpen, initialCategory, closeQuoteModal } = useQuoteModal();
  const { t } = useLanguage();
  const noteInputId = useId();

  // Selected options state (array of IDs)
  const [selectedIds, setSelectedIds] = useState(() => {
    if (initialCategory && OPTIONS.some((opt) => opt.id === initialCategory)) {
      return [initialCategory];
    }
    // Default to the first option or all
    return ['laser-marking'];
  });

  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync initialCategory when modal opens
  useEffect(() => {
    if (initialCategory && OPTIONS.some((opt) => opt.id === initialCategory)) {
      setSelectedIds([initialCategory]);
    } else if (selectedIds.length === 0) {
      setSelectedIds(['laser-marking']);
    }
  }, [initialCategory, isOpen]);

  // Handle ESC key & scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeQuoteModal();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeQuoteModal]);

  if (!isOpen) return null;

  const toggleOption = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // If it's the only one, keep at least one selected, or allow empty
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAll = () => {
    setSelectedIds(OPTIONS.map((o) => o.id));
  };

  // Build the message cleanly
  const activeOptions = OPTIONS.filter((o) => selectedIds.includes(o.id));
  let message = 'Hi, I need quotation for:\n';

  if (activeOptions.length === 1) {
    message += `Option ${activeOptions[0].num}: ${activeOptions[0].name}`;
  } else {
    message += activeOptions
      .map((opt) => `Option ${opt.num}: ${opt.name}`)
      .join('\n');
  }

  if (notes.trim()) {
    message += `\n\nDetails: ${notes.trim()}`;
  }

  const waUrl = getWhatsAppLink(message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="quote-modal-overlay"
      onClick={closeQuoteModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="quote-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="quote-modal-header">
          <div>
            <div className="quote-modal-badge">
              <span className="pulse-dot" />
              {t('quote_modal_badge', 'QUOTATION REQUEST')}
            </div>
            <h2 id="quote-modal-title" className="quote-modal-title">
              {t('quote_modal_title', 'Select services for quotation')}
            </h2>
            <p className="quote-modal-subtitle">
              {t('quote_modal_subtitle', 'Choose what you need so we prepare the best price plan on WhatsApp.')}
            </p>
          </div>
          <button
            type="button"
            className="quote-modal-close"
            onClick={closeQuoteModal}
            aria-label="Close quote modal (Esc)"
            title="Close (Esc)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Options Theme Grid */}
        <div className="quote-modal-body">
          <div className="quote-options-bar">
            <span className="quote-options-label">
              {t('quote_modal_options_label', 'Categories')} ({activeOptions.length} of {OPTIONS.length} selected):
            </span>
            {activeOptions.length < OPTIONS.length && (
              <button type="button" className="quote-select-all-btn" onClick={selectAll}>
                {t('quote_modal_select_all', 'Select all')}
              </button>
            )}
          </div>

          <div className="quote-options-grid" role="group" aria-label="Select quotation categories">
            {OPTIONS.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`quote-option-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => toggleOption(opt.id)}
                  aria-pressed={isSelected}
                >
                  <div className="quote-option-top">
                    <span className="quote-option-num">Option {opt.num}</span>
                    <span className="quote-option-tag">{opt.tag}</span>
                  </div>
                  <div className="quote-option-title-row">
                    <h3 className="quote-option-title">{opt.name}</h3>
                    <div className="quote-checkbox" aria-hidden="true">
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="quote-option-desc">{opt.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Optional Details Input */}
          <div className="quote-notes-wrap">
            <label htmlFor={noteInputId} className="quote-notes-label">
              {t('quote_modal_notes_label', 'Additional info (optional):')}
            </label>
            <input
              id={noteInputId}
              type="text"
              className="quote-notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('quote_modal_notes_ph', 'e.g. Stainless steel 304, approx 50 pcs, or urgent deadline')}
            />
          </div>

          {/* Live Message Preview */}
          <div className="quote-preview-wrap">
            <div className="quote-preview-head">
              <span className="quote-preview-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                {t('quote_modal_preview', 'WhatsApp Message Preview')}
              </span>
              <button
                type="button"
                className="quote-copy-btn"
                onClick={handleCopy}
                title="Copy formatted message"
              >
                {copied ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{t('quote_modal_copied', 'Copied!')}</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{t('quote_modal_copy', 'Copy message')}</span>
                  </>
                )}
              </button>
            </div>
            <pre className="quote-preview-box">{message}</pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="quote-modal-footer">
          <button
            type="button"
            className="btn quote-btn-cancel"
            onClick={closeQuoteModal}
          >
            {t('quote_modal_cancel', 'Close')}
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary quote-btn-submit"
            onClick={closeQuoteModal}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
            </svg>
            <span>{t('quote_modal_continue', 'Send to WhatsApp')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
