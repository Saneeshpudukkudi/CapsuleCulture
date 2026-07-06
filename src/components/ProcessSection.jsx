import React from 'react';

const steps = [
  { number: '01', title: 'Consultation', desc: 'Discuss your vision and requirements' },
  { number: '02', title: 'Design', desc: 'Custom design crafted for you' },
  { number: '03', title: 'Manufacturing', desc: 'Precision factory construction' },
  { number: '04', title: 'Delivery', desc: 'Safe transport to your site' },
  { number: '05', title: 'Installation', desc: 'Professional setup and handover' },
  { number: '06', title: 'Maintenance', desc: 'Ongoing care and support' },
];

export default function ProcessSection() {
  return (
    <section className="py-32 bg-white border-t-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Process</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            How it comes together.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="mb-6">
                <p className="text-5xl font-poppins font-bold text-forge-light group-hover:text-forge transition-colors duration-300">{step.number}</p>
              </div>
              <h3 className="font-poppins font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">{step.title}</h3>
              <p className="text-gray-600 font-light">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 pt-12">
          <p className="text-gray-600 font-light text-lg mb-8">Ready to get started?</p>
          <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
