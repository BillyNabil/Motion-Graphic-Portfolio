'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useActiveSection } from '@/contexts/ActiveSectionContext';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Works', href: '#works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Terms', href: '#terms' },
  { name: 'Contact', href: '#contact' },
] as const;

const Navbar = () => {
  const router = useRouter();
  const { activeSection } = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Debounced resize handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    // Initial check (immediate)
    setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Memoized active index
  const activeIndex = useMemo(() =>
    navItems.findIndex(item => item.href === `#${activeSection}`),
    [activeSection]
  );

  // Calculate indicator position
  const indicatorStyle = useMemo(() => {
    const targetIndex = isHovering !== null ? isHovering : activeIndex;
    const element = tabsRef.current[targetIndex];

    if (!element || targetIndex === -1) {
      return { opacity: 0, left: 0, width: 0 };
    }

    return {
      opacity: 1,
      left: element.offsetLeft,
      width: element.getBoundingClientRect().width,
    };
  }, [activeIndex, isHovering]);

  // Optimized nav click handler
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  }, []);

  // Handle coding projects navigation
  const goToCodingProjects = useCallback(() => {
    router.push('/coding-projects');
  }, [router]);

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            {/* Coding Projects Button */}
            <Button
              onClick={goToCodingProjects}
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md w-12 h-12"
              title="View Coding Projects"
            >
              <Code2 className="h-5 w-5" />
            </Button>

            {/* Desktop Navigation - Optimized Slide Tabs */}
            <div className="relative">
              <ul
                ref={navRef}
                onMouseLeave={() => setIsHovering(null)}
                className="relative mx-auto flex w-fit rounded-full border border-white/5 bg-black/50 backdrop-blur-md p-1.5 shadow-2xl"
              >
                {navItems.map((item, i) => (
                  <li
                    key={item.name}
                    ref={(el) => { tabsRef.current[i] = el; }}
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={() => setIsHovering(i)}
                    className={`relative z-10 block cursor-pointer px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${activeSection === item.href.slice(1)
                        ? 'text-black'
                        : 'text-neutral-400 hover:text-white'
                      }`}
                  >
                    {item.name}
                  </li>
                ))}

                {/* Sliding Indicator - Using CSS transition instead of Framer Motion */}
                <li
                  className="absolute z-0 top-1.5 bottom-1.5 rounded-full bg-white shadow-sm transition-all duration-300 ease-out"
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                    opacity: indicatorStyle.opacity,
                    height: 'calc(100% - 12px)',
                  }}
                  aria-hidden="true"
                />
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-6 right-6 z-50">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white w-12 h-12"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full h-[100dvh] max-w-none border-none bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-0 m-0 rounded-none">
              <div className="flex flex-col items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-4xl font-bold uppercase tracking-tight transition-colors duration-200 ${activeSection === item.href.slice(1)
                        ? 'text-white'
                        : 'text-neutral-500 hover:text-white'
                      }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-12 text-center">
                <p className="text-xs text-neutral-500 uppercase tracking-widest">© 2025 Billynabil</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Navbar;
