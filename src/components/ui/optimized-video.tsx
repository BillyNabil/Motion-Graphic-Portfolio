'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  priority?: boolean;
  fallbackFormats?: {
    webm?: string;
    mp4?: string;
    ogg?: string;
  };
  onLoadedData?: () => void;
  onError?: () => void;
}

const OptimizedVideo = ({
  src,
  poster,
  alt = 'Video background',
  className = '',
  width,
  height,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  priority = false,
  fallbackFormats,
  onLoadedData,
  onError,
}: OptimizedVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [supportedFormats, setSupportedFormats] = useState<string[]>([]);
  const [currentSource, setCurrentSource] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // Detect supported video formats
  useEffect(() => {
    const detectFormats = () => {
      const formats: string[] = [];
      const video = document.createElement('video');

      if (video.canPlayType('video/webm; codecs="vp9"').replace(/no/, '')) {
        formats.push('webm');
      }
      if (video.canPlayType('video/mp4; codecs="avc1"').replace(/no/, '')) {
        formats.push('mp4');
      }
      if (video.canPlayType('video/ogg; codecs="theora"').replace(/no/, '')) {
        formats.push('ogg');
      }

      setSupportedFormats(formats);
    };

    detectFormats();
  }, []);

  // Select best available format
  useEffect(() => {
    if (supportedFormats.length === 0) return;

    const formatOrder = ['webm', 'mp4', 'ogg'];
    const selectedFormat = formatOrder.find(format =>
      supportedFormats.includes(format) &&
      (fallbackFormats?.[format as keyof typeof fallbackFormats] || src.includes(format))
    );

    if (selectedFormat) {
      if (fallbackFormats?.[selectedFormat as keyof typeof fallbackFormats]) {
        setCurrentSource(fallbackFormats[selectedFormat as keyof typeof fallbackFormats]);
      } else {
        setCurrentSource(src);
      }
    } else if (src) {
      setCurrentSource(src);
    } else {
      setError(true);
    }
  }, [supportedFormats, src, fallbackFormats]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoadedData?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  // Performance optimization based on device type
  const getVideoQuality = () => {
    const isMobile = window.innerWidth < 768;
    const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' ||
                            (navigator as any).connection?.effectiveType === '2g';

    if (isMobile || isSlowConnection) {
      return '480p';
    }
    return '1080p';
  };

  // Generate poster URL if not provided
  const generatePosterUrl = () => {
    if (poster) return poster;

    // Extract video ID for YouTube or create thumbnail URL
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const videoId = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    // For local videos, you might want to generate a thumbnail
    return undefined;
  };

  if (error) {
    return (
      <motion.div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <p className="text-sm mb-2">Failed to load video</p>
          <p className="text-xs opacity-70">Please try again later</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.7 }}
      style={{ width, height }}
    >
      {/* Video container */}
      <div className="relative w-full h-full">
        {/* Poster image as fallback */}
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-muted"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {generatePosterUrl() && (
              <img
                src={generatePosterUrl()}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </motion.div>
        )}

        {/* Main video element */}
        <motion.video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ scale: 1.1 }}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          width={width}
          height={height}
          autoPlay={autoPlay && isInView}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          poster={generatePosterUrl()}
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onLoadStart={() => setIsLoaded(false)}
          onCanPlay={() => setIsLoaded(true)}
          style={{
            filter: isLoaded ? 'none' : 'blur(10px)',
          }}
        >
          {/* Multiple source elements for fallback formats */}
          {currentSource && (
            <source
              src={currentSource}
              type={`video/${currentSource.split('.').pop()?.split('?')[0]}`}
            />
          )}

          {/* Fallback formats */}
          {fallbackFormats && (
            <>
              {fallbackFormats.webm && (
                <source src={fallbackFormats.webm} type="video/webm" />
              )}
              {fallbackFormats.mp4 && (
                <source src={fallbackFormats.mp4} type="video/mp4" />
              )}
              {fallbackFormats.ogg && (
                <source src={fallbackFormats.ogg} type="video/ogg" />
              )}
            </>
          )}

          {/* Fallback message */}
          <div className="flex items-center justify-center h-full bg-muted">
            <p className="text-muted-foreground">Your browser does not support the video tag.</p>
          </div>
        </motion.video>

        {/* Loading indicator */}
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/30"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}

        {/* Performance indicator for debugging (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs p-2 rounded">
            <p>Format: {currentSource?.split('.').pop()?.split('?')[0] || 'unknown'}</p>
            <p>Quality: {getVideoQuality()}</p>
            <p>Loaded: {isLoaded ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
    </motion.div>
  );
};

export default OptimizedVideo;