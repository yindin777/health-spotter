import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { useToast } from '@/components/ui/use-toast';
import 'leaflet/dist/leaflet.css';

const EmergencyMap = () => {
  const { toast } = useToast();
  const defaultCenter: LatLngExpression = [51.505, -0.09];

  const emergencyLocations = [
    { id: 1, position: [51.505, -0.09] as LatLngExpression, name: "Emergency Center A" },
    { id: 2, position: [51.51, -0.1] as LatLngExpression, name: "Emergency Center B" },
  ];

  const handleMarkerClick = (id: number) => {
    toast({
      title: "Emergency Location Selected",
      description: `Viewing details for location ${id}`,
    });
  };

  return (
    <div style={{ height: '300px', width: '100%', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <MapContainer 
        style={{ height: '100%', width: '100%' }}
        center={defaultCenter}
        zoom={13} 
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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