import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fic-lang');
      if (saved && TRANSLATIONS[saved]) return saved;
    }
    return 'en'; // default english
  });

  const setLang = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLangState(newLang);
      try {
        localStorage.setItem('fic-lang', newLang);
      } catch (e) {
        // ignore
      }
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('fic-lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      // ignore
    }
  }, [lang]);

  const t = (key, fallback) => {
    const current = TRANSLATIONS[lang]?.[key];
    if (current !== undefined) return current;
    const fallbackEn = TRANSLATIONS['en']?.[key];
    if (fallbackEn !== undefined) return fallbackEn;
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
