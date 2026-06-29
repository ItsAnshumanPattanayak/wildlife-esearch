import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageGallery = ({ images, animalName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">📸 Image Gallery</h3>
      
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
          </div>
        ))}
      </div>

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
          
          <div className="max-w-5xl max-h-full">
            <img
              src={selectedImage.url}
              alt="Full size"
              className="max-w-full max-h-screen object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;