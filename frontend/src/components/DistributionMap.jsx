import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DistributionMap = ({ animalName, distribution }) => {
  const getLocations = () => {
    const locations = [];
    const dist = distribution?.toLowerCase() || '';
    
    if (dist.includes('africa')) {
      locations.push({ lat: -1.286389, lng: 36.817223, label: 'Africa', color: '#22c55e' });
    }
    
    if (dist.includes('asia') || dist.includes('india')) {
      locations.push({ lat: 20.593684, lng: 78.962880, label: 'Asia', color: '#ef4444' });
    }
    
    if (dist.includes('america')) {
      locations.push({ lat: 37.09024, lng: -95.712891, label: 'Americas', color: '#3b82f6' });
    }
    
    if (dist.includes('ocean') || dist.includes('worldwide')) {
      locations.push({ lat: 0, lng: 0, label: 'Worldwide', color: '#06b6d4' });
    }
    
    if (locations.length === 0) {
      locations.push({ lat: 20, lng: 0, label: 'Various', color: '#6b7280' });
    }
    
    return locations;
  };

  const locations = getLocations();

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-4">🗺️ Geographic Distribution</h3>
      <p className="text-gray-600 mb-4">{distribution || 'Distribution information not available'}</p>
      
      <div className="rounded-xl overflow-hidden shadow-lg" style={{ height: '400px' }}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((loc, i) => (
            <CircleMarker
              key={i}
              center={[loc.lat, loc.lng]}
              radius={15}
              fillColor={loc.color}
              color="#fff"
              weight={2}
              fillOpacity={0.7}
            >
              <Popup>
                <strong>{animalName}</strong><br />{loc.label}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DistributionMap;