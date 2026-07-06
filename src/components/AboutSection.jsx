import React from 'react';

const features = [
  { title: 'Premium Steel', desc: 'Engineered for durability and longevity' },
  { title: 'Modern Design', desc: 'Contemporary aesthetics that inspire' },
  { title: 'Factory Precision', desc: 'Built with meticulous attention to detail' },
  { title: 'Fast Installation', desc: 'Ready in weeks, not months' },
  { title: 'Energy Efficient', desc: 'Sustainable living at its finest' },
  { title: 'Weather Resistant', desc: 'Built to withstand any climate' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">About Capsule Culture</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Premium homes, reimagined.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl font-light">
            We believe luxury should be accessible. Our prefabricated homes combine architectural excellence with precision engineering, delivered with a commitment to sustainability and timeless design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="border-t-2 border-gray-200 pt-8">
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
