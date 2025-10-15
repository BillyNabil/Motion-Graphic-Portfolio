'use client';

import { ReactNode } from 'react';
import { LoadingProvider, useLoading } from '@/contexts/loading-context';
import LoadingScreenOptimized from '@/components/ui/loading-screen-optimized';
import PerformanceProvider from '@/components/providers/PerformanceProvider';
import BrowserCompatibilityProvider from '@/components/providers/BrowserCompatibilityProvider';

interface AppProvidersProps {
  children: ReactNode;
}

const AppContent = ({ children }: { children: ReactNode }) => {
  const { isInitialLoad, setInitialLoadComplete } = useLoading();

  return (
    <>
      <LoadingScreenOptimized onComplete={setInitialLoadComplete} />
      {!isInitialLoad && (
        <div className="min-h-screen">
          {children}
        </div>
      )}
    </>
  );
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserCompatibilityProvider>
      <LoadingProvider>
        <PerformanceProvider>
          <AppContent>{children}</AppContent>
        </PerformanceProvider>
      </LoadingProvider>
    </BrowserCompatibilityProvider>
  );
};