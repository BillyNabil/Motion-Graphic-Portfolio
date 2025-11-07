'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenAdvancedProps {
  onComplete?: () => void;
  duration?: number;
  gifPath?: string;
  showProgress?: boolean;
}

/**
 * Advanced Loading Screen with GIF Loop Control
 * Provides frame-by-frame GIF control and fallback handling
 */
const LoadingScreenAdvanced = ({
  onComplete,
  duration = 4000,
  gifPath = '/load screen.gif',
  showProgress = true,
}: LoadingScreenAdvancedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update progress bar
  useEffect(() => {
    if (!isLoading || !showProgress) return;

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    startTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading, duration, showProgress]);

  // Handle loading timer and GIF loading
  useEffect(() => {
    if (!mounted) return;

    const img = new Image();

    img.onload = () => {
      // Ensure GIF is displayed
      if (imageRef.current) {
        imageRef.current.style.display = 'block';
      }

      // Set timer for loading screen duration
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, duration);
    };

    img.onerror = () => {
      console.warn(`Failed to load GIF: ${gifPath}`);
      // Fallback: still complete loading after duration
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, duration);
    };

    img.src = gifPath;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mounted, gifPath, duration, onComplete]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* GIF Container */}
          <div className="relative w-full h-full">
            {/* GIF Image */}
            <motion.img
              ref={imageRef}
              src={gifPath}
              alt="Loading Screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
              style={{
                WebkitUserSelect: 'none',
                userSelect: 'none',
                pointerEvents: 'none',
                WebkitTouchCallout: 'none',
              }}
              loading="eager"
              decoding="async"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Bottom Progress Section */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Progress Bar */}
            {showProgress && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>

                {/* Loading Text with Percentage */}
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <p className="text-white/80 text-xs tracking-widest uppercase">
                    Loading
                  </p>
                  <p className="text-white/50 text-xs">
                    {Math.round(progress)}%
                  </p>
                </motion.div>
              </div>
            )}

            {/* Animated Dots Alternative */}
            {!showProgress && (
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreenAdvanced;
