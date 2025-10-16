'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/contexts/ActiveSectionContext';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Works', href: '#works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { activeSection } = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
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
  const [slidePosition, setSlidePosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.href === `#${activeSection}`);
    const selectedTabElement = tabsRef.current[activeIndex];
    if (selectedTabElement) {
      const { width } = selectedTabElement.getBoundingClientRect();
      setSlidePosition({
        left: selectedTabElement.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [activeSection]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    !isMobile && (
      <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
        >
      {/* Desktop Navigation - Slide Tabs */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <ul
            onMouseLeave={() => {
              const activeIndex = navItems.findIndex(item => item.href === `#${activeSection}`);
              const selectedTabElement = tabsRef.current[activeIndex];
              if (selectedTabElement) {
                const { width } = selectedTabElement.getBoundingClientRect();
                setSlidePosition({
                  left: selectedTabElement.offsetLeft,
                  width,
                  opacity: 1,
                });
              }
            }}
            className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item.name}
                ref={(el) => {
                    if (el) tabsRef.current[i] = el;
                  }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => {
                  if (!tabsRef.current[i]) return;
                  const { width } = tabsRef.current[i].getBoundingClientRect();
                  setSlidePosition({
                    left: tabsRef.current[i].offsetLeft,
                    width,
                    opacity: 1,
                  });
                }}
                className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base font-semibold transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-primary mix-blend-difference'
                    : 'text-white mix-blend-difference hover:text-primary'
                }`}
              >
                {item.name}
              </motion.li>
            ))}

            <motion.li
              animate={{
                ...slidePosition,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.3,
              }}
              className="absolute z-0 h-7 rounded-full bg-black md:h-12"
            />
          </ul>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border-2 border-black bg-white">
              <Menu className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ x: 10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`text-lg transition-colors duration-200 text-left font-medium ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  <span className="inline-block mr-2">→</span>
                  {item.name}
                </motion.button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.nav>
    )
  );
};

export default Navbar;
