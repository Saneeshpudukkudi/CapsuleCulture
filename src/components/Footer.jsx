import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-2 border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <span className="font-poppins font-bold text-white">Capsule Culture</span>
            </div>
            <p className="text-sm text-gray-400 font-light">Premium prefabricated homes for modern living.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-bold text-white mb-6 text-sm uppercase tracking-wide">Navigate</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#models" className="hover:text-white transition">Models</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-poppins font-bold text-white mb-6 text-sm uppercase tracking-wide">Information</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-poppins font-bold text-white mb-6 text-sm uppercase tracking-wide">Follow</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61583151132210" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center hover:border-white hover:text-white transition text-sm font-semibold">
                f
              </a>
              <a href="https://instagram.com/cc_capsule_culture" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center hover:border-white hover:text-white transition text-sm font-semibold">
                IG
              </a>
              <a href="https://wa.me/918848337921 918848337921" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center hover:border-white hover:text-white transition text-sm font-semibold">
                W
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm font-light">
            <p className="text-gray-400">
              &copy; {currentYear} Capsule Culture. All rights reserved.
            </p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
