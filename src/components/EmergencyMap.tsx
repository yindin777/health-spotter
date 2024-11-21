import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon in react-leaflet
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const EmergencyMap = () => {
  // Example coordinates (can be updated based on user's location)
  const position: [number, number] = [40.7128, -74.0060];
  const emergencyLocations = [
    { position: [40.7128, -74.0060], name: "Downtown Emergency Clinic" },
    { position: [40.7580, -73.9855], name: "Midtown Medical Center" }
  ];

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: "300px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {emergencyLocations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.position as [number, number]}
          icon={icon}
        >
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EmergencyMap;