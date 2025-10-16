'use client'; // This directive tells Next.js to render this component on the client-side

// Import React hooks for managing references and side effects
import { useEffect, useRef, useState } from 'react';
// Import Framer Motion for smooth animations
import { motion } from 'framer-motion';
// Import the custom Button component from our UI library
import { Button } from '@/components/ui/button';
// Import PressureText component for title animations
import TextPressure from '@/components/ui/text-pressure';
// Import GSAP (GreenSock Animation Platform) for advanced animations
import { gsap } from 'gsap';
// Import ScrollTrigger plugin for scroll-based animations
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import SectionObserver for detecting active section
import SectionObserver from '@/components/ui/SectionObserver';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Main Hero component - This is the first section users see when visiting the portfolio
const Hero = () => {
  // State to detect mobile screen size
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Create references to DOM elements that we want to animate
  // useRef lets us directly access and manipulate DOM elements
  const headingRef = useRef<HTMLHeadingElement>(null); // Reference to the main heading
  const commissionRef = useRef<HTMLHeadingElement>(null); // Reference to the commission text
  const subheadingRef = useRef<HTMLParagraphElement>(null); // Reference to the subtitle
  const ctaRef = useRef<HTMLDivElement>(null); // Reference to the call-to-action buttons

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // useEffect hook runs after component mounts - perfect for animations
  useEffect(() => {
    // Simplified animation for subheading and CTA only
    // Title animations are handled by PressureText component (desktop) or Framer Motion (mobile)
    const ctx = gsap.context(() => {
      // Calculate delay based on device
      const subheadingDelay = isMobile ? 1.3 : 1.2;
      const ctaDelay = isMobile ? 1.8 : 1.8;

      // ===== SUBHEADING ANIMATION =====
      // Animate the subtitle text to slide up and fade in
      gsap.fromTo(subheadingRef.current,
        { // Starting state
          opacity: 0,    // Invisible
          y: 50         // 50 pixels below final position
        },
        { // Ending state
          opacity: 1,    // Fully visible
          y: 0,         // Final position
          duration: 1,   // 1 second animation
          delay: subheadingDelay,    // Adjusted delay based on device
          ease: "power3.out" // Smooth easing function
        }
      );

      // ===== CALL-TO-ACTION BUTTONS ANIMATION =====
      // Animate the container holding our buttons
      gsap.fromTo(ctaRef.current,
        { // Starting state
          opacity: 0,    // Invisible
          scale: 0.8     // 80% of final size (smaller)
        },
        { // Ending state
          opacity: 1,    // Fully visible
          scale: 1,      // Full size (100%)
          duration: 0.8, // 0.8 second animation
          delay: ctaDelay,    // Adjusted delay based on device
          ease: "backOut" // Easing that creates a slight overshoot and bounce-back effect
        }
      );
    }, subheadingRef); // Scope animations to subheading

    // Cleanup function - runs when component unmounts
    // This prevents memory leaks by cleaning up animations
    return () => ctx.revert();
  }, [isMobile]); // Include isMobile in dependency array

  // Function to handle smooth scrolling to the works section
  // This is called when the "View My Work" button is clicked
  const scrollToWorks = () => {
    // Find the element with id="works" in the document
    const element = document.querySelector('#works');

    // If the element exists, scroll to it smoothly
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Return the JSX structure of our Hero component
  return (
    // Main container for the hero section
    <SectionObserver sectionId="home">
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">

      {/* ===== BACKGROUND SECTION ===== */}
      {/* Absolute positioned container for all background effects */}
      <div className="absolute inset-0 z-0">

        {/* ===== VIDEO BACKGROUND ===== */}
        {/* Video element that plays the background video */}
        <video
          autoPlay        // Start playing automatically when page loads
          loop           // Loop the video continuously when it ends
          muted          // Mute the video (required for autoplay in most browsers)
          playsInline    // Play video inline (instead of fullscreen) on iOS devices
          className="absolute inset-0 w-full h-full object-cover" // CSS to cover entire background
          src="/video bg.webm" // Path to the video file in the public folder
        />

        {/* ===== VIDEO OVERLAY ===== */}
        {/* Semi-transparent black overlay to improve text readability against the video */}
        {/* The /40 means 40% opacity (40% black, 60% transparent) */}
        <div className="absolute inset-0 bg-black/65" />

        {/* ===== HALFTONE EFFECT OVERLAY ===== */}
        {/* Container for the halftone pattern effects */}
        <div className="absolute inset-0">

          {/* Primary halftone layer - smaller dots, faster movement */}
          <div
            className="absolute inset-0 opacity-10" // 20% opacity for subtle effect
            style={{
              // Create a dot pattern using radial gradients
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '6px 6px',     // Each dot is 6px apart
              backgroundPosition: '0 0, 3px 3px', // Staggered dot pattern
              animation: 'halftoneMove 15s linear infinite' // Apply our custom animation
            }}
          />

          {/* Secondary halftone layer - larger dots, slower movement for depth */}
          <div
            className="absolute inset-0 opacity-15" // Slightly more transparent than primary layer
            style={{
              backgroundImage: `radial-gradient(circle, white 0.8px, transparent 0.8px)`,
              backgroundSize: '12px 12px',     // Larger spacing between dots
              backgroundPosition: '0 0, 6px 6px', // Different staggered pattern
              animation: 'halftoneMoveReverse 25s linear infinite' // Different animation
            }}
          />
        </div>

        {/* ===== GRADIENT OVERLAY ===== */}
        {/* Dark gradient at the bottom for better text contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* ===== ADDITIONAL BOTTOM GRADIENT FOR SMOOTH TRANSITION ===== */}
        {/* Heavier gradient at the very bottom to create smooth transition to About section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* ===== EXTRA OVERLAY GRADIENT ===== */}
        {/* Additional gradient layer for smoother transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* ===== CUSTOM CSS ANIMATIONS ===== */}
      {/* Styled-jsx component for defining CSS animations */}
      <style jsx>{`
        /* Animation for the primary halftone layer */
        @keyframes halftoneMove {
          0% {
            /* Starting position of the dot pattern */
            background-position: 0 0, 3px 3px;
          }
          100% {
            /* Ending position - moves diagonally */
            background-position: 6px 6px, 9px 9px;
          }
        }

        /* Animation for the secondary halftone layer - moves in opposite direction */
        @keyframes halftoneMoveReverse {
          0% {
            /* Starting position */
            background-position: 0 0, 6px 6px;
          }
          100% {
            /* Ending position - moves diagonally in opposite direction */
            background-position: -12px -12px, -6px -6px;
          }
        }
      `}</style>

      {/* ===== MAIN CONTENT SECTION ===== */}
      {/* Content container - positioned above background with z-index */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">

        {/* ===== MAIN HEADING ===== */}
        {/* Conditional rendering: Text pressure for desktop, regular text for mobile */}
        <div ref={headingRef} className="mb-4 sm:mb-10 w-full" style={{position: 'relative', minHeight: isMobile ? '120px' : '200px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 0' : '20px 0'}}>
          {isMobile ? (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider leading-tight px-4"
            >
              BILLYNABIL
            </motion.h1>
          ) : (
            <TextPressure
              text="BILLYNABIL"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              inverted={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={56}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
              scale={false}
            />
          )}
        </div>

        {/* Text pressure animation for commission text */}
        <div ref={commissionRef} className="mb-8 sm:mb-10 w-full" style={{position: 'relative', minHeight: isMobile ? '60px' : '120px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '8px 0' : '15px 0'}}>
          {isMobile ? (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 uppercase tracking-wide"
            >
              COMMISSION
            </motion.h2>
          ) : (
            <TextPressure
              text="COMMISSION"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              inverted={true}
              textColor="#c10007"
              strokeColor="#ff0000"
              minFontSize={40}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              scale={false}
            />
          )}
        </div>

        {/* ===== SUBHEADING/DESCRIPTION ===== */}
        <motion.p
          ref={subheadingRef} // GSAP reference for slide-up animation
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-10 max-w-3xl mx-auto" // Responsive text with max width
        >
          Crafting compelling visual stories through motion graphics,
          animation, and creative design. Transform your ideas into
          captivating digital experiences.
        </motion.p>

        {/* ===== CALL-TO-ACTION BUTTONS ===== */}
        <motion.div
          ref={ctaRef} // GSAP reference for scale animation
          className="flex flex-col sm:flex-row gap-4 justify-center" // Responsive layout: column on mobile, row on larger screens
        >
          {/* Primary CTA button */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"      // Large button size
              onClick={scrollToWorks} // Call our scroll function when clicked
              className="text-lg px-8 py-3 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl hover:shadow-primary/30" // Enhanced styling with gradient and shadow
            >
              View My Work
            </Button>
          </motion.div>

          {/* Secondary CTA button */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline" // Outline style (transparent with border)
              size="lg"         // Large button size
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} // Smooth scrolling to contact section
              className="text-lg px-8 py-3 h-auto border-2 border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-xl hover:shadow-white/20 backdrop-blur-sm" // Enhanced glassmorphism effect
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      {/* Animated scroll indicator at the bottom of the hero section */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2" // Centered at bottom
        animate={{
          y: [0, 10, 0]  // Vertical animation: down 10px, then back up
        }}
        transition={{
          duration: 2,        // Animation lasts 2 seconds
          repeat: Infinity,   // Repeat forever
          ease: "easeInOut"   // Smooth acceleration and deceleration
        }}
      >
        {/* Mouse scroll icon */}
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
    </SectionObserver>
  );
};

// Export the Hero component as the default export
// This allows other components to import it: import Hero from './Hero'
export default Hero;
