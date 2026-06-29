import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageGallery = ({ images, animalName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="my-8">
        <h3 className="text-2xl font-bold mb-4">📸 Image Gallery</h3>
        <p className="text-gray-600">No images available for this animal.</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">📸 Image Gallery</h3>
      
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            className="cursor-pointer rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
          >
            <img
              src={img.thumbnail || img.url}
              alt={`${animalName} ${index + 1}`}
              className="w-full h-40 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
            {img.photographer && (
              <p className="text-xs text-center p-2 bg-gray-100 truncate">
                📷 {img.photographer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          >
            <FaTimes />
          </button>
          
          <div className="max-w-5xl max-h-full flex flex-col items-center">
            <img
              src={selectedImage.url}
              alt="Full size"
              className="max-w-full max-h-screen object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.photographer && (
              <p className="text-white text-center mt-4 bg-black bg-opacity-50 px-4 py-2 rounded">
                Photo by {selectedImage.photographer}
                {selectedImage.source && ` on ${selectedImage.source}`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;