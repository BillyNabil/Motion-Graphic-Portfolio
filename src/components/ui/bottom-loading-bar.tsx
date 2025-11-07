'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomLoadingBarProps {
  isLoading?: boolean;
  duration?: number;
  color?: string;
  height?: number;
}

/**
 * Bottom Loading Bar Component
 * Displays a progress bar at the bottom of the screen
 */
const BottomLoadingBar = ({
  isLoading = true,
  duration = 4000,
  color = 'bg-red-600',
  height = 3,
}: BottomLoadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isLoading) return;

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
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${height}px`,
            width: `${progress}%`,
            backgroundColor: '#DC2626', // red-600
            zIndex: 9998,
            transition: 'opacity 0.3s ease-in-out',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
};

export default BottomLoadingBar;
