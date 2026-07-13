import React, { useRef } from 'react';

const models = [
  {
    id: 1,
    name: 'Premium Living Capsule',
    size: '250 sq ft',
    desc: 'Luxury residential space with premium finishes and sophisticated design',
    features: ['Full kitchen', 'Master bedroom', 'Marble bathroom', 'Living area'],
    image: '/1%20(26).jpg',
  },
  {
    id: 2,
    name: 'Standard Living Capsule',
    size: '180 sq ft',
    desc: 'Elegant living space designed for the modern minimalist',
    features: ['Kitchenette', 'Bedroom', 'Bathroom', 'Compact living area'],
    image: '/1%20(27).jpg',
  },
  {
    id: 3,
    name: 'Premium Modular Office',
    size: '200 sq ft',
    desc: 'Professional workspace with architectural precision',
    features: ['Open workspace', 'Meeting area', 'Storage', 'Climate control'],
    image: '/1%20(28).jpg',
  },
  {
    id: 4,
    name: 'Security Cabin',
    size: '100 sq ft',
    desc: 'Secure monitoring station with premium finishes',
    features: ['360° visibility', 'Security systems', 'Comfortable seating', 'Climate controlled'],
    image: '/1%20(1).png',
  },
];

export default function ModelsSection() {
  const viewportRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const scrollByAmount = (amount) => {
    viewportRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScroll.current = viewport.scrollLeft;
    viewport.classList.add('cursor-grabbing');
  };

  const stopDragging = () => {
    isDragging.current = false;
    viewportRef.current?.classList.remove('cursor-grabbing');
  };

  const handleMouseMove = (e) => {
    const viewport = viewportRef.current;
    if (!isDragging.current || !viewport) return;
    e.preventDefault();
    const delta = e.pageX - dragStartX.current;
    viewport.scrollLeft = dragStartScroll.current - delta;
  };

  return (
    <section id="models" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-16 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Our Collection</p>
            <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Thoughtfully designed spaces.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollByAmount(-380)}
              aria-label="Scroll left"
              className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollByAmount(380)}
              aria-label="Scroll right"
              className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className="overflow-x-auto scrollbar-visible cursor-grab select-none pb-4"
        >
          <div className="flex gap-8 w-max">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500 flex-shrink-0 w-[340px] sm:w-[380px]"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-3">{model.size}</p>
                  <h3 className="font-poppins font-bold text-xl text-gray-900 mb-3">{model.name}</h3>
                  <p className="text-gray-600 font-light mb-6 text-sm">{model.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 font-light text-sm">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center border-t-2 border-gray-200 pt-12">
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
