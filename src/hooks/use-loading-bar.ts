'use client';

import { useLoading } from '@/contexts/loading-context';

/**
 * Hook to access loading state for the loading bar
 */
export const useLoadingBar = () => {
  return useLoading();
};
