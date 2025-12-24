'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CodingProjectsSection from '@/components/sections/CodingProjectsSection';
import CodingProjectsNavbar from '@/components/layout/CodingProjectsNavbar';
import Footer from '@/components/layout/Footer';

const CodingProjectsPageWrapper: React.FC = () => {
  return (
    <>
      <CodingProjectsNavbar />

      <main className="min-h-screen bg-background text-foreground flex flex-col pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
