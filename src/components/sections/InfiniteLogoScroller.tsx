'use client';

import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/optimized-image';

const adobeTools = [
  {
    name: 'AFTER EFFECTS',
    type: 'text' as const
  },
  {
    name: 'star',
    type: 'icon' as const,
    icon: '/973-9737225_black-4-point-star-four-pointed-star.png'
  },
  {
    name: 'PREMIERE PRO',
    type: 'text' as const
  },
  {
    name: 'star',
    type: 'icon' as const,
    icon: '/973-9737225_black-4-point-star-four-pointed-star.png'
  },
  {
    name: 'PHOTOSHOP',
    type: 'text' as const
  },
  {
    name: 'star',
    type: 'icon' as const,
    icon: '/973-9737225_black-4-point-star-four-pointed-star.png'
  },
  {
    name: 'ILLUSTRATOR',
    type: 'text' as const
  },
  {
    name: 'star',
    type: 'icon' as const,
    icon: '/973-9737225_black-4-point-star-four-pointed-star.png'
  },
];

const LogoItem = ({ logo }: { logo: { name: string; type: 'text' | 'icon'; icon?: string } }) => {
  return (
    <div className="flex items-center justify-center px-8">
      {logo.type === 'text' ? (
        <div className="text-black font-black text-6xl whitespace-nowrap">
          {logo.name}
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center">
          <OptimizedImage
            src={logo.icon!}
            alt={logo.name}
            className="w-full h-full object-contain"
            width={80}
            height={80}
          />
        </div>
      )}
    </div>
  );
};

const Ribbon = ({ logos, direction, delay }: {
  logos: { name: string; type: 'text' | 'icon'; icon?: string }[],
  direction: 'left' | 'right',
  delay?: number
}) => {
  // Create many copies for completely seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <motion.div
      className="flex items-center"
      animate={{
        x: direction === 'left'
          ? [0, -(logos.length * 200)] // 200px per item for large text with padding
          : [-(logos.length * 200), 0],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Smooth, not too fast
          ease: "linear",
          delay: delay || 0,
        },
      }}
    >
      {duplicatedLogos.map((logo, index) => (
        <LogoItem key={`${logo.name}-${index}`} logo={logo} />
      ))}
    </motion.div>
  );
};

const InfiniteLogoScroller = () => {
  return (
    <section id="skills" className="bg-black py-20 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-20"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4"><span className="text-red-700">CREATIVE SKILLS</span>
        </h2>
      </motion.div>

      {/* X-Shaped Ribbons Container */}
      <div className="relative w-full h-96 flex items-center justify-center">
        {/* First Ribbon - Diagonal from top-left to bottom-right */}
        <div className="absolute w-full h-32 bg-white flex items-center overflow-hidden shadow-2xl"
             style={{
               transform: 'rotate(-25deg) translateY(-100px)',
               transformOrigin: 'center',
               width: '200%',
               left: '-50%'
             }}>
          <Ribbon logos={adobeTools} direction="left" />
        </div>

        {/* Second Ribbon - Diagonal from top-right to bottom-left */}
        <div className="absolute w-full h-32 bg-white flex items-center overflow-hidden shadow-2xl"
             style={{
               transform: 'rotate(25deg) translateY(100px)',
               transformOrigin: 'center',
               width: '200%',
               left: '-50%'
             }}>
          <Ribbon logos={adobeTools} direction="right" delay={0.5} />
        </div>
      </div>

      {/* Gradient Masks for fade effect at edges */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black via-black/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Border Strokes for top and bottom edges */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent z-30" />
    </section>
  );
};

export default InfiniteLogoScroller;