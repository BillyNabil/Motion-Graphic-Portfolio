'use client';

import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';
import React from 'react';

// 1. Rotating Wireframe Globe (Abstract)
export const RotatingWireframe = ({ className }: { className?: string }) => {
    return (
        <div className={`relative w-48 h-48 ${className}`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="w-full h-full border border-white/20 rounded-full flex items-center justify-center relative"
            >
                <motion.div
                    animate={{ rotateX: 360, rotateY: 360 }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    className="w-3/4 h-3/4 border border-white/30 rounded-full"
                />
                <motion.div
                    animate={{ rotateX: -360, rotateY: 180 }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="absolute w-1/2 h-1/2 border border-dashed border-primary/50 rounded-full"
                />
            </motion.div>
        </div>
    );
};

// 2. Scanline Effect (For Lists/Pricing)
export const ScanlineBar = ({ className = "" }: { className?: string }) => {
    return (
        <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 pointer-events-none z-10 ${className}`}
            style={{ boxShadow: '0 0 10px var(--primary)' }}
        />
    );
};

// 3. Floating Grid (For Backgrounds)
export const FloatingGrid = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
            <motion.div
                animate={{ y: [0, -40] }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="w-full h-[200%] absolute top-[-50%]"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg)'
                }}
            />
        </div>
    )
}

// 4. Kinetic Crosshairs
export const KineticCrosshair = ({ delay = 0 }: { delay?: number }) => {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8, type: "spring" }}
            className="w-8 h-8 relative flex items-center justify-center"
        >
            <div className="absolute w-full h-[1px] bg-white/30" />
            <div className="absolute h-full w-[1px] bg-white/30" />
            <div className="w-2 h-2 border border-primary rounded-full" />
        </motion.div>
    )

}

// 5. Pulsing Signal (For Contact)
export const PulsingSignal = () => {
    return (
        <div className="relative w-4 h-4">
            <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
            </span>
        </div>
    )
}

// 6. Magnetic Wrapper (For Buttons/Interactions)
export const MagneticWrapper = ({ children, className = "", strength = 0.5 }: { children: React.ReactNode, className?: string, strength?: number }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 7. Spotlight Card Effect created directly with Tailwind/Framer
export const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.1)" }: { children: React.ReactNode, className?: string, spotlightColor?: string }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: -500, y: -500 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

// 8. Grain Overlay (Cinematic Texture)
export const GrainOverlay = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
            <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

// 9. Text Reveal Animation
export const TextReveal = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");

    return (
        <div className={`overflow-hidden ${className}`}>
            <span className="sr-only">{text}</span>
            <div className="flex flex-wrap gap-x-[0.25em]">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        className="inline-block origin-bottom-left max-w-full break-words"
                        initial={{ y: "100%", rotate: 5 }}
                        whileInView={{ y: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                            delay: delay + (i * 0.02)
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

// 10. Technical Grid (Isometric/Crosshair)
export const TechnicalGrid = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Crosshairs at corners */}
            <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-white/20" />
            <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-white/20" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-white/20" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-white/20" />

            {/* Center Grid */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-3xl" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>
    );
};

// 11. Timecode (Running Clock)
export const Timecode = ({ className = "" }: { className?: string }) => {
    const [time, setTime] = React.useState("00:00:00:00");

    React.useEffect(() => {
        const interval = setInterval(() => {
            const d = new Date();
            const ms = d.getMilliseconds().toString().padStart(3, '0').slice(0, 2);
            const ss = d.getSeconds().toString().padStart(2, '0');
            const mm = d.getMinutes().toString().padStart(2, '0');
            const hh = d.getHours().toString().padStart(2, '0');
            setTime(`${hh}:${mm}:${ss}:${ms}`);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={`font-mono tabular-nums ${className}`}>
            {time}
        </span>
    );
};

// 12. Sonar Pulse (Radar effect)
export const SonarPulse = ({ color = "rgba(255,255,255,0.1)" }: { color?: string }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5"
                style={{ borderColor: color }}
            />
            <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5"
                style={{ borderColor: color }}
            />
        </div>
    );
};

// 13. Scroll Marquee (Velocity)
export const ScrollVelocity = ({ children, baseVelocity = 2, className = "" }: { children: React.ReactNode, baseVelocity?: number, className?: string }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = React.useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        if (velocityFactor.get() < 0) { directionFactor.current = -1; }
        else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex">
            <motion.div style={{ x }} className={`flex flex-nowrap ${className}`}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
};

// 14. Audio Waveform (Equalizer)
export const AudioWaveform = ({ color = "bg-primary" }: { color?: string }) => {
    return (
        <div className="flex items-end gap-[2px] h-8">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`w-1 ${color}`}
                    animate={{
                        height: ["20%", "100%", "40%", "80%", "30%"]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.2, 0.4, 0.6, 1],
                        delay: i * 0.1
                    }}
                />
            ))}
        </div>
    );
};

// 15. Glitch Text Effect
export const GlitchString = ({ text, className = "" }: { text: string, className?: string }) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const [display, setDisplay] = React.useState(text);

    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("")
                    .map((char, index) => {
                        if (index < iterations) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    };

    return (
        <span
            onMouseEnter={scramble}
            className={`cursor-default font-mono ${className}`}
        >
            {display}
        </span>
    );
};
