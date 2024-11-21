import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Fix for default marker icon in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface Location {
  position: LatLngExpression;
  name: string;
  id: string;
}

const EmergencyMap = () => {
  const navigate = useNavigate();
  const defaultPosition: LatLngExpression = [40.7128, -74.0060];
  
  const emergencyLocations: Location[] = [
    { position: [40.7128, -74.0060], name: "Downtown Emergency Clinic", id: "1" },
    { position: [40.7580, -73.9855], name: "Midtown Medical Center", id: "2" }
  ];

  const handleMarkerClick = (id: string) => {
    navigate(`/professional/${id}`);
  };

  return (
    <MapContainer 
      center={defaultPosition} 
      zoom={13} 
      scrollWheelZoom={false}
      className="w-full h-full rounded-lg"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {emergencyLocations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.position}
          eventHandlers={{
            click: () => handleMarkerClick(location.id)
          }}
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