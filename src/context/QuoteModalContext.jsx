import React, { createContext, useContext, useState } from 'react';

const QuoteModalContext = createContext();

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState(null);

  const openQuoteModal = (category = null) => {
    setInitialCategory(category);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setInitialCategory(null);
  };

  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        initialCategory,
        openQuoteModal,
        closeQuoteModal
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
}
