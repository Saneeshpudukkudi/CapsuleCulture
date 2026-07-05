import React from 'react';

const models = [
  {
    id: 1,
    name: 'Premium Living Capsule',
    size: '250 sq ft',
    desc: 'Luxury residential space with premium finishes and sophisticated design',
    features: ['Full kitchen', 'Master bedroom', 'Marble bathroom', 'Living area'],
  },
  {
    id: 2,
    name: 'Standard Living Capsule',
    size: '180 sq ft',
    desc: 'Elegant living space designed for the modern minimalist',
    features: ['Kitchenette', 'Bedroom', 'Bathroom', 'Compact living area'],
  },
  {
    id: 3,
    name: 'Premium Modular Office',
    size: '200 sq ft',
    desc: 'Professional workspace with architectural precision',
    features: ['Open workspace', 'Meeting area', 'Storage', 'Climate control'],
  },
  {
    id: 4,
    name: 'Security Cabin',
    size: '100 sq ft',
    desc: 'Secure monitoring station with premium finishes',
    features: ['360° visibility', 'Security systems', 'Comfortable seating', 'Climate controlled'],
  },
];

export default function ModelsSection() {
  return (
    <section id="models" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-24">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Our Collection</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Thoughtfully designed spaces.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((model) => (
            <div key={model.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500">
              {/* Image placeholder */}
              <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl text-gray-300 mb-2">□</div>
                  <p className="text-gray-400 text-sm">Product image</p>
                </div>
              </div>
              
              <div className="p-10">
                <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">{model.size}</p>
                <h3 className="font-poppins font-bold text-2xl text-gray-900 mb-4">{model.name}</h3>
                <p className="text-gray-600 font-light mb-8">{model.desc}</p>
                
                <ul className="space-y-3 mb-8">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 font-light">
                      <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center border-t-2 border-gray-200 pt-12">
          <h3 className="font-poppins text-3xl font-bold text-gray-900 mb-4">Custom Projects</h3>
          <p className="text-gray-600 font-light mb-8 max-w-2xl mx-auto">Have a unique vision? We create bespoke capsule homes tailored to your specifications and aesthetic preferences.</p>
          <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300">
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
