'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
      className="fixed top-8 left-8 z-50"
    >
      <motion.button
        onClick={handleBackClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-black bg-white hover:bg-black transition-colors duration-200 cursor-pointer group"
        title="Back to Motion Graphic"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-black group-hover:text-white transition-colors duration-200"
          >
            {/* Mograph icon - abstract motion graphic symbol */}
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="12" cy="12" r="2.5" />
            <circle cx="6" cy="18" r="2.5" />
            <circle cx="18" cy="18" r="2.5" />
            <path d="M6 8.5v3M18 8.5v3M12 14.5v3M8.5 6h3M14.5 6h3M8.5 18h3M14.5 18h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </motion.button>
    </motion.nav>
  );
}
