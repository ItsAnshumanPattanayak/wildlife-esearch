const QuickFacts = ({ animal }) => {
  const facts = [
    { 
      icon: "🏠", 
      label: "Habitat", 
      value: animal.habitat || "Various habitats",
      color: "from-green-50 to-emerald-50"
    },
    { 
      icon: "🍖", 
      label: "Diet", 
      value: animal.diet || "Omnivore",
      color: "from-orange-50 to-amber-50"
    },
    { 
      icon: "⚖️", 
      label: "Average Weight", 
      value: animal.weight || "Varies by species",
      color: "from-blue-50 to-cyan-50"
    },
    { 
      icon: "📏", 
      label: "Average Length", 
      value: animal.length || "Varies by species",
      color: "from-purple-50 to-pink-50"
    },
    { 
      icon: "⏳", 
      label: "Lifespan", 
      value: animal.lifespan || "10-20 years",
      color: "from-yellow-50 to-orange-50"
    },
    { 
      icon: "🌍", 
      label: "Distribution", 
      value: animal.distribution || "Worldwide",
      color: "from-indigo-50 to-blue-50"
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">📊 Quick Facts</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {facts.map((fact, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br ${fact.color} rounded-xl p-5 text-center transform hover:scale-105 transition shadow-md hover:shadow-xl`}
          >
            <div className="text-5xl mb-3">{fact.icon}</div>
            <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
              {fact.label}
            </p>
            <p className="font-bold text-gray-800 text-sm">
              {fact.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickFacts;