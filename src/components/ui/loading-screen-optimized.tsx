'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreenOptimized = ({ onComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Hanya gunakan load screen.gif untuk initial load dan refresh
  const loadingGif = '/load screen.gif';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load dan detect GIF duration
    const img = new Image();
    img.onload = () => {
      // Set timer untuk 4 detik (durasi GIF)
      const timer = setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, 4000);

      return () => clearTimeout(timer);
    };
    img.src = loadingGif;

  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Loading GIF Container - Full Screen */}
          <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
            <motion.img
              src={loadingGif}
              alt="Loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full h-full object-cover"
              style={{
                animation: 'none', // GIF handles its own loop
              }}
            />
          </div>

          {/* Single Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="h-1 w-8 rounded-full bg-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreenOptimized;
