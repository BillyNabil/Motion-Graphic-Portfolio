'use client';

import { motion } from 'framer-motion';
import SectionObserver from '@/components/ui/SectionObserver';

const pricingServices = [
  {
    service: "Stream Overlay (Static)",
    price: "$15",
    description: "Static overlay design for streaming platforms",
    features: ["Custom design", "Brand integration", "Multiple resolutions", "Source files"]
  },
  {
    service: "Stream Overlay (Animated)",
    price: "$30",
    description: "Animated overlay design for streaming platforms",
    features: ["Animated elements", "Custom design", "Brand integration", "Multiple resolutions"]
  },
  {
    service: "Stinger",
    price: "$40",
    description: "Animated transition for streaming",
    features: ["Custom animation", "Sound design", "Brand integration", "Multiple formats"]
  },
  {
    service: "Animated Logo",
    price: "$40",
    description: "Professional logo animation for branding",
    features: ["Custom animation", "Brand colors", "Multiple formats", "Source files"]
  },
  {
    service: "Trailer (Debut / Lore)",
    price: "$50",
    description: "Professional trailer for debut or lore videos",
    features: ["Cinematic effects", "Text animations", "Sound design", "HD quality"]
  },
  {
    service: "Simple Music Video",
    price: "$70",
    description: "Basic music video with simple animations and effects",
    features: ["Basic animations", "Standard transitions", "Text overlays", "HD quality"]
  },
  {
    service: "Complex Music Video",
    price: "$140",
    description: "Advanced music video with complex animations and custom effects",
    features: ["Advanced animations", "Custom effects", "Complex transitions", "4K quality", "Color grading"]
  }
];

const ServiceCard = ({ service, index }: { service: typeof pricingServices[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Service Header */}
      <div className="flex justify-between items-start mb-4">
        <motion.h3
          className="text-xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {service.service}
        </motion.h3>
        <motion.div
          className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold border border-white/20"
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 0.3 }}
        >
          {service.price}
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4 text-sm">
        {service.description}
      </p>

      {/* Features */}
      <div className="space-y-2">
        {service.features.map((feature, featureIndex) => (
          <motion.div
            key={featureIndex}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
            viewport={{ once: true }}
          >
            <svg className="w-4 h-4 text-white mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300 text-sm">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* Contact Button */}
      <motion.button
        className="w-full mt-4 py-2 px-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        Order Now
      </motion.button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <SectionObserver sectionId="pricing">
      <section id="pricing" className="py-24 min-h-screen relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-white/4 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase">
            PRICING
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Professional motion graphics services at competitive prices
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pricingServices.map((service, index) => (
            <ServiceCard key={service.service} service={service} index={index} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 mb-4">
            <em>Prices are starting rates and may vary based on project complexity</em>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Quality guaranteed
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Fast delivery
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Custom support
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </SectionObserver>
  );
};

export default Pricing;
