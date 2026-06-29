import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaTimes, FaClock } from 'react-icons/fa';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const saved = localStorage.getItem('animalSearchHistory');
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };

    loadHistory();
  }, []); // Empty array is correct here

  const clearHistory = () => {
    if (window.confirm('Clear all search history?')) {
      setHistory([]);
      localStorage.removeItem('animalSearchHistory');
    }
  };

  const removeItem = (indexToRemove) => {
    const newHistory = history.filter((_, index) => index !== indexToRemove);
    setHistory(newHistory);
    localStorage.setItem('animalSearchHistory', JSON.stringify(newHistory));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) {
      const mins = Math.floor(diff / 60000);
      return `${mins} minute${mins > 1 ? 's' : ''} ago`;
    }
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    return date.toLocaleDateString();
  };

  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FaHistory className="text-purple-600" /> Recent Searches
        </h3>
        <button
          onClick={clearHistory}
          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          <FaTimes /> Clear All
        </button>
      </div>
      
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="flex items-center justify-between group">
            <Link
              to={`/animal/${item.name}`}
              className="flex-1 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition flex items-center gap-3"
            >
              <span className="text-2xl">{item.emoji || '🐾'}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FaClock className="text-xs" />
                  {formatDate(item.timestamp)}
                </p>
              </div>
            </Link>
            <button
              onClick={() => removeItem(index)}
              className="ml-2 p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export function - RED LINE FIX
export function addToSearchHistory(animalName, emoji = '🐾') {
  try {
    const saved = localStorage.getItem('animalSearchHistory');
    const history = saved ? JSON.parse(saved) : [];
    
    const filtered = history.filter(h => h.name.toLowerCase() !== animalName.toLowerCase());
    
    const newHistory = [
      { 
        name: animalName, 
        emoji: emoji,
        timestamp: new Date().toISOString() 
      },
      ...filtered
    ].slice(0, 15);

    localStorage.setItem('animalSearchHistory', JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

export default SearchHistory;