import React from 'react';

// Each feature gets its own line-icon so the grid isn't 9 identical dots
const features = [
  {
    title: 'Premium Steel Structure',
    desc: 'Engineered for durability',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 21V9l8-5 8 5v12M4 21h16M9 21V13h6v8" />
    ),
  },
  {
    title: 'Modern Design',
    desc: 'Architectural excellence',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-6 9 6M6 10v10h5v-6h2v6h5V10" />
    ),
  },
  {
    title: 'Factory Precision',
    desc: 'Meticulous craftsmanship',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 3.5l1.5 2.5 2.9-.4.8 2.8 2.8.8-.4 2.9 2.5 1.5-2.5 1.5.4 2.9-2.8.8-.8 2.8-2.9-.4-1.5 2.5-1.5-2.5-2.9.4-.8-2.8-2.8-.8.4-2.9L3.5 12l2.5-1.5-.4-2.9 2.8-.8.8-2.8 2.9.4 1.5-2.5zM12 15a3 3 0 100-6 3 3 0 000 6z" />
    ),
  },
  {
    title: 'Fast Installation',
    desc: 'Efficient delivery',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2L4.5 13.5H11L10 22l9-12h-6.5L13 2z" />
    ),
  },
  {
    title: 'Energy Efficient',
    desc: 'Sustainable living',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-4 3-6 6-6 9.5A6 6 0 0012 19a6 6 0 006-6.5C18 9 16 6 12 3zM12 9v10" />
    ),
  },
  {
    title: 'Weather Resistant',
    desc: 'Built to last',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    ),
  },
  {
    title: 'Low Maintenance',
    desc: 'Quality finishes',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 015.4-5.4l-2.7 2.7-2-2 2.7-2.7z" />
    ),
  },
  {
    title: 'Custom Sizes',
    desc: 'Tailored solutions',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h6v6H4V4zM14 14h6v6h-6v-6zM10 7h4M7 10v4M17 14v-3h-3" />
    ),
  },
  {
    title: 'Warranty Protected',
    desc: '10-year guarantee',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l7 3v6c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V6l7-3zM9 12l2 2 4-4" />
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white border-t-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Why Capsule Culture</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Engineered for confidence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="mb-5 w-14 h-14 rounded-xl bg-forge/10 flex items-center justify-center group-hover:bg-forge/20 transition-colors duration-300">
                <svg className="w-7 h-7 text-forge" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
