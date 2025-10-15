'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

const skills = [
  {
    name: 'After Effects',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg',
    iconDark: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg'
  },
  {
    name: 'Premiere Pro',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg',
    iconDark: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg'
  },
  {
    name: 'Photoshop',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    iconDark: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg'
  },
  {
    name: 'Illustrator',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
    iconDark: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg'
  },
  {
    name: 'Cinema 4D',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/C4D_icon.svg/240px-C4D_icon.svg.png',
    iconDark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/C4D_icon.svg/240px-C4D_icon.svg.png'
  },
  {
    name: 'Blender',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
    iconDark: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg'
  },
  {
    name: 'DaVinci Resolve',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/DaVinci_Resolve_17_logo.svg/240px-DaVinci_Resolve_17_logo.svg.png',
    iconDark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/DaVinci_Resolve_17_logo.svg/240px-DaVinci_Resolve_17_logo.svg.png'
  },
  {
    name: 'Audition',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Adobe_Audition_CC_icon.svg/240px-Adobe_Audition_CC_icon.svg.png',
    iconDark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Adobe_Audition_CC_icon.svg/240px-Adobe_Audition_CC_icon.svg.png'
  },
];

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Gradient Border Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:duration-300" />

      {/* Main Card */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full min-h-[200px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(20px)',
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container */}
        <motion.div
          className="relative mb-6"
          animate={{
            rotateZ: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse',
          }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))',
              }}
            />
          </div>
        </motion.div>

        {/* Skill Name */}
        <motion.h3
          className="text-lg md:text-xl font-bold text-white text-center mb-2"
          animate={{
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.h3>

        {/* Skill Level Indicator */}
        <div className="flex gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{
                opacity: i < 4 ? 1 : 0.3,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Hover Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-purple-400/50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.05 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const SkillsStack = () => {
  return (
    <section id="skills" className="py-24 min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            My <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-4" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mastering the tools of motion design and visual storytelling
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Floating Elements for Background */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to bring your vision to life?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsStack;