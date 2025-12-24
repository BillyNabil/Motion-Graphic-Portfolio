import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ShowcaseArsenal from '@/components/sections/ShowcaseArsenal';
import Works from '@/components/sections/Works';
import Pricing from '@/components/sections/Pricing';
import Terms from '@/components/sections/Terms';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <ShowcaseArsenal />
      <Works />
      <Pricing />
      <Terms />
      <Contact />
      <Footer />
    </main>
  );
}
