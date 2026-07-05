import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 text-center">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold">Premium Prefabricated Homes</p>
        </div>
        
        <h1 className="font-poppins text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
          Minimal Space.<br />Maximum Living.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Luxury steel prefabricated homes designed for modern lifestyles. 
          <br className="hidden md:block" />
          Precision engineering. Premium finishes. Uncompromising quality.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
            Explore Models
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
            Get a Quote
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</p>
          <svg className="w-5 h-5 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
