import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngTuple } from 'leaflet';
import { useNavigate } from 'react-router-dom';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface Location {
  position: LatLngTuple;
  name: string;
  id: string;
}

const EmergencyMap = () => {
  const navigate = useNavigate();
  const center: LatLngTuple = [40.7128, -74.0060];
  
  const emergencyLocations: Location[] = [
    { position: [40.7128, -74.0060], name: "Downtown Emergency Clinic", id: "1" },
    { position: [40.7580, -73.9855], name: "Midtown Medical Center", id: "2" }
  ];

  const handleMarkerClick = (id: string) => {
    navigate(`/professional/${id}`);
  };

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      scrollWheelZoom={false}
      className="w-full h-[70vh] md:h-[400px] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {emergencyLocations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.position}
          icon={defaultIcon}
          eventHandlers={{
            click: () => handleMarkerClick(location.id)
          }}
        >
          <Popup>
            <div className="text-lg font-medium">
              {location.name}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EmergencyMap;