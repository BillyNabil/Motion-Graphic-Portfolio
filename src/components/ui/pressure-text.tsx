'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface PressureTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  intensity?: number;
}

const PressureText = ({
  children,
  className = '',
  delay = 0,
  duration = 2,
  intensity = 1.2
}: PressureTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Get text content from children props instead of innerText
    const textElement = element.querySelector('h1, h2, h3, h4, h5, h6, p, span') || element;
    const text = typeof children === 'string' ? children : textElement.textContent || '';

    if (!text) return;

    // Split text into words and wrap each in a span
    const wordsHtml = text.split(' ').map((word, index) =>
      `<span class="pressure-word inline-block" style="display: inline-block;">${word}</span>${index < text.split(' ').length - 1 ? ' ' : ''}`
    ).join('');

    // Set the HTML content
    if (textElement !== element) {
      textElement.innerHTML = wordsHtml;
    } else {
      element.innerHTML = wordsHtml;
    }

    const words = element.querySelectorAll('.pressure-word');

    // Create pressure animation timeline
    const tl = gsap.timeline({ delay });

    words.forEach((word, index) => {
      tl.to(word, {
        scale: intensity,
        duration: 0.3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      }, index * 0.1);
    });

    // Add continuous subtle animation
    tl.to(words, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.05
    }, `+=${duration * 0.3}`);

    return () => {
      tl.kill();
    };
  }, [delay, duration, intensity, children]);

  return (
    <motion.div
      ref={textRef}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{ display: 'inline-block' }}
    >
      <h2 className="text-4xl font-bold">{children}</h2>
    </motion.div>
  );
};

export default PressureText;