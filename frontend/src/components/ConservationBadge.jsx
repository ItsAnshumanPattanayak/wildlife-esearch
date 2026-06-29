const ConservationBadge = ({ status }) => {
  const statusConfig = {
    "Extinct": { 
      color: "bg-black text-white", 
      icon: "💀",
      description: "No living individuals remain"
    },
    "Extinct in Wild": { 
      color: "bg-gray-800 text-white", 
      icon: "🏚️",
      description: "Only survives in captivity"
    },
    "Critically Endangered": { 
      color: "bg-red-700 text-white", 
      icon: "🆘",
      description: "Extremely high risk of extinction"
    },
    "Endangered": { 
      color: "bg-red-500 text-white", 
      icon: "⚠️",
      description: "High risk of extinction"
    },
    "Vulnerable": { 
      color: "bg-orange-500 text-white", 
      icon: "⚡",
      description: "Threatened with extinction"
    },
    "Near Threatened": { 
      color: "bg-yellow-500 text-black", 
      icon: "⚠️",
      description: "Close to being threatened"
    },
    "Least Concern": { 
      color: "bg-green-500 text-white", 
      icon: "✅",
      description: "Widespread and abundant"
    },
    "Data Deficient": { 
      color: "bg-gray-400 text-white", 
      icon: "❓",
      description: "Not enough data to assess"
    },
  };

  const config = statusConfig[status] || statusConfig["Data Deficient"];

  return (
    <div className="inline-block">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl ${config.color} shadow-lg`}>
        <span className="text-3xl">{config.icon}</span>
        <div>
          <p className="text-xs opacity-80 uppercase tracking-wide">Conservation Status</p>
          <p className="font-bold text-lg">{status}</p>
          <p className="text-xs opacity-90 mt-1">{config.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ConservationBadge;