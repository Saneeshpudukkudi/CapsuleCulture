import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-inter font-semibold mb-4">Get in Touch</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold leading-tight">
            Let's talk about your project.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="space-y-12">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Phone</p>
                <p className="text-2xl font-light">+91 (Your Phone Number)</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Email</p>
                <p className="text-2xl font-light">info@capsuleculture.com</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Address</p>
                <p className="text-xl font-light text-gray-300">Your Business Address<br />City, State PIN Code</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-4">Connect on WhatsApp</p>
                <a
                  href="https://wa.me/919876543210"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.289-3.795 6.233-1.656 9.383 1.52 2.32 4.169 3.025 6.522 2.94h.006c.3 0 .584-.036.899-.135 4.211-1.276 7.052-5.392 6.348-9.81-.704-4.418-4.882-7.422-9.288-7.356z"/>
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 font-semibold mb-3">Message</label>
                <textarea
                  placeholder="Tell us about your project..."
                  rows="4"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-600 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600 resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full mt-8 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
