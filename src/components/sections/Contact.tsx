'use client';


import SectionObserver from '@/components/ui/SectionObserver';
import { PulsingSignal, FloatingGrid, MagneticWrapper, SonarPulse } from '@/components/visuals/MotionElements';

const socialLinks = [
  {
    name: 'Vgen',
    url: 'https://vgen.co/billynabil',
    label: "Commission",
    color: "hover:text-[#ff0055] hover:border-[#ff0055]/50"
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/billynabil_',
    label: "Updates",
    color: "hover:text-[#E1306C] hover:border-[#E1306C]/50"
  },
  {
    name: 'Twitter',
    url: 'https://x.com/billynabil_',
    label: "Thoughts",
    color: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50"
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/PcUqvQtc',
    label: "Community",
    color: "hover:text-[#5865F2] hover:border-[#5865F2]/50"
  }
];

const Contact = () => {
  return (
    <SectionObserver sectionId="contact">
      <section id="contact" className="relative py-16 md:py-32 bg-background overflow-hidden flex flex-col items-center justify-between min-h-screen">

        {/* Background Visuals */}
        <FloatingGrid />
        <div className="opacity-30">
          <SonarPulse color="rgba(255, 255, 255, 0.05)" />
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <PulsingSignal />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Open for Commissions</span>
            </div>

            <MagneticWrapper strength={0.2} className="inline-block">
              <h2 className="text-[12vw] md:text-[10vw] leading-[0.85] font-bold text-white tracking-tighter uppercase mix-blend-exclusion hover:scale-[1.02] transition-transform duration-700 cursor-default select-none">
                Let&apos;s Talk
              </h2>
            </MagneticWrapper>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto w-full">
            {socialLinks.map((link, i) => (
              <MagneticWrapper key={i} strength={0.3}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative py-8 px-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 ${link.color}`}
                >
                  <span className="text-2xl font-bold uppercase tracking-tight text-white group-hover:scale-110 transition-transform">{link.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">{link.label}</span>
                </a>
              </MagneticWrapper>
            ))}
          </div>

        </div>

        {/* Footer Info */}
        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-mono uppercase tracking-widest gap-4">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 bg-white/20 rounded-full" />
              <span>© 2025 Billynabil</span>
            </div>
            <span>Jakarta, Indonesia</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </section>
    </SectionObserver>
  );
};

export default Contact;
