'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)'
          }}
        />
      )}

      {/* Main Image */}
      <motion.img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ scale: 1.1 }}
        animate={{ scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-background/50"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default OptimizedImage;