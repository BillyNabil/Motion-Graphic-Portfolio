'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';

// Sample portfolio data - replace with actual YouTube video IDs
const portfolioItems = [
  {
    id: 1,
    title: "Brand Logo Animation",
    description: "Dynamic logo reveal for tech startup",
    category: "Logo Animation",
      videoId: "kgf6pliL2NQ", // Replace with actual YouTube video ID
  },
  {
    id: 2,
    title: "Product Explainer Video",
    description: "2D animated explainer for mobile app",
    category: "Explainer Video",
      videoId: "PMSq8b-etUY", // Replace with actual YouTube video ID
  },
  {
    id: 3,
    title: "Social Media Campaign",
    description: "Animated social media content series",
    category: "Social Media",
      videoId: "d3Z_tISZWtk", // Replace with actual YouTube video ID
  },
  {
    id: 4,
    title: "Event Intro Animation",
    description: "Opening titles for corporate event",
    category: "Event Graphics",
      videoId: "bZ1_FMZcM4E", // Replace with actual YouTube video ID
  },
  {
    id: 5,
    title: "Motion Typography",
    description: "Kinetic typography for music video",
    category: "Typography",
      videoId: "RouikVoCQUQ", // Replace with actual YouTube video ID
  },
  {
    id: 6,
    title: "Character Animation",
    description: "2D character animation sequence",
    category: "Character Design",
      videoId: "sTO5VGLT-4Y", // Replace with actual YouTube video ID
  },
];

const categories = ["All", "Logo Animation", "Explainer Video", "Social Media", "Event Graphics", "Typography", "Character Design"];

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 relative">
            <span className="pressure-text-inverted">MY</span> <span className="text-primary pressure-text-inverted">WORKS</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of motion graphics projects, from logo animations to explainer videos
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-lg bg-card border hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to lower quality if maxresdefault not available
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                  }}
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                     onClick={() => setSelectedVideo(item.videoId)}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-20 h-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl w-[90vw] max-h-[85vh] p-6 rounded-lg overflow-hidden">
                      {/* Close Button */}
                      <div className="absolute top-6 right-6 z-50">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
                          onClick={() => setSelectedVideo(null)}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Video Container - Large but not full screen */}
                      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
                          title={item.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Works;