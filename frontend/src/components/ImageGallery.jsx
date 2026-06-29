import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageGallery = ({ images, animalName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Debug: Log what we received
  console.log('ImageGallery received:', { images, animalName });

  if (!images || images.length === 0) {
    console.log('No images available');
    return (
      <div className="my-8">
        <h3 className="text-2xl font-bold mb-4">📸 Image Gallery</h3>
        <p className="text-gray-600">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">📸 Image Gallery</h3>
      <p className="text-sm text-gray-500 mb-4">Click any image to view full size</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            className="cursor-pointer rounded-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-200"
          >
            <img
              src={img.thumbnail || img.url}
              alt={`${animalName} ${index + 1}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                console.log('Image failed to load:', img.url);
                e.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Animal+Photo';
              }}
              onLoad={() => console.log('Image loaded:', img.url)}
            />
            <div className="bg-gray-100 p-2 text-center">
              <p className="text-xs text-gray-600">{img.photographer || 'Photo ' + (index + 1)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 text-white text-5xl hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-16 h-16 flex items-center justify-center"
          >
            <FaTimes />
          </button>
          
          <div className="max-w-6xl max-h-full">
            <img
              src={selectedImage.url}
              alt="Full size"
              className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-center mt-4">
              <p className="text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded inline-block">
                Photo by {selectedImage.photographer || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;