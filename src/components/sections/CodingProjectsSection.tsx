'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PixelTransition from '@/components/ui/pixel-transition';
import { ExternalLink, Github } from 'lucide-react';


interface CodingProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: React.ReactNode;
  details: React.ReactNode;
  link?: string;
  github?: string;
}

const projects: CodingProject[] = [
  {
    id: 'pixel-transition',
    title: 'Pixel Transition Component',
    description: 'Interactive pixel grid transition effect with smooth animations',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    thumbnail: (
      <div className="w-full h-full bg-neutral-900 flex items-center justify-center border border-white/5">
        <div className="text-4xl font-bold text-white">✨</div>
      </div>
    ),
    details: (
      <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-8 border border-white/5">
        <h3 className="text-3xl font-bold text-white mb-4">Pixel Transition</h3>
        <p className="text-zinc-400 text-center mb-6">
          A smooth, interactive component that transitions between two content views using a pixel grid animation effect.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'TypeScript', 'Framer Motion'].map((tech) => (
            <span key={tech} className="bg-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    github: 'https://github.com',
    link: 'https://github.com',
  },
  {
    id: 'motion-portfolio',
    title: 'Motion Graphics Portfolio',
    description: 'Full-featured portfolio website with animations and optimizations',
    technologies: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Lenis'],
    thumbnail: (
      <div className="w-full h-full bg-neutral-900 flex items-center justify-center border border-white/5">
        <div className="text-4xl font-bold text-white">🎬</div>
      </div>
    ),
    details: (
      <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-8 border border-white/5">
        <h3 className="text-3xl font-bold text-white mb-4">Motion Graphics Portfolio</h3>
        <p className="text-zinc-400 text-center mb-6">
          A high-performance portfolio website featuring smooth scrolling, parallax effects, and optimized animations.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Next.js', 'GSAP', 'Lenis'].map((tech) => (
            <span key={tech} className="bg-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    github: 'https://github.com',
    link: 'https://github.com',
  },
  {
    id: 'interactive-ui',
    title: 'Interactive UI Library',
    description: 'Reusable React components with advanced animations and interactions',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Storybook'],
    thumbnail: (
      <div className="w-full h-full bg-neutral-900 flex items-center justify-center border border-white/5">
        <div className="text-4xl font-bold text-white">⚛️</div>
      </div>
    ),
    details: (
      <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-8 border border-white/5">
        <h3 className="text-3xl font-bold text-white mb-4">Interactive UI Library</h3>
        <p className="text-zinc-400 text-center mb-6">
          A collection of reusable, accessible React components with modern animations and interactions.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'Tailwind CSS', 'Storybook'].map((tech) => (
            <span key={tech} className="bg-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    github: 'https://github.com',
    link: 'https://github.com',
  },
];

const CodingProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentProject = projects[activeIndex];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-xs font-mono uppercase text-muted-foreground tracking-[0.2em]">[ ENGINEERING ]</span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase mt-4 mb-4 text-white">
            Coding Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Creative coding solutions and interactive experiments.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start mb-12 md:mb-24">
          {/* Project Showcase */}
          <div className="lg:col-span-2 h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <PixelTransition
              firstContent={currentProject.thumbnail}
              secondContent={currentProject.details}
              gridSize={12}
              pixelColor="#111"
              animationStepDuration={0.4}
              className="w-full h-full"
            />
          </div>

          {/* Project Info */}
          <div className="flex flex-col h-full justify-center">
            <span className="text-6xl font-bold text-white/5 mb-4 font-mono select-none">0{activeIndex + 1}</span>
            <h3 className="text-3xl font-bold text-white mb-4">{currentProject.title}</h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{currentProject.description}</p>

            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/70 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {currentProject.link && (
                <a href={currentProject.link} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline text-white">
                  View Live <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {currentProject.github && (
                <a href={currentProject.github} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline text-white/50 hover:text-white">
                  GitHub <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Projects Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveIndex(index)}
              className={`text-left p-6 rounded-xl border transition-all duration-300 group ${activeIndex === index
                ? 'bg-white/10 border-white/20'
                : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
            >
              <div className="text-2xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                {project.id === 'pixel-transition' && '✨'}
                {project.id === 'motion-portfolio' && '🎬'}
                {project.id === 'interactive-ui' && '⚛️'}
              </div>
              <h4 className={`font-bold uppercase text-sm tracking-wider mb-2 ${activeIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                {project.title}
              </h4>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProjectsSection;
