'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  duration?: number;
  glow?: boolean;
}

const HoverCard = ({
  children,
  className = '',
  hoverScale = 1.05,
  hoverY = -5,
  duration = 0.3,
  glow = true
}: HoverCardProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: glow ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.1)",
      }}
      transition={{
        duration: duration,
        ease: "easeOut"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;