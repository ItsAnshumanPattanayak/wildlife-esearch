import  { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { FaCamera, FaUpload, FaRedo } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../services/api';

const CameraSearch = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Capture photo from webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    identifyFromDataURL(imageSrc);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Send to API
    await uploadImage(file);
  };

  // Convert data URL to blob and identify
  const identifyFromDataURL = async (dataURL) => {
    setLoading(true);
    try {
      const blob = await fetch(dataURL).then(r => r.blob());
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      await uploadImage(file);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process image');
      setLoading(false);
    }
  };

  // Upload image to API
  const uploadImage = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/identify/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setResult(response.data);
        toast.success(`Identified: ${response.data.identification.animal_name}!`);
      } else {
        toast.error('Could not identify animal');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to identify animal');
    } finally {
      setLoading(false);
    }
  };

  // Reset
  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">📸 Camera Search</h1>
        <p className="text-gray-600">Take or upload a photo to identify any animal</p>
      </div>

      {/* Camera/Image Display */}
      <div className="bg-black rounded-2xl overflow-hidden mb-6 shadow-2xl">
        {!image ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-auto"
            videoConstraints={{
              facingMode: 'environment'
            }}
          />
        ) : (
          <img src={image} alt="Captured" className="w-full h-auto" />
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center mb-8">
        {!image ? (
          <>
            <button onClick={capturePhoto} className="btn-primary">
              <FaCamera /> Capture Photo
            </button>
            <label className="btn-secondary cursor-pointer">
              <FaUpload /> Upload Image
              <input 
                type="file" 
                hidden 
                onChange={handleFileUpload} 
                accept="image/*" 
              />
            </label>
          </>
        ) : (
          <button onClick={reset} className="btn-secondary">
            <FaRedo /> Take Another
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Analyzing image...</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-purple-600 capitalize mb-2">
              {result.identification.animal_name}
            </h2>
            <p className="text-xl text-gray-600 italic">
              {result.identification.scientific_name}
            </p>
            <div className="mt-4">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                {(result.identification.confidence * 100).toFixed(1)}% Confidence
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <InfoBox label="Category" value={result.identification.category} />
            <InfoBox label="Class" value={result.identification.class} />
            <InfoBox label="Habitat" value={result.identification.habitat} />
            <InfoBox label="Diet" value={result.identification.diet} />
          </div>

          {/* Description */}
          {result.details && (
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3">📖 Description</h3>
              <p className="text-gray-700 leading-relaxed">{result.details.summary}</p>
            </div>
          )}

          {/* Safety Info */}
          {result.protection && (
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3">🛡️ Safety Information</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-semibold">Danger Level: {result.protection.danger_level}</p>
                <p className="text-sm">Safe Distance: {result.protection.safe_distance}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">✅ What to DO:</h4>
                  <ul className="space-y-1">
                    {result.protection.what_to_do.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2">❌ What NOT to do:</h4>
                  <ul className="space-y-1">
                    {result.protection.what_not_to_do.map((item, i) => (
                      <li key={i} className="text-sm text-gray-700">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Medical Info */}
          {result.medical && (
            <div>
              <h3 className="text-2xl font-bold mb-3">🏥 Medical Information</h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h4 className="font-bold mb-2">Emergency Steps:</h4>
                <ol className="space-y-1 list-decimal list-inside">
                  {result.medical.emergency_steps.map((step, i) => (
                    <li key={i} className="text-sm text-gray-700">{step}</li>
                  ))}
                </ol>
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="font-semibold text-red-700">
                    Emergency: {result.medical.emergency_contacts.emergency}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InfoBox = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-semibold text-lg">{value}</p>
  </div>
);

export default CameraSearch;