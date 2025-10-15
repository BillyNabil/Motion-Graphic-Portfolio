// Responsive design utilities for optimal display across all devices

export const breakpoints = {
  xs: '0px',      // Extra small devices (phones)
  sm: '640px',    // Small devices (tablets)
  md: '768px',    // Medium devices (small laptops)
  lg: '1024px',   // Large devices (desktops)
  xl: '1280px',   // Extra large devices (large desktops)
  '2xl': '1536px' // 2X large devices (very large screens)
};

export const responsiveSpacing = {
  section: {
    paddingY: 'py-12 sm:py-16 md:py-20 lg:py-24',
    container: 'px-4 sm:px-6 lg:px-8 xl:px-12'
  },
  card: {
    padding: 'p-4 sm:p-6 md:p-8',
    margin: 'm-2 sm:m-4 md:m-6',
    gap: 'gap-4 sm:gap-6 md:gap-8'
  }
};

export const responsiveTypography = {
  hero: {
    main: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
    sub: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    description: 'text-sm sm:text-base md:text-lg lg:text-xl'
  },
  section: {
    heading: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    subheading: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    body: 'text-sm sm:text-base md:text-lg'
  },
  card: {
    title: 'text-lg sm:text-xl md:text-2xl',
    description: 'text-sm sm:text-base md:text-base lg:text-lg',
    small: 'text-xs sm:text-sm'
  }
};

export const responsiveGrid = {
  two: 'grid-cols-1 md:grid-cols-2',
  three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  four: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
};

// Animation performance optimizations for different devices
export const getAnimationConfig = (deviceType: 'mobile' | 'tablet' | 'desktop') => {
  switch (deviceType) {
    case 'mobile':
      return {
        duration: 0.3,
        stagger: 0.05,
        reduceMotion: true,
        skipGpuHeavy: true
      };
    case 'tablet':
      return {
        duration: 0.5,
        stagger: 0.08,
        reduceMotion: false,
        skipGpuHeavy: false
      };
    case 'desktop':
      return {
        duration: 0.8,
        stagger: 0.1,
        reduceMotion: false,
        skipGpuHeavy: false
      };
    default:
      return {
        duration: 0.5,
        stagger: 0.08,
        reduceMotion: false,
        skipGpuHeavy: false
      };
  }
};

// Device detection utility
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Viewport meta tag optimization
export const viewportMeta = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000'
};