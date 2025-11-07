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

  // Optimized memory management with throttling
  useEffect(() => {
    // Skip performance monitoring on mobile to save resources
    if (deviceType === 'mobile') return;

    let animationFrameId: number;
    let frameCount = 0;
    let lastTime = performance.now();
    let lastCheckTime = performance.now();
    const CHECK_INTERVAL = 3000; // Check every 3 seconds instead of 2

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      // Only check FPS every CHECK_INTERVAL ms
      if (currentTime - lastCheckTime >= CHECK_INTERVAL) {
        const fps = (frameCount / (currentTime - lastTime)) * 1000; // Calculate actual FPS
        frameCount = 0;
        lastTime = currentTime;
        lastCheckTime = currentTime;

        // Reduce animations if performance is poor (threshold: 30 FPS)
        if (fps < 30) {
          document.documentElement.classList.add('reduce-motion');
        } else if (fps > 50) {
          // Only remove if we're well above threshold
          document.documentElement.classList.remove('reduce-motion');
        }
      }

      animationFrameId = requestAnimationFrame(checkPerformance);
    };

    // Start monitoring after page has settled (5 seconds)
    const monitorTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(checkPerformance);
    }, 5000);

    // Cleanup on unmount
    return () => {
      clearTimeout(monitorTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [deviceType]);

  return <>{children}</>;
};

export default PerformanceProvider;