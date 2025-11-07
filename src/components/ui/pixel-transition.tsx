'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  once?: boolean;
  animationStepDuration?: number;
  className?: string;
  onTransitionComplete?: () => void;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 12,
  pixelColor = '#ffffff',
  once = false,
  animationStepDuration = 0.4,
  className = '',
  onTransitionComplete,
}) => {
  const [isSecondContent, setIsSecondContent] = useState(false);
  const [pixels, setPixels] = useState<Array<{ id: string; delay: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate pixels in random order
    const pixelArray = Array.from({ length: gridSize * gridSize }).map((_, i) => ({
      id: `pixel-${i}`,
      delay: Math.random() * animationStepDuration,
    }));
    setPixels(pixelArray);

    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [gridSize, animationStepDuration]);

  const handleTransition = () => {
    if (once && isSecondContent) return;

    // Trigger pixel animation
    setIsSecondContent(!isSecondContent);

    // Complete transition after animation duration
    transitionTimeoutRef.current = setTimeout(() => {
      onTransitionComplete?.();
    }, animationStepDuration * 1000);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleTransition}
      className={`relative w-full h-full overflow-hidden cursor-pointer group ${className}`}
    >
      {/* First Content */}
      <motion.div
        animate={{ opacity: isSecondContent ? 0 : 1, pointerEvents: isSecondContent ? 'none' : 'auto' }}
        transition={{ duration: 0.3, delay: isSecondContent ? 0.1 : 0 }}
        className="absolute inset-0 w-full h-full"
      >
        {firstContent}
      </motion.div>

      {/* Second Content */}
      <motion.div
        animate={{ opacity: isSecondContent ? 1 : 0, pointerEvents: isSecondContent ? 'auto' : 'none' }}
        transition={{ duration: 0.3, delay: isSecondContent ? 0 : 0.1 }}
        className="absolute inset-0 w-full h-full"
      >
        {secondContent}
      </motion.div>

      {/* Pixel Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: 0,
        }}
      >
        {pixels.map((pixel, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const distance = Math.sqrt(
            Math.pow(row - gridSize / 2, 2) + Math.pow(col - gridSize / 2, 2)
          );

          return (
            <motion.div
              key={pixel.id}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: isSecondContent ? 0 : 0.3,
                backgroundColor: isSecondContent
                  ? 'transparent'
                  : pixelColor,
              }}
              transition={{
                duration: animationStepDuration,
                delay: pixel.delay,
                ease: 'easeOut',
              }}
              className="w-full h-full"
              style={{
                backgroundColor: pixelColor,
                opacity: 0.3,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PixelTransition;
