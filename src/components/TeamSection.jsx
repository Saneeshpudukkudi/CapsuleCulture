import React from 'react';

export default function TeamSection() {
  return (
    <section className="py-24 bg-white border-t-2 border-gray-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">The Story</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Crafted with purpose.
          </h2>
        </div>

        <div className="space-y-12 text-lg text-gray-600 font-light leading-relaxed">
          <p>
            Capsule Culture was founded on a simple belief: that luxury should never require compromise. We're a team of architects, engineers, and designers united by a singular mission—to redefine what's possible in modern living spaces.
          </p>

          <p>
            Every capsule home we create is a statement. A statement that premium doesn't mean wasteful. That innovation doesn't mean abandoning timeless design. That accessibility doesn't mean sacrificing quality.
          </p>

          <p>
            We've invested years perfecting our craft—from the precision of factory manufacturing to the elegance of every architectural detail. The result is something remarkable: homes that are as beautiful as they are intelligent.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-10 pt-10 border-t border-gray-200">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-2">100+</p>
              <p className="text-gray-600">Homes Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-2">10yr</p>
              <p className="text-gray-600">Warranty</p>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center border-t border-gray-200 pt-10">
          <p className="text-gray-600 font-light text-lg mb-8">Ready to be part of the capsule culture movement?</p>
          <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
