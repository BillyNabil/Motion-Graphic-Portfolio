'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenGifLoopProps {
  onComplete?: () => void;
  duration?: number;
  gifPath?: string;
}

/**
 * Loading Screen with GIF Loop Component
 * Handles continuous GIF looping with proper cleanup and fade-out animation
 */
const LoadingScreenGifLoop = ({
  onComplete,
  duration = 4000,
  gifPath = '/load screen.gif',
}: LoadingScreenGifLoopProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize component mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle loading timer and GIF loading
  useEffect(() => {
    if (!mounted) return;

    // Create image to preload GIF
    const img = new Image();
    
    img.onload = () => {
      setGifLoaded(true);

      // Set timer for loading screen duration
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, duration);
    };

    img.onerror = () => {
      console.warn(`Failed to load GIF: ${gifPath}`);
      // If GIF fails to load, still show loading screen for duration
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, duration);
    };

    img.src = gifPath;

    // Cleanup
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
          {/* GIF Container - Full Screen */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.img
              ref={imageRef}
              src={gifPath}
              alt="Loading Screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ 
                opacity: gifLoaded ? 1 : 0, 
                scale: 1 
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              style={{
                // Ensure GIF loops naturally
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Loading Progress Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 flex flex-col items-center gap-3"
            style={{ x: '-50%' }}
          >
            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
            
            {/* Loading Text */}
            <motion.p
              className="text-white text-xs tracking-widest uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreenGifLoop;
