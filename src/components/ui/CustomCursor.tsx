'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the outer circle (follower)
    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only show custom cursor on desktop to avoid issues on touch devices
        const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => {
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
            }
        };

        const handleMouseUp = () => {
            if (cursorOuterRef.current) {
                cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Add hover effect to clickable elements
        const clickableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
        clickableElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (cursorOuterRef.current) {
                    cursorOuterRef.current.classList.add('cursor-hover');
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursorOuterRef.current) {
                    cursorOuterRef.current.classList.remove('cursor-hover');
                }
            });
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Inner Dot (follows immediately) */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Outer Circle (follows smoothly) */}
            <motion.div
                ref={cursorOuterRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            <style jsx global>{`
        body {
            cursor: none; /* Hide default cursor */
        }
        .cursor-hover {
            transform: translate(-50%, -50%) scale(1.5) !important;
            background-color: rgba(255, 255, 255, 0.1);
            border-color: transparent;
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
