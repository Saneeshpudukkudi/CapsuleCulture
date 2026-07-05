import React from 'react';

const features = [
  { title: 'Premium Steel Structure', desc: 'Engineered for durability' },
  { title: 'Modern Design', desc: 'Architectural excellence' },
  { title: 'Factory Precision', desc: 'Meticulous craftsmanship' },
  { title: 'Fast Installation', desc: 'Efficient delivery' },
  { title: 'Energy Efficient', desc: 'Sustainable living' },
  { title: 'Weather Resistant', desc: 'Built to last' },
  { title: 'Low Maintenance', desc: 'Quality finishes' },
  { title: 'Custom Sizes', desc: 'Tailored solutions' },
  { title: 'Warranty Protected', desc: '10-year guarantee' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-white border-t-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Why Capsule Culture</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Built on excellence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full"></div>
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
