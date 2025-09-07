import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

interface ShinobiProContextType {
  isPro: boolean;
  activatePro: () => void;
}

const ShinobiProContext = createContext<ShinobiProContextType | null>(null);

export const useShinobiPro = () => {
  const context = useContext(ShinobiProContext);
  if (!context) {
    throw new Error("useShinobiPro must be used within a ShinobiProProvider");
  }
  return context;
};

export const ShinobiProProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const proStatus = localStorage.getItem('shinobi-pro-status');
    if (proStatus === 'true') {
      setIsPro(true);
    }
  }, []);

  const activatePro = useCallback(() => {
    localStorage.setItem('shinobi-pro-status', 'true');
    setIsPro(true);
  }, []);

  return (
    <ShinobiProContext.Provider value={{ isPro, activatePro }}>
      {children}
    </ShinobiProContext.Provider>
  );
};
