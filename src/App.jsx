import React from 'react';
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
