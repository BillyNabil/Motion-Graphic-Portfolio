'use client';

import { motion } from 'framer-motion';

const GeometricShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Floating Circle (Wireframe-ish look) */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/10 rounded-full"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Floating Square */}
            <motion.div
                className="absolute top-3/4 right-1/4 w-24 h-24 border border-red-500/20"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Floating Triangle (CSS Border trick) */}
            <motion.div
                className="absolute top-1/2 left-3/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-white/5"
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Blurred Glow orb for atmosphere */}
            <motion.div
                className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default GeometricShapes;
