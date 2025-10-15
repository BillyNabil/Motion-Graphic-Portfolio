'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Check if browser supports smooth scrolling and Lenis
    const browserInfo = (window as { __browserInfo?: {
      isModernBrowser: boolean;
      supportsRequestAnimationFrame: boolean;
      isIE: boolean;
      isSafari: boolean;
    } }).__browserInfo;
    const shouldUseLenis = browserInfo?.isModernBrowser && browserInfo?.supportsRequestAnimationFrame && !browserInfo?.isIE;

    if (shouldUseLenis) {
      try {
        // Initialize Lenis
        const lenis = new Lenis({
          smoothWheel: true,
          lerp: 0.1,
          duration: 1.2,
          easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          syncTouch: false,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          infinite: false,
          anchors: false,
          autoResize: true,
          overscroll: true,
          autoRaf: false,
        });

        // Use requestAnimationFrame to continuously update the scroll
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
          lenis.destroy();
        };
      } catch (error) {
        console.warn('Lenis failed to initialize, falling back to native smooth scrolling:', error);
        // Fallback to native smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    } else {
      // Fallback for older browsers
      document.documentElement.style.scrollBehavior = 'smooth';

      // Add smooth scrolling polyfill for older browsers
      if (browserInfo?.isIE || browserInfo?.isSafari) {
        // Simple smooth scroll implementation for older browsers
        const smoothScroll = (element: HTMLElement, target: number, duration: number) => {
          const start = element.scrollTop;
          const change = target - start;
          const startTime = performance.now();

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            element.scrollTop = start + change * easeInOutCubic(progress);

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        };

        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        // Override smooth scroll behavior for anchor links
        document.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const anchor = target.closest('a[href^="#"]');
          if (anchor) {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute('href')!);
            if (targetElement) {
              smoothScroll(document.documentElement, targetElement.getBoundingClientRect().top + window.pageYOffset, 800);
            }
          }
        });
      }
    }
  }, []);

  return <>{children}</>;
};

export default LenisProvider;