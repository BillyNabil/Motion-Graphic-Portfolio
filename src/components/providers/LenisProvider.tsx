'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
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
  }, []);

  return <>{children}</>;
};

export default LenisProvider;