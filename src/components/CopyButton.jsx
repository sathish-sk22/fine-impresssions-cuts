import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CopyButton({ text, target, labelText }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const { t } = useLanguage();

  const copyLabel = labelText || t('contact_copy', 'Copy');
  const copiedLabel = t('contact_copied', 'Copied!');

  const resetLater = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const fallbackCopy = () => {
    const el = document.getElementById(target);
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    setCopied(true);
    resetLater();
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        resetLater();
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }
  };

  return (
    <button
      className={`sticker-copy-badge ${copied ? 'is-copied' : ''}`}
      type="button"
      onClick={handleCopy}
      aria-label={`${copied ? copiedLabel : copyLabel}: ${text}`}
      title={copied ? copiedLabel : `${copyLabel} ${text}`}
    >
      {/* Sticker peel gloss reflection */}
      <span className="sticker-peel-gloss" aria-hidden="true" />

      {copied ? (
        <>
          <svg
            className="sticker-icon is-check"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="sticker-text">{copiedLabel}</span>
        </>
      ) : (
        <>
          <svg
            className="sticker-icon"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span className="sticker-text">{copyLabel}</span>
        </>
      )}
    </button>
  );
}
