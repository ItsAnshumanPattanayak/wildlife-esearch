import { useState } from 'react';

const SimilarAnimals = ({ currentAnimal }) => {
  const [similar] = useState([]);

  if (similar.length === 0) {
    return (
      <div className="my-8">
        <h3 className="text-2xl font-bold mb-4">🔗 Similar Species</h3>
        <p className="text-gray-600">No similar animals to display</p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">🔗 Similar Species</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Similar animals will be displayed here */}
      </div>
    </div>
  );
};

export default SimilarAnimals;