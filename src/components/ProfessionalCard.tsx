import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Professional {
  name: string;
  specialty: string;
  availability: string;
}

export const ProfessionalCard = ({ professional }: { professional: Professional }) => {
  const { toast } = useToast();

  const handleBooking = (name: string) => {
    toast({
      title: "Booking Appointment",
      description: `Initiating booking process with ${name}...`,
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-foreground">{professional.name}</h3>
        <p className="text-sm text-muted-foreground">{professional.specialty}</p>
        <p className="text-sm text-success">Available {professional.availability}</p>
      </div>
      <Button
        onClick={() => handleBooking(professional.name)}
        className="w-full text-sm py-2"
        size="sm"
      >
        Book Now
      </Button>
    </div>
  );
};