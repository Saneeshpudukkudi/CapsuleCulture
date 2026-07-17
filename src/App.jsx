import React, { useEffect } from 'react';
import Lenis from 'lenis';
import './index.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ModelsSection from './components/ModelsSection';
import FeaturesSection from './components/FeaturesSection';
import GallerySection from './components/GallerySection';
import ProcessSection from './components/ProcessSection';
import TeamSection from './components/TeamSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <ModelsSection />
      <FeaturesSection />
      <GallerySection />
      <ProcessSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
