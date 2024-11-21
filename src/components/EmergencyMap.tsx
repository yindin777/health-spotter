import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { useNavigate } from 'react-router-dom';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Location {
  position: LatLngTuple;
  name: string;
  id: string;
}

const EmergencyMap = () => {
  const navigate = useNavigate();
  const defaultPosition: LatLngTuple = [40.7128, -74.0060];
  
  const emergencyLocations: Location[] = [
    { position: [40.7128, -74.0060], name: "Downtown Emergency Clinic", id: "1" },
    { position: [40.7589, -73.9851], name: "Midtown Medical Center", id: "2" },
    { position: [40.7549, -73.9840], name: "Emergency Care Unit", id: "3" },
  ];

  const handleMarkerClick = (id: string) => {
    navigate(`/emergency/${id}`);
  };

  return (
    <MapContainer 
      defaultCenter={defaultPosition} 
      zoom={13} 
      scrollWheelZoom={false}
      className="w-full h-[70vh] md:h-[400px] rounded-lg"
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
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EmergencyMap;