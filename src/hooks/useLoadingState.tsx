'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLoading } from '@/contexts/loading-context';

interface UseLoadingStateOptions {
  minDuration?: number;
  timeout?: number;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const { setLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const { minDuration = 500, timeout = 10000 } = options;

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setLoading(true);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoading(false);
  }, [setLoading]);

  const executeWithLoading = useCallback(async <T,>(
    asyncFunction: () => Promise<T>,
    options?: { minDuration?: number }
  ): Promise<T> => {
    const startTime = Date.now();
    startLoading();

    try {
      const result = await asyncFunction();

      // Ensure minimum loading duration for better UX
      const elapsed = Date.now() - startTime;
      const minDur = options?.minDuration || minDuration;

      if (elapsed < minDur) {
        await new Promise(resolve => setTimeout(resolve, minDur - elapsed));
      }

      return result;
    } catch (error) {
      console.error('Error in executeWithLoading:', error);
      throw error;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, minDuration]);

  // Auto-timeout for safety
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        console.warn('Loading state timed out');
        stopLoading();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isLoading, stopLoading, timeout]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    executeWithLoading,
  };
};

// Hook for page navigation loading
export const useNavigationLoading = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const { executeWithLoading } = useLoadingState({ minDuration: 300 });

  const navigateWithLoading = useCallback(async (navigate: () => void | Promise<void>) => {
    setIsNavigating(true);
    try {
      await executeWithLoading(async () => {
        const result = navigate();
        if (result instanceof Promise) {
          await result;
        }
      });
    } finally {
      setIsNavigating(false);
    }
  }, [executeWithLoading]);

  return {
    isNavigating,
    navigateWithLoading,
  };
};