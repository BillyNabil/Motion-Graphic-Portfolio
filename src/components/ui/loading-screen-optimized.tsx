'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreenOptimized = ({ onComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Optimized loading simulation
    const duration = 1500; // Reduced from 2s to 1.5s
    const steps = 30; // Reduced steps
    const increment = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress((prev) => {
        const newProgress = Math.min(100, currentStep * increment);
        if (newProgress >= 100) {
          clearInterval(timer);
          // Reduced delay before hiding
          setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, [mounted, onComplete]);

  
  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          
          {/* Main loading content */}
          <div className="relative z-10 text-center px-4">
            
            {/* Simplified text animation - no character-by-character */}
            <div className="space-y-3">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white italic"
              >
                BILLYNABIL
              </motion.h1>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 italic"
              >
                COMMISSION
              </motion.h2>

              {/* Simplified tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-sm sm:text-base text-gray-400 max-w-md mx-auto italic"
              >
                Motion Graphics Designer
              </motion.p>
            </div>

            {/* Simplified progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-8 max-w-xs mx-auto"
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Loading... {Math.round(progress)}%
              </div>
            </motion.div>

            {/* Simple CSS dots animation instead of Framer Motion */}
            <div className="mt-6 flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full"
                  style={{
                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* CSS Animation Styles */}
          <style jsx>{`
            @keyframes pulse {
              0%, 80%, 100% {
                opacity: 0.3;
                transform: scale(0.8);
              }
              40% {
                opacity: 1;
                transform: scale(1.2);
              }
            }

            /* Reduce animations on low-end devices */
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreenOptimized;