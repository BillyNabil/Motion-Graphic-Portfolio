'use client';

import { useEffect, useState } from 'react';

interface BrowserInfo {
  isWebGLSupported: boolean;
  isWebGL2Supported: boolean;
  isModernBrowser: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isChrome: boolean;
  isEdge: boolean;
  isIE: boolean;
  supportsTouch: boolean;
  supportsIntersectionObserver: boolean;
  supportsRequestAnimationFrame: boolean;
  supportsCSSGrid: boolean;
  supportsFlexbox: boolean;
  supportsES6: boolean;
}

const BrowserCompatibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setBrowserInfo] = useState<BrowserInfo>({
    isWebGLSupported: false,
    isWebGL2Supported: false,
    isModernBrowser: false,
    isSafari: false,
    isFirefox: false,
    isChrome: false,
    isEdge: false,
    isIE: false,
    supportsTouch: false,
    supportsIntersectionObserver: false,
    supportsRequestAnimationFrame: false,
    supportsCSSGrid: false,
    supportsFlexbox: false,
    supportsES6: false,
  });

  useEffect(() => {
    // Detect browser features
    const detectBrowserFeatures = () => {
      // WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const gl2 = canvas.getContext('webgl2');

      // Browser detection
      const userAgent = navigator.userAgent.toLowerCase();
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      const isFirefox = /firefox/.test(userAgent);
      const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);
      const isEdge = /edge/.test(userAgent) || /edg/.test(userAgent);
      const isIE = /msie/.test(userAgent) || /trident/.test(userAgent);

      // Feature detection
      const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const supportsIntersectionObserver = 'IntersectionObserver' in window;
      const supportsRequestAnimationFrame = 'requestAnimationFrame' in window;
      const supportsCSSGrid = CSS.supports('display', 'grid');
      const supportsFlexbox = CSS.supports('display', 'flex');
      const supportsES6 = typeof Symbol !== 'undefined' && typeof Promise !== 'undefined';

      // Modern browser detection
      const isModernBrowser = !isIE && supportsES6 && supportsRequestAnimationFrame && supportsIntersectionObserver;

      const info: BrowserInfo = {
        isWebGLSupported: !!gl,
        isWebGL2Supported: !!gl2,
        isModernBrowser,
        isSafari,
        isFirefox,
        isChrome,
        isEdge,
        isIE,
        supportsTouch,
        supportsIntersectionObserver,
        supportsRequestAnimationFrame,
        supportsCSSGrid,
        supportsFlexbox,
        supportsES6,
      };

      setBrowserInfo(info);

      // Add classes to body for CSS targeting
      document.body.classList.add('js');
      if (isModernBrowser) document.body.classList.add('modern-browser');
      if (isSafari) document.body.classList.add('safari');
      if (isFirefox) document.body.classList.add('firefox');
      if (isChrome) document.body.classList.add('chrome');
      if (isEdge) document.body.classList.add('edge');
      if (isIE) document.body.classList.add('ie');
      if (supportsTouch) document.body.classList.add('touch-device');
      if (!gl) document.body.classList.add('no-webgl');
      if (!gl2) document.body.classList.add('no-webgl2');

      // Store browser info for other components
      (window as { __browserInfo?: BrowserInfo }).__browserInfo = info;

      return info;
    };

    const info = detectBrowserFeatures();

    // Polyfills for older browsers
    if (!info.supportsRequestAnimationFrame) {
      // Simple requestAnimationFrame polyfill
      window.requestAnimationFrame = function(callback: FrameRequestCallback) {
        return setTimeout(callback, 1000 / 60) as unknown as number;
      };
      window.cancelAnimationFrame = function(id: number) {
        clearTimeout(id);
      };
    }

    // Add smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
      // Try to load smoothscroll-polyfill
      try {
        import('smoothscroll-polyfill').then((module: { polyfill?: () => void }) => {
          if (module.polyfill) {
            module.polyfill();
          }
        }).catch(() => {
          // Fallback smooth scroll implementation
          document.documentElement.style.scrollBehavior = 'smooth';
        });
      } catch {
        // Fallback smooth scroll implementation
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    }

    // Add IntersectionObserver polyfill for older browsers
    if (!info.supportsIntersectionObserver) {
      try {
        import('intersection-observer').catch(() => {
          console.warn('IntersectionObserver not supported and polyfill failed to load');
        });
      } catch {
        console.warn('IntersectionObserver not supported');
      }
    }

    // Performance optimizations based on browser
    if (info.isSafari) {
      document.body.classList.add('safari-performance-hack');
    }

    if (info.isIE) {
      document.body.classList.add('ie-performance-hack');
    }

    // Device detection for performance tuning
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        document.body.classList.add('device-mobile');
      } else if (width <= 1024) {
        document.body.classList.add('device-tablet');
      } else {
        document.body.classList.add('device-desktop');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  return <>{children}</>;
};

export default BrowserCompatibilityProvider;