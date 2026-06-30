import { useState } from 'react';
import { FaTimes, FaExpand } from 'react-icons/fa';

const ImageGallery = ({ images, animalName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  console.log('🖼️ ImageGallery rendering with images:', images);

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
      <p className="text-sm text-gray-500 mb-4">
        Click any image to view full size • {images.length} {images.length === 1 ? 'photo' : 'photos'} available
      </p>
      
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="group relative cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-all transform hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.thumbnail || img.url}
              alt={`${animalName} ${index + 1}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                console.log('❌ Image failed to load:', img.url);
                e.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Wildlife+Photo';
              }}
              onLoad={() => console.log('✅ Image loaded:', index)}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
              <FaExpand className="text-white opacity-0 group-hover:opacity-100 text-2xl" />
            </div>
            
            {/* Image caption */}
            <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0 p-2">
              <p className="text-xs text-white truncate">
                📷 {img.photographer || `Photo ${index + 1}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-70 rounded-full w-14 h-14 flex items-center justify-center hover:bg-opacity-90 transition z-10"
          >
            <FaTimes className="text-3xl" />
          </button>
          
          {/* Image Container */}
          <div 
            className="max-w-6xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt="Full size view"
              className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="mt-4 bg-black bg-opacity-70 px-6 py-3 rounded-lg text-center">
              <p className="text-white text-lg font-semibold">
                {animalName}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                📷 Photo by {selectedImage.photographer || 'Unknown'}
                {selectedImage.source && ` • ${selectedImage.source}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;