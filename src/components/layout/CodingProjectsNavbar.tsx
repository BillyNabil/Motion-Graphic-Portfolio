'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function CodingProjectsNavbar() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-8 left-8 z-50 mix-blend-difference"
    >
      <motion.button
        onClick={handleBackClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black text-white transition-all duration-300 cursor-pointer group"
        title="Back to Portfolio"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-wider">Back</span>
      </motion.button>
    </motion.nav>
  );
}
