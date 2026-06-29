import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../services/api';
import { addToSearchHistory } from './SearchHistory';
import ImageGallery from './ImageGallery';
import ConservationBadge from './ConservationBadge';
import QuickFacts from './QuickFacts';
import DistributionMap from './DistributionMap';
import DownloadButton from './DownloadButton';
import ShareButtons from './ShareButtons';
import SimilarAnimals from './SimilarAnimals';

const AnimalDetails = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimalDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/animal/${name}`);
        if (response.data.success) {
          setData(response.data);
          
          const emoji = getAnimalEmoji(name);
          addToSearchHistory(name, emoji);
        }
      } catch (error) {
        console.error('Error loading details:', error);
        toast.error('Failed to load animal details');
      } finally {
        setLoading(false);
      }
    };

    loadAnimalDetails();
  }, [name]);

  function getAnimalEmoji(animalName) {
    const emojiMap = {
      'lion': '🦁', 'tiger': '🐯', 'elephant': '🐘',
      'bear': '🐻', 'wolf': '🐺', 'fox': '🦊',
      'eagle': '🦅', 'owl': '🦉', 'shark': '🦈',
      'whale': '🐋', 'dolphin': '🐬', 'penguin': '🐧',
      'snake': '🐍', 'crocodile': '🐊', 'leopard': '🐆',
    };
    return emojiMap[animalName?.toLowerCase()] || '🐾';
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
        <p className="mt-4 text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Animal not found</h2>
        <Link to="/search" className="btn-primary">
          Go to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link to="/search" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
          <FaArrowLeft /> Back to Search
        </Link>
        
        <div className="flex gap-3">
          <DownloadButton animalData={data} />
          <ShareButtons animalName={data.animal} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h1 className="text-5xl font-bold text-purple-600 capitalize mb-4">
          {data.animal}
        </h1>

        {data.details?.conservation_status && (
          <div className="mb-6">
            <ConservationBadge status={data.details.conservation_status} />
          </div>
        )}
        
        {data.details && (
          <>
            <p className="text-xl text-gray-600 italic mb-6">
              {data.details.scientific_name || 'Scientific name unavailable'}
            </p>
            
            {data.details.description && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {data.details.description}
                </p>
              </div>
            )}

            {data.details.page_url && (
              <a 
                href={data.details.page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-purple-600 hover:underline"
              >
                Read more on Wikipedia →
              </a>
            )}
          </>
        )}

        {data.details && <QuickFacts animal={data.details} />}

        {data.details?.distribution && (
          <DistributionMap 
            animalName={data.animal} 
            distribution={data.details.distribution} 
          />
        )}
      </div>

      {data.images && data.images.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <ImageGallery images={data.images} animalName={data.animal} />
        </div>
      )}

      {data.protection && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            🛡️ Safety & Protection
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="font-semibold text-lg">Danger Level</p>
              <p className="text-2xl text-yellow-700">{data.protection.danger_level}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-lg">Safe Distance</p>
              <p className="text-2xl text-blue-700">{data.protection.safe_distance}</p>
            </div>
          </div>

          {data.protection.warnings && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">⚠️ Warnings</h3>
              <ul className="space-y-2">
                {data.protection.warnings.map((warning, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⚠️</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-green-700">✅ What to DO</h3>
              <ul className="space-y-2">
                {data.protection.what_to_do.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-red-700">❌ What NOT to do</h3>
              <ul className="space-y-2">
                {data.protection.what_not_to_do.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {data.medical && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            🏥 Medical Information
          </h2>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <h3 className="text-xl font-bold mb-3 text-red-800">Emergency Steps</h3>
            <ol className="space-y-2 list-decimal list-inside">
              {data.medical.emergency_steps.map((step, i) => (
                <li key={i} className="text-gray-800">{step}</li>
              ))}
            </ol>
          </div>

          {data.medical.first_aid && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-bold mb-3">For Bites:</h3>
                <ul className="space-y-2">
                  {data.medical.first_aid.for_bites.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">For Scratches:</h3>
                <ul className="space-y-2">
                  {data.medical.first_aid.for_scratches.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {data.medical.warning_signs && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">⚠️ Warning Signs:</h3>
              <ul className="space-y-2">
                {data.medical.warning_signs.map((sign, i) => (
                  <li key={i} className="text-sm text-red-700">• {sign}</li>
                ))}
              </ul>
            </div>
          )}

          {data.medical.emergency_contacts && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Emergency Contacts:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Emergency:</strong> {data.medical.emergency_contacts.emergency}</p>
                <p><strong>Poison Control:</strong> {data.medical.emergency_contacts.poison_control}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <SimilarAnimals currentAnimal={data.animal} />
      </div>
    </div>
  );
};

export default AnimalDetails;