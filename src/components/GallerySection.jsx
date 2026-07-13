import React, { useState } from 'react';

const galleryItems = [
  { id: 1, category: 'Exterior', title: 'Modern Architecture', images: ['/gallery-exterior1.jpg', '/gallery-exterior2.jpg', '/1%20(2).png'] },
  { id: 2, category: 'Interior', title: 'Premium Living Spaces', images: ['/1%20(1).jpg', '/1%20(3).jpg', '/1%20(4).jpg', '/1%20(5).jpg', '/1%20(6).jpg', '/1%20(7).jpg'] },
  { id: 3, category: 'Office', title: 'Professional Workspace', images: ['/1%20(8).jpg', '/1%20(9).jpg', '/1%20(10).jpg', '/1%20(11).jpg'] },
  { id: 4, category: 'Living', title: 'Bedroom Design', images: ['/1%20(12).jpg', '/1%20(13).jpg', '/1%20(14).jpg', '/1%20(15).jpg', '/1%20(16).jpg'] },
  { id: 5, category: 'Construction', title: 'Manufacturing', images: ['/1%20(17).jpg', '/1%20(18).jpg', '/1%20(19).jpg', '/1%20(20).jpg'] },
  { id: 6, category: 'Projects', title: 'Installation', images: ['/1%20(21).jpg', '/1%20(22).jpg', '/1%20(23).jpg', '/1%20(24).jpg', '/1%20(25).jpg'] },
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', 'Exterior', 'Interior', 'Office', 'Living', 'Construction', 'Projects'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage && selectedImage.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedImage.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImage && selectedImage.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === selectedImage.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white border-t-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-inter font-semibold mb-4">Gallery</p>
          <h2 className="font-poppins text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            In the details.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 border ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-gray-100 aspect-square cursor-pointer rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              onClick={() => item.images && item.images.length > 0 && (setSelectedImage(item), setCurrentImageIndex(0))}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                {item.images && item.images.length > 0 ? (
                  <>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                    {item.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black bg-opacity-85 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                        {item.images.length} images
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl text-gray-300 mb-2">■</div>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

              <div className="absolute inset-0 flex items-end justify-start p-6">
                <div className="w-full">
                  <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-3">
                    <p className="text-white text-xs uppercase tracking-widest font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">{item.category}</p>
                  </div>
                  <h3 className="text-white font-poppins font-bold text-2xl leading-tight drop-shadow-lg group-hover:text-white transition-all duration-300">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && selectedImage.images && selectedImage.images.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-screen flex items-center justify-center w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.images[currentImageIndex]}
              alt={`${selectedImage.title} ${currentImageIndex + 1}`}
              className="max-w-full max-h-screen object-contain"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedImage.images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {selectedImage.images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {selectedImage.images.length > 1 && (
              <div className="absolute top-4 left-4 text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm font-semibold">
                {currentImageIndex + 1} / {selectedImage.images.length}
              </div>
            )}

            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm uppercase tracking-wide">{selectedImage.category}</p>
              <h3 className="font-poppins font-bold text-xl">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
