'use client';

import { useEffect, useState } from 'react';

interface BottomLoadingBarSimpleProps {
  isLoading?: boolean;
  duration?: number;
}

/**
 * Simple Bottom Loading Bar Component
 * Displays a progress bar at the bottom of the screen
 * Pure CSS without Framer Motion for guaranteed visibility
 */
const BottomLoadingBarSimple = ({
  isLoading = true,
  duration = 4000,
}: BottomLoadingBarSimpleProps) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isLoading) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    let animationFrameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted, isLoading, duration]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: isLoading ? `${progress}%` : '0%',
        height: '3px',
        backgroundColor: '#DC2626',
        zIndex: 9998,
        transition: isLoading ? 'none' : 'width 0.3s ease-in-out, opacity 0.3s ease-in-out',
        opacity: isLoading ? 1 : 0,
      }}
    />
  );
};

export default BottomLoadingBarSimple;
