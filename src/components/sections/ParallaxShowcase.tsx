'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const ParallaxShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageKey, setImageKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const isInView = useInView(ref, {
    once: false,
    margin: '-10% 0px -10% 0px'
  });

  // Disable parallax on mobile
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Restart GIF when section comes into view
  useEffect(() => {
    if (isInView && imgRef.current) {
      // Force image reload by updating the key
      setImageKey(prev => prev + 1);
    }
  }, [isInView]);

  return (
    <section ref={ref} className={`relative min-h-screen bg-black overflow-hidden ${isMobile ? 'hidden' : 'block'}`}>
      {/* Full Screen Image Container with Parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Main Image - Full Section */}
        <Image
          key={imageKey}
          ref={imgRef}
          src={`/comp 2.webp?t=${imageKey}`} // Add timestamp to prevent caching
          alt="Showcase Animation"
          fill
          className="object-cover"
          style={{ minHeight: '100vh' }}
          sizes="100vw"
          priority
        />

        {/* Optional overlay effect that changes with scroll */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"
          style={{ opacity }}
        />
      </motion.div>

      {/* Background decorative elements - positioned above image */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ opacity }}
      >
        {/* Corner accent elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-red-600/50" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-red-600/50" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-red-600/50" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-red-600/50" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>

      {/* Extra height for smooth scrolling effect */}
      <div className="h-[50vh]" />
    </section>
  );
};

export default ParallaxShowcase;
