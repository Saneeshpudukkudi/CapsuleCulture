import React, { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#models', label: 'Models' },
    { href: '#configure', label: 'Configure' },
    { href: '#features', label: 'Features' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 w-full">
      <nav className="px-6 sm:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gray-900 rounded-full"></div>
          <span className="font-poppins font-semibold text-lg text-gray-900">Capsule Culture</span>
        </div>

        <ul className="hidden md:flex space-x-12 text-gray-700 font-inter text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-gray-900 transition font-light">{link.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors hidden sm:block">
          Get a Quote
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-900"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 sm:px-8 py-6">
          <ul className="flex flex-col space-y-5 text-gray-700 font-inter text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-gray-900 transition font-light">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block w-full mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold text-sm text-center hover:bg-gray-800 transition-colors">
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}
