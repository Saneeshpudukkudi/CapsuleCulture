import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 w-full">
      <nav className="px-6 sm:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gray-900 rounded-full"></div>
          <span className="font-poppins font-semibold text-lg text-gray-900">Capsule Culture</span>
        </div>
        
        <ul className="hidden md:flex space-x-12 text-gray-700 font-inter text-sm">
          <li><a href="#about" className="hover:text-gray-900 transition font-light">About</a></li>
          <li><a href="#models" className="hover:text-gray-900 transition font-light">Models</a></li>
          <li><a href="#features" className="hover:text-gray-900 transition font-light">Features</a></li>
          <li><a href="#gallery" className="hover:text-gray-900 transition font-light">Gallery</a></li>
          <li><a href="#contact" className="hover:text-gray-900 transition font-light">Contact</a></li>
        </ul>

        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors hidden sm:block">
          Get a Quote
        </button>
      </nav>
    </header>
  );
}
