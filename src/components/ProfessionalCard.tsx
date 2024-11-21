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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white/50 rounded-lg hover:bg-white/70 transition-colors gap-4">
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-medium text-foreground">{professional.name}</h3>
        <p className="text-lg md:text-xl text-muted-foreground">{professional.specialty}</p>
        <div className="flex items-center gap-2 text-success text-lg">
          <span>Available {professional.availability}</span>
        </div>
      </div>
      <Button
        onClick={() => handleBooking(professional.name)}
        className="w-full md:w-auto text-lg py-6 px-8"
      >
        Book Now
      </Button>
    </div>
  );
};