'use client';

import Image from 'next/image';
import SectionObserver from '@/components/ui/SectionObserver';
import { useRef } from 'react';
import { FloatingGrid, RotatingWireframe, KineticCrosshair, SpotlightCard, TextReveal, AudioWaveform, GlitchString } from '@/components/visuals/MotionElements';

const About = () => {
  const container = useRef(null);

  return (
    <SectionObserver sectionId="about">
      <section ref={container} id="about" className="relative min-h-screen flex items-center justify-center bg-background py-16 md:py-32 overflow-hidden">

        {/* Background Visuals */}
        <FloatingGrid />

        {/* Abstract Background Elements */}
        <div className="absolute right-[-10%] top-[20%] opacity-10 pointer-events-none mix-blend-screen scale-[2]">
          <RotatingWireframe className="w-[600px] h-[600px]" />
        </div>
        <div className="absolute left-[-10%] bottom-[10%] opacity-5 pointer-events-none mix-blend-screen rotate-45">
          <RotatingWireframe className="w-[800px] h-[800px]" />
        </div>

        <div className="flex flex-col gap-8 md:gap-16 relative z-10 max-w-7xl mx-auto px-6">

          {/* SPLIT LAYOUT: Text & Clients */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT: Headline Text (Smaller) */}
            <div className="lg:col-span-7">
              <TextReveal
                text="I craft compelling visual narratives through motion design, animation, and creative direction. Specializing in brand identity and digital experiences that leave a lasting impact."
                className="text-lg md:text-2xl lg:text-3xl font-bold uppercase leading-tight text-white tracking-wide break-words"
              />
            </div>

            {/* RIGHT: Top Clients (Premium List) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Selected Clients</span>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Windah Basudara", industry: "Youtuber", img: "https://unavatar.io/youtube/WindahBasudara", color: "bg-blue-500" },
                    { name: "Yume Live", industry: "Vtuber Agency", img: "https://unavatar.io/youtube/yumelive_ent", color: "bg-red-500" },
                    { name: "Keyren Ch.", industry: "Vtuber", img: "https://unavatar.io/youtube/KeyrenCh", color: "bg-purple-500" }
                  ].map((client, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5 cursor-default">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${client.color}/20 flex items-center justify-center border border-white/10 overflow-hidden`}>
                          {/* Placeholder Avatar */}
                          <Image src={client.img} alt={client.name} width={48} height={48} className="object-cover opacity-80" unoptimized />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">{client.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{client.industry}</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                        <span className="text-sm text-white/20">↗</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">

            {/* COL 1: Identity & Stats Badge */}
            <div className="md:col-span-3">
              <SpotlightCard className="h-full bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6 text-primary opacity-80">
                    <KineticCrosshair />
                    <GlitchString text="IDENTITY_CORE" className="text-[10px] tracking-widest" />
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="text-5xl font-bold text-white leading-none tracking-tighter">6+</h3>
                    <div className="mb-2">
                      <AudioWaveform color="bg-primary" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono">Years<br />Experience</p>
                </div>
              </SpotlightCard>
            </div>

            {/* COL 2: Experience Details */}
            <div className="md:col-span-4">
              <SpotlightCard className="h-full bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-mono text-lg">01</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase">Track Record</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Delivering high-end motion graphics for global brands, startups, and content creators.
                    Focusing on quality, precision, and impact.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono uppercase text-white/50">
                  <span>Since 2019</span>
                </div>
              </SpotlightCard>
            </div>

            {/* COL 3: Competencies */}
            <div className="md:col-span-5">
              <SpotlightCard className="h-full bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 uppercase flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Core Competencies
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {["Motion Graphics", "3D Design", "Brand Identity", "UI Animation", "Video Editing", "Compositing", "Art Direction", "Sound Design"].map((skill, i) => (
                      <div key={i} className="border border-white/10 rounded-lg p-2 hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground font-mono group-hover:text-primary transition-colors">0{i + 1}</span>
                          <span className="text-[10px] font-medium text-white">{skill}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-mono uppercase text-muted-foreground tracking-widest">Stack</h4>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50">V.2.0</span>
                  </div>
                  <div className="flex flex-wrap gap-2 opacity-80">
                    {["AE", "C4D", "Blender", "Figma", "Rive", "Pr", "Ai"].map((tool, i) => (
                      <span key={i} className="text-[10px] font-mono uppercase border border-white/10 bg-black/20 px-2 py-1 rounded text-white hover:border-white/30 transition-colors">{tool}</span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>

          </div>

        </div>
      </section>
    </SectionObserver>
  );
};

export default About;
