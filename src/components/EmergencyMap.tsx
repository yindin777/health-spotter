import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useToast } from '@/components/ui/use-toast';

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
        center={defaultCenter}
        zoom={13} 
        scrollWheelZoom={false}
        className="w-full h-full"
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
    </div>
  );
};

export default EmergencyMap;