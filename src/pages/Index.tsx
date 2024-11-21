import { useState } from "react";
import { MapPin, Calendar, Search, UserPlus, User, Users, Building, MessageSquare } from "lucide-react";
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

  // Mock data for professionals
  const nearbyProfessionals = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Family Medicine", availability: "Today" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrics", availability: "Tomorrow" },
    { id: 3, name: "Dr. Emily Williams", specialty: "Dentistry", availability: "Today" },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-primary to-background">
      <main className="h-full container mx-auto px-4 py-4 flex flex-col gap-4">
        {/* Top Section - Header and Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              whereis
            </h1>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Button>
              <Button variant="outline" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
              <Button variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                For Professionals
              </Button>
              <Button variant="outline" className="gap-2">
                <Building className="w-4 h-4" />
                For Clinics
              </Button>
            </div>
          </div>

          {/* AI Chat Window */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare className="w-6 h-6 text-muted-foreground" />
              <div className="flex-1 relative">
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
                className="bg-success hover:bg-success/90 h-14 px-8 text-lg"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Middle Section - Available Slots */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 glass-card rounded-xl p-4 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Available Healthcare Professionals</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Showing nearest available</span>
            </div>
          </div>
          <div className="space-y-3">
            {nearbyProfessionals.map((professional) => (
              <div key={professional.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
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
                  className="bg-success hover:bg-success/90 text-white"
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section - Map */}
        <div className="h-[300px] glass-card rounded-xl p-4 overflow-hidden">
          <h2 className="text-lg font-semibold mb-3">Emergency Slots Nearby</h2>
          <div className="h-full">
            <EmergencyMap />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;