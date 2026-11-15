import React, { useState, useRef, useEffect } from 'react';
import { BUSINESS } from '../data/businessData';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

export default function Header({ theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef(null);

  const { lang, setLang, languages, t } = useLanguage();

  const closeMenu = () => setMobileMenuOpen(false);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    }
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownOpen]);

  const navItems = [
    { href: '#customers', label: t('nav_customers', 'Customers') },
    { href: '#services', label: t('nav_services', 'Services') },
    { href: '#process', label: t('nav_process', 'How it works') },
    { href: '#gallery', label: t('nav_gallery', 'Our work') },
    { href: '#contact', label: t('nav_contact', 'Contact') },
    { 
      href: '/Fine-Impressions-and-Cuts-Catalog.pdf', 
      label: t('nav_catalog', 'Catalog'), 
      isExternal: true 
    }
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href="#top" aria-label={`${BUSINESS.name}, home`} onClick={closeMenu}>
          <img
            src={logoImg}
            alt="Fine Impressions and Cuts logo"
            className="brand-logo-img"
          />
          <span className="brand-text">{BUSINESS.name}</span>
        </a>

        <nav className="nav" aria-label="Main">
          {/* Desktop links */}
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className={item.isExternal ? 'nav-catalog-link' : ''}
              >
                {item.label}
                {item.isExternal && <span className="nav-pdf-tag">PDF</span>}
              </a>
            ))}
          </div>

          {/* Language Selector Dropdown (Desktop & Top Bar) */}
          <div className="lang-dropdown-wrapper" ref={langRef}>
            <button
              type="button"
              className={`lang-trigger-btn ${langDropdownOpen ? 'is-active' : ''}`}
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={langDropdownOpen}
              aria-label={t('lang_select_title', 'Select language')}
              title={t('lang_select_title', 'Select language')}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="lang-trigger-text">{currentLangObj.native}</span>
              <svg className={`lang-chevron ${langDropdownOpen ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {langDropdownOpen && (
              <div className="lang-menu" role="menu">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="menuitem"
                    className={`lang-option ${lang === item.code ? 'selected' : ''}`}
                    onClick={() => {
                      setLang(item.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span className="lang-native-name">{item.native}</span>
                    <span className="lang-latin-name">({item.label})</span>
                    {lang === item.code && (
                      <svg className="lang-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          {onToggleTheme && (
            <button
              type="button"
              className="theme-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
          )}

          {/* CTA button */}
          <a className="btn primary sm desktop-cta" href="#contact">
            {t('nav_quote_btn', 'Get a quote')}
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="wrap">
            {/* Mobile Language Switcher Row */}
            <div className="mobile-lang-row">
              <span className="mobile-lang-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {t('lang_select_title', 'Language')}
              </span>
              <div className="mobile-lang-pills">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`mobile-lang-pill ${lang === item.code ? 'active' : ''}`}
                    onClick={() => {
                      setLang(item.code);
                    }}
                  >
                    {item.native}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                  {item.isExternal && <span className="nav-pdf-tag">PDF</span>}
                </a>
              ))}
              <a className="btn primary" href="#contact" onClick={closeMenu}>
                {t('nav_quote_btn', 'Get a quote')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
