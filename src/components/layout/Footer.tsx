'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative bg-black text-white py-6 sm:py-8 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50" />

      {/* Main content */}
      <div className="relative z-10 container-responsive">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          {/* Copyright text with elegant typography */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light tracking-wide text-responsive-xs">
              © {currentYear} Billynabil. All rights reserved.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2 font-light text-responsive-xs"
            >
              Motion Graphics Designer & Visual Storyteller
            </motion.p>
          </motion.div>

          {/* Elegant divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px sm:60px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"
          />
        </div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 origin-left"
      />
    </motion.footer>
  );
};

export default Footer;