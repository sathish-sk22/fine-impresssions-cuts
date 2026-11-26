import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const getNormalizedPath = () => {
    if (typeof window === 'undefined') return '/';
    let path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path || '/';
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to) => {
    if (typeof window === 'undefined') return;

    // External or special links
    if (
      to.startsWith('http') ||
      to.startsWith('mailto:') ||
      to.startsWith('tel:') ||
      to.endsWith('.pdf')
    ) {
      window.location.href = to;
      return;
    }

    // Hash links on subpages
    if (to.startsWith('/#')) {
      window.history.pushState({}, '', to);
      setCurrentPath('/');
      setTimeout(() => {
        const hash = to.replace('/#', '#');
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    window.history.pushState({}, '', to);
    setCurrentPath(getNormalizedPath());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export function Link({ to, children, className, onClick, ...props }) {
  const { navigate } = useNavigation();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // Don't intercept if modifier keys were pressed (Cmd/Ctrl + click to open in new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    if (
      !e.defaultPrevented &&
      !to.startsWith('http') &&
      !to.startsWith('mailto:') &&
      !to.startsWith('tel:') &&
      !to.endsWith('.pdf')
    ) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
