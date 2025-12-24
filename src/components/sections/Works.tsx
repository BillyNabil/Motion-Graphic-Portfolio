'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import Image from 'next/image';
import { MagneticWrapper } from '@/components/visuals/MotionElements';

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: string;
  videoId: string;
  duration: string;
  year: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "NISEKOI MV",
    client: "TechFlow Inc.",
    category: "Identity",
    videoId: "kgf6pliL2NQ",
    duration: "00:15",
    year: "2024"
  },
  {
    id: 2,
    title: "EVE - MOGRAPH",
    client: "Appify",
    category: "Commercial",
    videoId: "PMSq8b-etUY",
    duration: "01:30",
    year: "2024"
  },
  {
    id: 3,
    title: "KAWAIKUTE GOMEN MV",
    client: "Urban Style",
    category: "Social",
    videoId: "MSJxH6uGr5g",
    duration: "00:45",
    year: "2023"
  },
  {
    id: 4,
    title: "KAIBUTSU MV",
    client: "NextGen Conf",
    category: "Event",
    videoId: "bZ1_FMZcM4E",
    duration: "02:00",
    year: "2023"
  },
  {
    id: 5,
    title: "LOVEIT? MV",
    client: "Music Label X",
    category: "Music Video",
    videoId: "RouikVoCQUQ",
    duration: "03:10",
    year: "2023"
  },
  {
    id: 6,
    title: "ZANKYOU SANKA MV",
    client: "Indie Studio",
    category: "Animation",
    videoId: "sTO5VGLT-4Y",
    duration: "01:15",
    year: "2022"
  },
];

const Works = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} id="works" className="relative min-h-screen md:h-[350vh] bg-background">
      <div className="relative md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">

        {/* Background Elements */}
        <div className="absolute top-12 left-12 z-10 hidden md:block">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">[ SELECTED WORKS ARCHIVE ]</span>
        </div>
        <div className="absolute bottom-12 left-12 z-10 hidden md:block">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest">REC</span>
          </div>
        </div>

        <motion.div
          style={isMobile ? {} : { x }}
          className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-16 px-4 md:px-24 items-start md:items-center h-full md:h-screen pt-20 md:pt-0"
        >

          {/* Title Slide */}
          <div className="col-span-2 md:flex-shrink-0 w-full md:w-[500px] h-auto md:h-[55vh] flex flex-col justify-end p-4 md:p-8 border-l border-white/10 relative mb-8 md:mb-0">
            <h2 className="text-4xl md:text-7xl font-bold uppercase text-white leading-[0.8] mb-4 md:mb-6 tracking-tighter">
              Visual <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4001D] to-[#5C000E]">Index</span>
            </h2>
            <p className="text-muted-foreground max-w-sm font-mono text-xs leading-relaxed mb-4 md:mb-8">
              A curated collection of motion design projects, ranging from brand identity to immersive storytelling.
              <br className="hidden md:block" /><br className="hidden md:block" />
              <span className="hidden md:inline">SCROLL TO EXPLORE →</span>
            </p>
          </div>

          {/* Project Cards */}
          {portfolioItems.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* End Slide */}
          <div className="hidden md:flex flex-shrink-0 w-[50vw] h-[55vh] items-center justify-center border-l border-white/10">
            <div className="text-center">
              <span className="block text-6xl font-bold text-white/5 mb-4">END</span>
              <span className="text-xs font-mono text-muted-foreground uppercase">End of Selection</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: PortfolioItem, index: number }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="group relative w-full md:w-[600px] aspect-[3/4] md:h-[55vh] md:aspect-auto flex flex-col justify-end bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      {/* Media Container */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <AnimatePresence mode="wait">
          {!isHovering ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                alt={project.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white ml-2" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${project.videoId}&showinfo=0&rel=0`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full object-cover pointer-events-none scale-125"
              />
              {/* Overlay to prevent interaction stealing scroll */}
              <div className="absolute inset-0 bg-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 p-3 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-sm md:text-5xl font-bold text-white uppercase leading-none mb-1 md:mb-2 line-clamp-2 md:line-clamp-none">{project.title}</h3>
            <div className="hidden md:block h-[1px] w-12 bg-primary mt-4 group-hover:w-full transition-all duration-700 ease-out" />
          </div>

          <div className="flex flex-col items-end gap-2 md:gap-4">
            <span className="hidden md:inline-block text-[10px] font-mono text-white/50 border border-white/10 px-1.5 py-0.5 rounded">{project.duration}</span>
            <MagneticWrapper strength={0.3}>
              <a href={`https://youtu.be/${project.videoId}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </div>

      {/* Decorative Index */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-4xl font-bold text-white/5 font-mono">{(index + 1).toString().padStart(2, '0')}</span>
      </div>

    </div>
  );
};

export default Works;
