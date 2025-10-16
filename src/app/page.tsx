import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import InfiniteLogoScroller from '@/components/sections/InfiniteLogoScroller';
import ParallaxShowcase from '@/components/sections/ParallaxShowcase';
import Works from '@/components/sections/Works';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <InfiniteLogoScroller />
      <ParallaxShowcase />
      <Works />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
