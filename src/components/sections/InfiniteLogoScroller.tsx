'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SharpStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14 11L24 12L14 13L12 24L10 13L0 12L10 11Z" />
  </svg>
);

const adobeTools = [
  { name: 'AFTER EFFECTS', type: 'text' as const },
  { name: 'separator', type: 'icon' as const },
  { name: 'PREMIERE PRO', type: 'text' as const },
  { name: 'separator', type: 'icon' as const },
  { name: 'CINEMA 4D', type: 'text' as const },
  { name: 'separator', type: 'icon' as const },
  { name: 'BLENDER', type: 'text' as const },
  { name: 'separator', type: 'icon' as const },
  { name: 'FIGMA', type: 'text' as const },
  { name: 'separator', type: 'icon' as const },
  { name: 'ILLUSTRATOR', type: 'text' as const },
  { name: 'separator', type: 'icon' as const },
];

const LogoItem = ({ logo, isMobile, outlined = false }: { logo: { name: string; type: 'text' | 'icon' }, isMobile: boolean, outlined?: boolean }) => {
  if (logo.type === 'icon') {
    return (
      <div className="flex items-center justify-center px-4 md:px-8">
        <SharpStar className={`w-8 h-8 md:w-12 md:h-12 ${outlined ? 'text-white' : 'text-primary'} animate-pulse`} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4 md:px-8">
      <span className={`
        font-display font-bold whitespace-nowrap tracking-tighter
        ${isMobile ? 'text-3xl' : 'text-7xl'}
        ${outlined ? 'text-transparent text-stroke-thick' : 'text-white'}
      `}>
        {logo.name}
      </span>
    </div>
  );
};

const Ribbon = ({ logos, direction, delay = 0, isMobile, outlined = false }: {
  logos: typeof adobeTools,
  direction: 'left' | 'right',
  delay?: number,
  isMobile: boolean,
  outlined?: boolean
}) => {
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <motion.div
      className="flex items-center"
      initial={{ x: direction === 'left' ? 0 : -1000 }}
      animate={{
        x: direction === 'left' ? "-50%" : "0%",
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: isMobile ? 30 : 60,
          ease: "linear",
          delay: delay,
        },
      }}
    >
      {duplicatedLogos.map((logo, index) => (
        <LogoItem key={`${logo.name}-${index}`} logo={logo} isMobile={isMobile} outlined={outlined} />
      ))}
    </motion.div>
  );
};

const InfiniteLogoScroller = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="bg-black py-32 relative overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">

      {/* Background Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Central Header */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-primary drop-shadow-md">
            {/* System Capabilities Removed */}
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
            Creative<br />Arsenal
          </h2>
        </div>
      </div>

      {/* Desktop X-Layout */}
      {!isMobile && (
        <div className="relative w-full h-[600px] flex items-center justify-center scale-110">

          {/* Ribbon 1: Filled */}
          <div
            className="absolute w-[150%] bg-white/5 border-y border-white/10 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
            style={{ transform: 'rotate(-15deg)' }}
          >
            <div className="py-6">
              <Ribbon logos={adobeTools} direction="left" isMobile={false} />
            </div>
          </div>

          {/* Ribbon 2: Outlined */}
          <div
            className="absolute w-[150%] bg-black/40 border-y border-white/10 backdrop-blur-sm shadow-2xl z-20"
            style={{ transform: 'rotate(15deg)' }}
          >
            <div className="py-6">
              <Ribbon logos={adobeTools} direction="right" isMobile={false} outlined={true} />
            </div>
          </div>

        </div>
      )}

      {/* Mobile Stack Layout */}
      {isMobile && (
        <div className="relative w-full flex flex-col gap-12 py-12">
          <div className="w-full bg-white/5 border-y border-white/10 backdrop-blur-sm py-4">
            <Ribbon logos={adobeTools} direction="left" isMobile={true} />
          </div>
          <div className="w-full bg-black/40 border-y border-white/10 backdrop-blur-sm py-4">
            <Ribbon logos={adobeTools} direction="right" isMobile={true} outlined={true} />
          </div>
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)]" />

    </section>
  );
};

export default InfiniteLogoScroller;
