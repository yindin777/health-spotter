import { useState } from "react";
import { MapPin, Calendar, Search, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EmergencyMap from "@/components/EmergencyMap";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = () => {
    toast({
      title: "Searching nearby providers",
      description: "Finding available appointments in your area...",
    });
  };

  const handleBooking = (professionalName: string) => {
    toast({
      title: "Booking Appointment",
      description: `Initiating booking process with ${professionalName}...`,
    });
  };

  // Mock data for professionals - in a real app, this would come from an API
  const nearbyProfessionals = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Family Medicine", availability: "Today" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrics", availability: "Tomorrow" },
    { id: 3, name: "Dr. Emily Williams", specialty: "Dentistry", availability: "Today" },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-primary to-background">
      <main className="h-full container mx-auto px-4 py-4 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
            whereis
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Find and book healthcare professionals near you, instantly
          </p>
        </motion.div>

        <div className="flex-1 flex flex-col gap-4 max-h-full">
          {/* AI Chat-style Search Bar */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ask me about finding healthcare providers..."
                  className="w-full pl-12 pr-4 h-14 text-lg rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-success hover:bg-success/90 h-14 px-8 text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Using your current location</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Available today</span>
              </div>
            </div>
          </div>

          {/* Nearby Professionals List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-4 flex-shrink-0"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Available Healthcare Professionals</h2>
              <Button variant="outline" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
            <div className="space-y-3">
              {nearbyProfessionals.map((professional) => (
                <div key={professional.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{professional.name}</h3>
                    <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Calendar className="w-3 h-3" />
                      <span>Available {professional.availability}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBooking(professional.name)}
                    variant="outline"
                    className="bg-success hover:bg-success/90 text-white border-none"
                  >
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 glass-card rounded-xl p-4 min-h-[200px] overflow-hidden">
            <h2 className="text-lg font-semibold mb-3">Emergency Slots Nearby</h2>
            <div className="h-[300px]">
              <EmergencyMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;