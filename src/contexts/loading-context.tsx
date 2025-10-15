'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  isInitialLoad: boolean;
  setInitialLoadComplete: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('has-visited-billynabil');

    if (hasVisited) {
      // If user has visited before, skip the initial loading screen
      setIsInitialLoad(false);
    } else {
      // Mark as visited after the loading screen would complete
      const timer = setTimeout(() => {
        localStorage.setItem('has-visited-billynabil', 'true');
        setIsInitialLoad(false);
      }, 2500); // Slightly longer than the loading screen duration

      return () => clearTimeout(timer);
    }
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setInitialLoadComplete = () => {
    setIsInitialLoad(false);
    localStorage.setItem('has-visited-billynabil', 'true');
  };

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    isInitialLoad,
    setInitialLoadComplete,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};