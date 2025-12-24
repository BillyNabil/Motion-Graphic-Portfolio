'use client';

import { motion } from 'framer-motion';
import SectionObserver from '@/components/ui/SectionObserver';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SpotlightCard, ScrollVelocity, GlitchString } from '@/components/visuals/MotionElements';

interface PricingItem {
  service: string;
  price: string;
  description: string;
  features: string[];
}

const pricingServices: PricingItem[] = [
  {
    service: "Stream Overlay (Static)",
    price: "$15",
    description: "Static overlay design for streaming platforms",
    features: ["Custom design", "Brand integration", "Source files"]
  },
  {
    service: "Stream Overlay (Animated)",
    price: "$30",
    description: "Animated overlay design for streaming platforms",
    features: ["Animated elements", "Custom design", "Brand integration"]
  },
  {
    service: "Stinger Transition",
    price: "$40",
    description: "Animated transition for streaming scenes",
    features: ["Custom animation", "Sound design", "WebM format"]
  },
  {
    service: "Animated Logo",
    price: "$40",
    description: "Professional logo animation for branding",
    features: ["Custom animation", "Brand colors", "Source files"]
  },
  {
    service: "Trailer (Debut / Lore)",
    price: "$50",
    description: "Professional trailer for debut or lore videos",
    features: ["Cinematic effects", "Text animations", "Sound design"]
  },
  {
    service: "Simple Music Video",
    price: "$70",
    description: "Basic music video with simple animations",
    features: ["Basic animations", "Standard transitions", "HD quality"]
  },
  {
    service: "Complex Music Video",
    price: "$140",
    description: "Advanced music video with complex animations",
    features: ["Advanced animations", "Custom effects", "4K quality"]
  }
];

const Pricing = () => {
  return (
    <SectionObserver sectionId="pricing">
      <section id="pricing" className="py-16 bg-background relative z-10 overflow-hidden">

        {/* Ambient background light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Scrolling Ticker Background */}
        <div className="absolute top-20 left-0 w-full opacity-[0.03] pointer-events-none select-none z-0 scale-50 origin-left">
          <ScrollVelocity baseVelocity={-1} className="text-[6rem] font-bold text-white leading-none">
            SERVICES RATES COMMISSION SERVICES RATES COMMISSION
          </ScrollVelocity>
        </div>

        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-[0.3em] flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                [ 03 — SERVICES & RATES ]
              </span>
              <h2 className="text-3xl md:text-5xl font-bold uppercase text-white tracking-tighter">
                <GlitchString text="INVEST_IN" className="block mb-0" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4001D] to-[#5C000E]">Your Visuals</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground text-xs font-mono leading-relaxed border-l border-primary/20 pl-4">
              Transparent pricing for professional motion design services. Custom packages available.
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-1 gap-3 z-20">
            {/* Header Row (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 text-xs font-mono uppercase text-muted-foreground tracking-widest border-b border-white/10 opacity-50">
              <div className="col-span-4">Service</div>
              <div className="col-span-5">Included</div>
              <div className="col-span-3 text-right">Starting Rate</div>
            </div>

            {pricingServices.map((item, index) => (
              <PricingRow key={index} item={item} index={index} />
            ))}
          </div>

          <div className="mt-8 md:mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs text-muted-foreground backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              2 Revisions included.
            </div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
};

const PricingRow = ({ item, index }: { item: PricingItem, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <SpotlightCard className="h-full group relative bg-white/[0.02] border border-white/5 hover:border-primary/50 transition-colors duration-500 rounded-lg overflow-hidden">
        <div className="p-3 md:p-3 flex flex-col md:grid md:grid-cols-12 gap-2 items-start md:items-center relative z-10 h-full justify-between">

          <div className="md:col-span-4 w-full">
            <h3 className="text-xs md:text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2 mb-1 md:mb-0">
              {item.service}
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </h3>
            <p className="hidden md:block text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
          </div>

          <div className="hidden md:flex md:col-span-5 w-full flex-wrap gap-1.5 content-start">
            {item.features.map((f: string, i: number) => (
              <span key={i} className="text-[9px] uppercase tracking-wider border border-white/10 px-1.5 py-0.5 rounded text-white/70 bg-black/20 flex items-center gap-1 group-hover:border-primary/20 transition-colors">
                <CheckCircle2 className="w-2.5 h-2.5 text-primary/70" /> {f}
              </span>
            ))}
          </div>

          <div className="md:col-span-3 w-full text-left md:text-right flex items-center justify-between md:justify-end gap-4 md:mt-0 md:pt-0 width-full">
            <span className="md:hidden text-[9px] font-mono text-muted-foreground uppercase opacity-50">Start</span>
            <div className="flex flex-col items-end">
              <span className="text-lg md:text-xl font-bold font-mono text-white group-hover:scale-110 transition-transform origin-right">{item.price}</span>
            </div>
          </div>

        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default Pricing;
