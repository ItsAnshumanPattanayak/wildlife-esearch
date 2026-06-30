import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const DistributionMap = ({ animalName, distribution }) => {
  console.log('🗺️ DistributionMap rendering for:', animalName, 'Distribution:', distribution);

  const getLocations = () => {
    const locations = [];
    const dist = distribution?.toLowerCase() || '';
    
    // Africa
    if (dist.includes('africa')) {
      locations.push({ 
        lat: -1.286389, 
        lng: 36.817223, 
        label: 'East Africa', 
        color: '#22c55e' 
      });
      locations.push({ 
        lat: -25.7461, 
        lng: 28.1881, 
        label: 'South Africa', 
        color: '#22c55e' 
      });
    }
    
    // Asia
    if (dist.includes('asia') || dist.includes('india') || dist.includes('china')) {
      locations.push({ 
        lat: 20.593684, 
        lng: 78.962880, 
        label: 'India', 
        color: '#ef4444' 
      });
      locations.push({ 
        lat: 35.8617, 
        lng: 104.1954, 
        label: 'China', 
        color: '#ef4444' 
      });
    }
    
    // Americas
    if (dist.includes('america') || dist.includes('usa') || dist.includes('brazil')) {
      locations.push({ 
        lat: 37.09024, 
        lng: -95.712891, 
        label: 'North America', 
        color: '#3b82f6' 
      });
      locations.push({ 
        lat: -14.235004, 
        lng: -51.92528, 
        label: 'South America', 
        color: '#3b82f6' 
      });
    }
    
    // Europe
    if (dist.includes('europe')) {
      locations.push({ 
        lat: 54.526, 
        lng: 15.2551, 
        label: 'Europe', 
        color: '#f59e0b' 
      });
    }
    
    // Oceans/Worldwide
    if (dist.includes('ocean') || dist.includes('worldwide') || dist.includes('seas')) {
      locations.push({ 
        lat: 0, 
        lng: -30, 
        label: 'Atlantic Ocean', 
        color: '#06b6d4' 
      });
      locations.push({ 
        lat: 0, 
        lng: 150, 
        label: 'Pacific Ocean', 
        color: '#06b6d4' 
      });
      locations.push({ 
        lat: -20, 
        lng: 80, 
        label: 'Indian Ocean', 
        color: '#06b6d4' 
      });
    }
    
    // Default location if nothing matched
    if (locations.length === 0) {
      locations.push({ 
        lat: 20, 
        lng: 0, 
        label: 'Various Locations', 
        color: '#6b7280' 
      });
    }
    
    console.log('📍 Generated locations:', locations);
    return locations;
  };

  const locations = getLocations();
  const center = locations.length > 0 ? [locations[0].lat, locations[0].lng] : [20, 0];

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">🗺️ Geographic Distribution</h3>
      <p className="text-gray-600 mb-4">{distribution || 'Distribution information not available'}</p>
      
      <div 
        className="rounded-xl overflow-hidden shadow-lg border-4 border-purple-200" 
        style={{ height: '450px', width: '100%' }}
      >
        <MapContainer
          center={center}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((loc, i) => (
            <CircleMarker
              key={i}
              center={[loc.lat, loc.lng]}
              radius={15}
              fillColor={loc.color}
              color="#ffffff"
              weight={3}
              fillOpacity={0.7}
            >
              <Popup>
                <div className="text-center p-2">
                  <strong className="text-lg">{animalName}</strong>
                  <br />
                  <span className="text-sm text-gray-600">{loc.label}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">Africa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm">Asia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">Americas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <span className="text-sm">Europe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
          <span className="text-sm">Oceans</span>
        </div>
      </div>
    </div>
  );
};

export default DistributionMap;