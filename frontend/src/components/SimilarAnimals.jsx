import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SimilarAnimals = ({ currentAnimal }) => {
  const [similar] = useState([]);

  if (similar.length === 0) return null;

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">🔗 Similar Species</h3>
      <p className="text-gray-600">No similar animals found</p>
    </div>
  );
};

export default SimilarAnimals;