'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CodingProjectsSection from '@/components/sections/CodingProjectsSection';
import CodingProjectsNavbar from '@/components/layout/CodingProjectsNavbar';
import Footer from '@/components/layout/Footer';

const CodingProjectsPageWrapper: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState<'in' | 'loading' | 'out'>('in');

  useEffect(() => {
    // Phase 1: Fade in loading screen (300ms)
    const fadeInTimer = setTimeout(() => {
      setLoadingPhase('loading');
    }, 300);

    // Phase 2: Show loading screen (4000ms - match GIF duration)
    const showLoadingTimer = setTimeout(() => {
      setLoadingPhase('out');
    }, 4300);

    // Phase 3: Fade out loading screen (500ms)
    const fadeOutTimer = setTimeout(() => {
      setShowLoading(false);
    }, 4800);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(showLoadingTimer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <>
      <CodingProjectsNavbar />
      
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="initial-loading"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{
              opacity: loadingPhase === 'loading' ? 1 : loadingPhase === 'out' ? 1 : 0,
              backdropFilter: loadingPhase === 'loading' ? 'blur(8px)' : 'blur(0px)',
            }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{
              opacity: {
                duration: loadingPhase === 'in' ? 0.3 : loadingPhase === 'out' ? 0.5 : 0,
                ease: 'easeInOut',
              },
              backdropFilter: {
                duration: 0.4,
                ease: 'easeInOut',
              },
            }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 overflow-hidden backdrop-blur-md"
          >
            <motion.div
              className="relative w-screen h-screen flex items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: loadingPhase === 'loading' ? 1 : 0.95,
                opacity: loadingPhase === 'loading' ? 1 : 0,
              }}
              transition={{
                scale: { duration: 0.4, ease: 'easeOut' },
                opacity: { duration: 0.3, ease: 'easeInOut' },
              }}
            >
              <Image
                src="/loading 2.gif"
                alt="Loading..."
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: showLoading ? 4.5 : 0, ease: 'easeInOut' }}
          className="flex-1"
        >
          <CodingProjectsSection />
        </motion.div>
        <Footer />
      </main>
    </>
  );
};

export default CodingProjectsPageWrapper;
