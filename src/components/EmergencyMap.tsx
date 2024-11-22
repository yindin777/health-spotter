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
      title: "Emergency Slot Selected",
      description: `You've selected emergency location ${id}. Redirecting to booking...`,
    });
  };

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <MapContainer 
        className="w-full h-full"
        zoom={13} 
        scrollWheelZoom={false}
        center={defaultCenter}
      >
        <TileLayer
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