'use client';

import { useEffect, useState } from 'react';
import { getDeviceType, getAnimationConfig } from '@/lib/responsive';

interface PerformanceProviderProps {
  children: React.ReactNode;
}

const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect device type
    const updateDeviceType = () => {
      setDeviceType(getDeviceType());
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Add resize listener
    window.addEventListener('resize', updateDeviceType);
    mediaQuery.addEventListener('change', handleMediaChange);

    // Initial setup
    updateDeviceType();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceType);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Performance optimization based on device and preferences
  useEffect(() => {
    const root = document.documentElement;
    const config = getAnimationConfig(deviceType);

    // CSS custom properties for animation settings
    root.style.setProperty('--animation-duration', `${config.duration}s`);
    root.style.setProperty('--animation-stagger', `${config.stagger}s`);

    // Reduce motion class
    if (config.reduceMotion || prefersReducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // GPU acceleration settings
    if (config.skipGpuHeavy) {
      root.classList.add('reduced-gpu');
    } else {
      root.classList.remove('reduced-gpu');
    }

    // Device-specific classes
    root.classList.remove('device-mobile', 'device-tablet', 'device-desktop');
    root.classList.add(`device-${deviceType}`);
  }, [deviceType, prefersReducedMotion]);

  // Optimized memory management
  useEffect(() => {
    // Skip performance monitoring on mobile to save resources
    if (deviceType === 'mobile') return;

    // Cleanup function for heavy animations
    const cleanupHeavyAnimations = () => {
      const heavyElements = document.querySelectorAll('[data-heavy-animation]');
      heavyElements.forEach(el => {
        el.removeAttribute('data-heavy-animation');
      });
    };

    let animationFrameId: number;
    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 2000) { // Check every 2 seconds instead of 1
        const fps = frameCount / 2; // Average FPS over 2 seconds
        frameCount = 0;
        lastTime = currentTime;

        // Reduce animations if performance is poor
        if (fps < 25) { // Lower threshold from 30 to 25
          document.documentElement.classList.add('reduce-motion');
        } else if (fps > 45) {
          document.documentElement.classList.remove('reduce-motion');
        }
      }

      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    // Throttled performance monitoring
    const monitorTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(checkPerformance);
    }, 3000); // Start monitoring after 3 seconds

    // Cleanup on unmount
    return () => {
      clearTimeout(monitorTimer);
      cancelAnimationFrame(animationFrameId);
      cleanupHeavyAnimations();
    };
  }, [deviceType]);

  return <>{children}</>;
};

export default PerformanceProvider;