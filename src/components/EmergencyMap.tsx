import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useToast } from '@/components/ui/use-toast';
import 'leaflet/dist/leaflet.css';

const EmergencyMap = () => {
  const { toast } = useToast();
  const defaultCenter: LatLngTuple = [51.505, -0.09];

  const emergencyLocations = [
    { id: 1, position: [51.505, -0.09] as LatLngTuple, name: "Emergency Center A" },
    { id: 2, position: [51.51, -0.1] as LatLngTuple, name: "Emergency Center B" },
  ];

  const handleMarkerClick = (id: number) => {
    toast({
      title: "Emergency Location Selected",
      description: `Viewing details for location ${id}`,
    });
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={defaultCenter}
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {emergencyLocations.map((location) => (
          <Marker 
            key={location.id}
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
    </div>
  );
};

export default EmergencyMap;