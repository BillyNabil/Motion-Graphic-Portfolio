'use client';

import { motion } from 'framer-motion';
import OptimizedVideo from '@/components/ui/optimized-video';

const About = () => {

  return (
    <section id="about" className="py-4 pb-16 md:pb-24 lg:pb-32 bg-background relative overflow-hidden">
      {/* ===== TOP GRADIENT FOR SMOOTH TRANSITION ===== */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/95 to-transparent z-10" />

      {/* ===== ADDITIONAL TOP OVERLAY ===== */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/20 to-transparent z-10" />

  
      {/* ===== BORDER CORNERS ===== */}
      <div className="absolute top-50 left-12 w-12 h-12 border-t-2 border-l-2 border-primary/50 z-20" />
      <div className="absolute top-50 right-12 w-12 h-12 border-t-2 border-r-2 border-primary/50 z-20" />
      <div className="absolute bottom-50 left-12 w-12 h-12 border-b-2 border-l-2 border-primary/50 z-20" />
      <div className="absolute bottom-50 right-12 w-12 h-12 border-b-2 border-r-2 border-primary/50 z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            ABOUT ME
          </h2>
          
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Crafting Motion, Creating Emotion
            </h3>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Hello! I&apos;m Billynabil, a passionate motion graphics designer with
                a keen eye for detail and a love for bringing ideas to life through
                animation and visual storytelling.
              </p>

              <p>
                With expertise spanning from logo animations to complex explainer
                videos, I specialize in creating compelling visual experiences that
                captivate audiences and communicate messages effectively.
              </p>

            </div>

            </motion.div>

          {/* Right Column - Local GIF Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center items-center"
          >
            <div className="w-full max-w-md bg-black rounded-2xl shadow-2xl overflow-hidden">
              <OptimizedVideo
                src="/dancing evernight.webm"
                fallbackFormats={{
                  webm: "/dancing evernight.webm",
                  mp4: "/Dance Evernight GIF.gif"
                }}
                alt="Dance Evernight Motion Graphics"
                className="w-full h-auto"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                controls={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;