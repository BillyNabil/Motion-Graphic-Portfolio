'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextPressure from '@/components/ui/text-pressure';
import { TechnicalGrid, Timecode } from '@/components/visuals/MotionElements';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionObserver from '@/components/ui/SectionObserver';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SectionObserver sectionId="home">
      <section
        ref={containerRef}
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      >
        {/* ===== CINEMATIC BACKGROUND ===== */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-10"
          >
            <source src="/video%20bg.webm" type="video/webm" />
          </video>
          {/* Halftone Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.8)_1px,transparent_1px)] bg-[length:4px_4px] z-[1]" />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] z-[2] pointer-events-none" />
        </div>
        <TechnicalGrid />
        <div className="absolute top-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* ===== TOP HUD ===== */}
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20 pointer-events-none mix-blend-difference text-white">
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest opacity-70">Sys.Status: Online</span>
            <span className="text-xs font-mono uppercase tracking-widest opacity-50">V.2.0.25</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono uppercase tracking-widest opacity-70">Local Time</span>
            <Timecode className="text-sm opacity-90 block" />
          </div>
        </div>

        {/* ===== KINETIC TYPOGRAPHY ===== */}
        <motion.div
          style={{ y }}
          className="relative z-10 w-full max-w-[90vw] md:max-w-[85vw] flex flex-col items-center justify-center"
        >
          <div className="w-[80%] h-[14vh] md:h-[32vh] flex items-center justify-center relative">
            {isMobile ? (
              <h1 className="text-5xl font-bold tracking-tighter text-white text-center leading-[0.85]">
                BILLY<br />NABIL
              </h1>
            ) : (
              <TextPressure
                text="BILLYNABIL"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={false}
                inverted={false}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={100}
                className=""
              />
            )}
          </div>

          <div className="w-[80%] h-[8vh] md:h-[22vh] flex items-center justify-center relative mt-[-1vh] md:mt-[-2vh]">
            <TextPressure
              text="MOTION DESIGNER"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={false}
              italic={false}
              inverted={false}
              textColor="#AA0000"
              strokeColor="#AA0000"
              strokeWidth={1}
              minFontSize={40}
            />
          </div>
        </motion.div>

        {/* ===== FLOATING COMMISSION BADGE ===== */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] z-20 hidden md:flex items-center justify-center w-32 h-32 rounded-full border border-white/20 backdrop-blur-sm bg-black/50 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full p-2 animate-spin-slow">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="transparent"
              />
              <text className="text-[10px] font-bold fill-white uppercase tracking-widest">
                <textPath href="#circlePath" startOffset="0%">
                  Open For Commission • Est 2025 •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* ===== BOTTOM CONTROLS ===== */}
        <div className="absolute bottom-12 w-full px-8 flex justify-between items-end z-20">
          <div className="hidden md:block">
            <p className="text-xs text-muted-foreground max-w-[200px] font-mono">
              [ BASED IN INDONESIA ]<br />
              [ AVAILABLE WORLDWIDE ]
            </p>
          </div>



          <div className="hidden md:block text-right">
            <div className="flex flex-col items-end">
              <div className="h-1 w-24 bg-white/20 mb-2 relative overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-white/50"
                />
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                INITIALIZING PORTFOLIO...
              </p>
            </div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
};

export default Hero;
