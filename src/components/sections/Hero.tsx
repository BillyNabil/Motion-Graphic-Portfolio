'use client'; // This directive tells Next.js to render this component on the client-side

// Import React hooks for managing references and side effects
import { useEffect, useRef } from 'react';
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

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Main Hero component - This is the first section users see when visiting the portfolio
const Hero = () => {
  // Create references to DOM elements that we want to animate
  // useRef lets us directly access and manipulate DOM elements
  const headingRef = useRef<HTMLHeadingElement>(null); // Reference to the main heading
  const commissionRef = useRef<HTMLHeadingElement>(null); // Reference to the commission text
  const subheadingRef = useRef<HTMLParagraphElement>(null); // Reference to the subtitle
  const ctaRef = useRef<HTMLDivElement>(null); // Reference to the call-to-action buttons

  // useEffect hook runs after component mounts - perfect for animations
  useEffect(() => {
    // Simplified animation for subheading and CTA only
    // Title animations are handled by PressureText component
    const ctx = gsap.context(() => {
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
          delay: 1.2,    // Reduced delay to sync with PressureText
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
          delay: 1.8,    // Reduced delay
          ease: "backOut" // Easing that creates a slight overshoot and bounce-back effect
        }
      );
    }, subheadingRef); // Scope animations to subheading

    // Cleanup function - runs when component unmounts
    // This prevents memory leaks by cleaning up animations
    return () => ctx.revert();
  }, []); // Empty dependency array means this effect runs only once (on mount)

  // Function to handle smooth scrolling to the works section
  // This is called when the "View My Work" button is clicked
  const scrollToWorks = () => {
    // Find the element with id="works" in the document
    const element = document.querySelector('#works');

    // If the element exists, scroll to it
    // Lenis handles the smooth scrolling automatically
    element?.scrollIntoView();
  };

  // Return the JSX structure of our Hero component
  return (
    // Main container for the hero section
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
          src="/video bg.mp4" // Path to the video file in the public folder
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
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* ===== EXTRA OVERLAY GRADIENT ===== */}
        {/* Additional gradient layer for smoother transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent" />
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
        {/* Text pressure animation for main heading */}
        <div ref={headingRef} className="mb-6" style={{position: 'relative', height: '160px', width: '100%'}}>
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
            minFontSize={36}
            className="mb-6"
            scale={true}
          />
        </div>

        {/* Text pressure animation for commission text */}
        <div ref={commissionRef} className="mb-6" style={{position: 'relative', height: '160px', width: '100%'}}>
          <TextPressure
            text="COMMISSION"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            inverted={true}
            textColor="#bd0000"
            strokeColor="#ff0000"
            minFontSize={36}
            className="mb-6"
            scale={true}
          />
        </div>

        {/* ===== SUBHEADING/DESCRIPTION ===== */}
        <motion.p
          ref={subheadingRef} // GSAP reference for slide-up animation
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto" // Responsive text with max width
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
            whileHover={{ scale: 1.1, rotate: [0, -1, 1, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"      // Large button size
              onClick={scrollToWorks} // Call our scroll function when clicked
              className="text-lg px-8 py-3 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl hover:shadow-primary/30" // Enhanced styling with gradient and shadow
            >
              <span className="mr-2">✨</span>
              View My Work
            </Button>
          </motion.div>

          {/* Secondary CTA button */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, 1, -1, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline" // Outline style (transparent with border)
              size="lg"         // Large button size
              onClick={() => document.querySelector('#contact')?.scrollIntoView()} // Lenis handles smooth scrolling automatically
              className="text-lg px-8 py-3 h-auto border-2 border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-xl hover:shadow-white/20 backdrop-blur-sm" // Enhanced glassmorphism effect
            >
              <span className="mr-2">📧</span>
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
  );
};

// Export the Hero component as the default export
// This allows other components to import it: import Hero from './Hero'
export default Hero;