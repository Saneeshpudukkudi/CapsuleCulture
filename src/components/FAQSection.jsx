import React, { useState } from 'react';

const faqs = [
  {
    q: 'How long does installation take?',
    a: 'Typical installation takes 2-4 weeks depending on the model and site preparation. The manufacturing process takes 6-8 weeks from order to delivery.'
  },
  {
    q: 'Can the design be customized?',
    a: 'Absolutely. We offer fully customizable designs. Our design team works directly with you to create a home that perfectly matches your needs and aesthetic vision.'
  },
  {
    q: 'What warranty do you provide?',
    a: 'We provide a 10-year structural warranty on all capsule homes, covering the steel frame and all key components. Extended warranties are also available.'
  },
  {
    q: 'Can you deliver anywhere in India?',
    a: 'Yes, we deliver and install across India. Delivery timelines vary by location. Contact us for area-specific information and logistics details.'
  },
  {
    q: 'What is included in the price?',
    a: 'Our pricing includes design, manufacturing, delivery, and installation. Optional add-ons include interior furnishing, smart home systems, and extended warranties.'
  },
  {
    q: 'Are these homes eco-friendly?',
    a: 'Yes. Our capsule homes are designed with sustainability in mind. Features like superior insulation, efficient climate control, and optional solar integration make them environmentally conscious choices.'
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-gray-50 border-t-2 border-gray-100">
      <div className="px-6 sm:px-8">
        <div className="max-w-7xl mx-auto mb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">FAQ</p>
            <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Questions answered.
            </h2>
          </div>
          <p className="text-lg text-gray-600 font-light lg:pb-2">
            Everything you need to know before starting your project. Can't find what you're looking for? Reach out directly below.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                openIndex === index ? 'border-forge/40' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-start text-left hover:text-gray-600 transition-colors"
              >
                <span className="font-poppins font-semibold text-base text-gray-900 pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 text-forge' : 'text-gray-900'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center mt-14 pt-10">
          <p className="text-gray-600 font-light text-lg mb-8">Didn't find your answer?</p>
          <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
}
