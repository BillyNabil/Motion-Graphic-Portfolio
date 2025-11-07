'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PixelTransition from '@/components/ui/pixel-transition';
import SectionObserver from '@/components/ui/SectionObserver';
import { Button } from '@/components/ui/button';
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
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-4xl font-bold text-white">✨</div>
      </div>
    ),
    details: (
      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center p-8">
        <h3 className="text-3xl font-bold text-white mb-4">Pixel Transition</h3>
        <p className="text-white text-center mb-6">
          A smooth, interactive component that transitions between two content views using a pixel grid animation effect.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'TypeScript', 'Framer Motion'].map((tech) => (
            <span key={tech} className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
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
      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        <div className="text-4xl font-bold text-white">🎬</div>
      </div>
    ),
    details: (
      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-8">
        <h3 className="text-3xl font-bold text-white mb-4">Motion Graphics Portfolio</h3>
        <p className="text-white text-center mb-6">
          A high-performance portfolio website featuring smooth scrolling, parallax effects, and optimized animations.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Next.js', 'GSAP', 'Lenis'].map((tech) => (
            <span key={tech} className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
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
      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
        <div className="text-4xl font-bold text-white">⚛️</div>
      </div>
    ),
    details: (
      <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col items-center justify-center p-8">
        <h3 className="text-3xl font-bold text-white mb-4">Interactive UI Library</h3>
        <p className="text-white text-center mb-6">
          A collection of reusable, accessible React components with modern animations and interactions built with Tailwind CSS.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'Tailwind CSS', 'Storybook'].map((tech) => (
            <span key={tech} className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
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

const CodingProjectsLanding: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentProject = projects[activeIndex];

  return (
    <SectionObserver sectionId="coding-projects">
      <section id="coding-projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 relative">
              <span className="pressure-text-inverted">MY</span> <span className="text-primary pressure-text-inverted">CODING PROJECTS</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my collection of interactive components, web applications, and creative coding solutions built with modern technologies
            </p>
          </motion.div>

          {/* Main Project Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Project Showcase with Pixel Transition */}
              <div className="lg:col-span-2 rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 min-h-[400px] lg:min-h-[500px] bg-card shadow-lg">
                <PixelTransition
                  firstContent={currentProject.thumbnail}
                  secondContent={currentProject.details}
                  gridSize={12}
                  pixelColor="currentColor"
                  animationStepDuration={0.5}
                  className="w-full h-full"
                />
              </div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {currentProject.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {currentProject.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {currentProject.link && (
                    <Button
                      asChild
                      className="flex-1 gap-2"
                      variant="default"
                    >
                      <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  {currentProject.github && (
                    <Button
                      asChild
                      className="flex-1 gap-2"
                      variant="outline"
                    >
                      <a href={currentProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground">
              All Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                    activeIndex === index
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-primary/20 bg-card hover:border-primary/40 hover:bg-card/80'
                  }`}
                >
                  <div className="mb-4 text-3xl">
                    {project.id === 'pixel-transition' && '✨'}
                    {project.id === 'motion-portfolio' && '🎬'}
                    {project.id === 'interactive-ui' && '⚛️'}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setActiveIndex((activeIndex - 1 + projects.length) % projects.length)}
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveIndex((activeIndex + 1) % projects.length)}
            >
              Next →
            </Button>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-muted-foreground"
          >
            Project {activeIndex + 1} of {projects.length}
          </motion.div>
        </div>
      </section>
    </SectionObserver>
  );
};

export default CodingProjectsLanding;
