import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const TextSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error('Please enter an animal name');
      return;
    }

    setLoading(true);
    setSearched(true);
    
    try {
      const response = await api.get(`/search?q=${query}&limit=20`);
      
      if (response.data.success) {
        setResults(response.data.results);
        if (response.data.results.length === 0) {
          toast.error('No animals found');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🔍 Search Animals</h1>
        <p className="text-gray-600">Search by animal name to get detailed information</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-white rounded-full shadow-lg p-2">
            <div className="flex-1 flex items-center px-4">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Enter animal name (e.g., lion, eagle, shark)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-lg"
              />
            </div>
            <button type="submit" className="btn-primary rounded-full">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Searching...</p>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((animal, index) => (
              <AnimalCard key={index} animal={animal} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">No animals found</h3>
          <p className="text-gray-600">Try searching for: lion, tiger, eagle, shark, etc.</p>
        </div>
      )}

      {/* Popular Searches */}
      {!searched && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Searches</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {['Lion', 'Tiger', 'Elephant', 'Eagle', 'Shark', 'Wolf', 'Bear', 'Dolphin'].map(animal => (
              <button
                key={animal}
                onClick={() => {
                  setQuery(animal);
                  setTimeout(() => handleSearch({ preventDefault: () => {} }), 100);
                }}
                className="card text-center hover:shadow-xl cursor-pointer"
              >
                <p className="font-semibold">{animal}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AnimalCard = ({ animal }) => (
  <Link to={`/animal/${animal.name}`} className="card hover:shadow-xl">
    <h3 className="text-2xl font-bold text-purple-600 mb-2 capitalize">
      {animal.name}
    </h3>
    <p className="text-gray-600 italic mb-2">{animal.scientific_name}</p>
    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
      {animal.category}
    </div>
  </Link>
);

export default TextSearch;