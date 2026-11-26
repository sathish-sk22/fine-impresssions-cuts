import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Customers from './components/Customers';
import Services from './components/Services';
import Extras from './components/Extras';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

import CncEngravingPage from './pages/CncEngravingPage';
import LaserMarkingPage from './pages/LaserMarkingPage';
import MetalEngravingPage from './pages/MetalEngravingPage';
import LeatherEmbossingPage from './pages/LeatherEmbossingPage';

function AppContent({ theme, toggleTheme }) {
  const { currentPath } = useNavigation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document title, meta tags, and canonical link per route dynamically
  useEffect(() => {
    let title = "Fine Impressions and Cuts | Laser Marking, Embossing & Engraving";
    let desc = "Permanent marks on metal and leather. Laser marking, embossing, and CNC engraving for shops, factories, and gift buyers in Chennai.";
    let canonical = "https://fineimpressions.in/";

    if (currentPath === '/cnc-engraving') {
      title = "CNC Engraving Services in Chennai | 2D & 3D Precision Dies | Fine Impressions";
      desc = "Expert CNC engraving services in Chennai. 2D & 3D precision engraving on tool steel, brass & aluminum for cutting dies, embossing punches & moulds in Padi.";
      canonical = "https://fineimpressions.in/cnc-engraving/";
    } else if (currentPath === '/laser-marking') {
      title = "Industrial Laser Marking Services in Chennai | Fine Impressions";
      desc = "Precision fiber laser marking services in Chennai. High-contrast serial numbers, QR codes, logos & barcodes on stainless steel, brass, titanium & engineering plastics.";
      canonical = "https://fineimpressions.in/laser-marking/";
    } else if (currentPath === '/metal-engraving') {
      title = "Metal Engraving Services in Chennai | Custom Precision Engraving | Fine Impressions";
      desc = "Custom metal engraving services in Chennai. Precision engraving on brass, stainless steel, aluminium & copper for industrial nameplates, dials, dies & panels.";
      canonical = "https://fineimpressions.in/metal-engraving/";
    } else if (currentPath === '/leather-embossing') {
      title = "Leather Embossing Services in Chennai | Custom Dies & Stamping | Fine Impressions";
      desc = "Specialist leather embossing services & dies in Chennai. 20+ years manufacturing brass embossing dies, debossing plates & hot foil stamping for footwear & bags.";
      canonical = "https://fineimpressions.in/leather-embossing/";
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonical);
      document.head.appendChild(canonicalLink);
    }
  }, [currentPath]);

  const renderPage = () => {
    switch (currentPath) {
      case '/cnc-engraving':
        return <CncEngravingPage />;
      case '/laser-marking':
        return <LaserMarkingPage />;
      case '/metal-engraving':
        return <MetalEngravingPage />;
      case '/leather-embossing':
        return <LeatherEmbossingPage />;
      default:
        return (
          <main id="top">
            <Hero />
            <Customers />
            <Services />
            <Extras />
            <Process />
            <Gallery />
            <Contact />
          </main>
        );
    }
  };

  return (
    <div className={scrolled ? 'has-scrolled' : ''}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fic-theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fic-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <NavigationProvider>
      <LanguageProvider>
        <AppContent theme={theme} toggleTheme={toggleTheme} />
      </LanguageProvider>
    </NavigationProvider>
  );
}
