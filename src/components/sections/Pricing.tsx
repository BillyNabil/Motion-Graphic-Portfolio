'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PressureText from '@/components/ui/pressure-text';
import { Badge } from '@/components/ui/badge';

const pricingData = [
  {
    service: "Logo Animation",
    description: "Professional logo reveal and branding animations",
    startingPrice: "$150",
    turnaround: "3-5 days",
    features: ["Custom design", "HD resolution", "Sound effects", "Multiple formats"]
  },
  {
    service: "Explainer Video",
    description: "2D animated explainer videos for products/services",
    startingPrice: "$500",
    turnaround: "7-14 days",
    features: ["Script writing", "Voiceover", "Background music", "Unlimited revisions"]
  },
  {
    service: "Social Media Content",
    description: "Animated posts and stories for social platforms",
    startingPrice: "$100",
    turnaround: "2-3 days",
    features: ["Platform optimization", "Multiple sizes", "Brand consistency", "Quick delivery"]
  },
  {
    service: "Event Graphics",
    description: "Opening titles, transitions, and event visuals",
    startingPrice: "$300",
    turnaround: "5-7 days",
    features: ["Custom branding", "Live integration", "Multiple formats", "Rehearsal support"]
  },
  {
    service: "Motion Typography",
    description: "Kinetic typography for music videos and presentations",
    startingPrice: "$200",
    turnaround: "4-6 days",
    features: ["Font selection", "Timing sync", "Visual effects", "Color grading"]
  },
  {
    service: "Character Animation",
    description: "2D character design and animation sequences",
    startingPrice: "$400",
    turnaround: "10-14 days",
    features: ["Character design", "Rigging", "Animation", "Background design"]
  },
  {
    service: "Video Editing",
    description: "Professional video editing and post-production",
    startingPrice: "$250",
    turnaround: "3-5 days",
    features: ["Color grading", "Audio mixing", "Effects", "Final delivery"]
  },
  {
    service: "Custom Project",
    description: "Tailored motion graphics solutions",
    startingPrice: "Quote",
    turnaround: "Varies",
    features: ["Customized approach", "Dedicated support", "Flexible timeline", "Comprehensive service"]
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <PressureText
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            delay={0.2}
            intensity={1.25}
          >
            <span className="text-primary">PRICING</span> & SERVICES
          </PressureText>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Transparent pricing for professional motion graphics services.
            Contact me for custom projects and bulk pricing.
          </p>
          <Badge variant="outline" className="text-xs sm:text-sm">
            All prices are starting points and may vary based on project complexity
          </Badge>
        </motion.div>

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card rounded-lg border overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="w-[25%] font-semibold text-left p-4">Service</th>
                  <th className="w-[30%] font-semibold text-left p-4">Description</th>
                  <th className="w-[15%] font-semibold text-left p-4">Starting Price</th>
                  <th className="w-[15%] font-semibold text-left p-4">Turnaround</th>
                  <th className="w-[15%] font-semibold text-left p-4">Features</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <motion.tr
                    key={item.service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(var(--muted) / 0.5)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    viewport={{ once: true }}
                    className="border-b cursor-pointer transition-all duration-200"
                  >
                    <td className="font-medium p-4">
                      <div>
                        <motion.p
                          className="font-semibold text-lg"
                          whileHover={{ scale: 1.05, color: "rgb(var(--primary))" }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.service}
                        </motion.p>
                      </div>
                    </td>
                    <td className="p-4">
                      <motion.p
                        className="text-sm text-muted-foreground"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.description}
                      </motion.p>
                    </td>
                    <td className="p-4">
                      <motion.span
                        className="font-bold text-primary text-lg inline-block"
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          textShadow: "0 0 20px rgba(var(--primary), 0.5)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.startingPrice}
                      </motion.span>
                    </td>
                    <td className="p-4">
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          rotate: [0, -2, 2, 0]
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          {item.turnaround}
                        </Badge>
                      </motion.div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {item.features.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                        {item.features.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{item.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-4 sm:p-6 space-y-4 sm:space-y-6">
            {pricingData.map((item, index) => (
              <motion.div
                key={item.service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                className="bg-card border rounded-lg p-4 sm:p-6 cursor-pointer transition-all duration-200"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-start">
                    <motion.h3
                      className="text-lg sm:text-xl font-bold text-foreground"
                      whileHover={{ scale: 1.05, color: "rgb(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.service}
                    </motion.h3>
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        {item.startingPrice}
                      </span>
                    </motion.div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, -2, 2, 0]
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {item.turnaround}
                      </Badge>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Features:</p>
                    <div className="space-y-1">
                      {item.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        
          
        

        </div>
    </section>
  );
};

export default Pricing;