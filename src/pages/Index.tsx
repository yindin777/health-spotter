import { useState } from "react";
import { MapPin, Calendar, Search, UserPlus, User, Users, Building, MessageSquare, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EmergencyMap from "@/components/EmergencyMap";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = () => {
    if (useAI) {
      setIsExpanded(true);
      toast({
        title: "AI Search",
        description: "Processing your query with AI...",
      });
    } else {
      toast({
        title: "Searching nearby providers",
        description: "Finding available appointments in your area...",
      });
    }
  };

  const handleBooking = (professionalName: string) => {
    toast({
      title: "Booking Appointment",
      description: `Initiating booking process with ${professionalName}...`,
    });
  };

  const nearbyProfessionals = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Family Medicine", availability: "Today" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrics", availability: "Tomorrow" },
    { id: 3, name: "Dr. Emily Williams", specialty: "Dentistry", availability: "Today" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-background">
      <main className="container mx-auto px-4 py-4 flex flex-col gap-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              whereis
            </h1>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                For Professionals
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Building className="w-4 h-4" />
                For Clinics
              </Button>
            </div>
          </div>

          {/* AI Search Section */}
          <div className="glass-card rounded-2xl p-4 md:p-6">
            <AnimatePresence>
              <motion.div 
                className="flex flex-col gap-4"
                layout
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <span className="text-sm font-medium">AI Assistant</span>
                    <Switch
                      checked={useAI}
                      onCheckedChange={setUseAI}
                      className="ml-2"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-6 h-6 text-muted-foreground hidden md:block" />
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={useAI ? "Ask me about finding healthcare providers..." : "Search for healthcare providers..."}
                      className="w-full pl-12 pr-4 h-12 text-lg rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="bg-primary hover:bg-primary/90 h-12 px-6 text-lg"
                  >
                    Search
                  </Button>
                </div>
                {isExpanded && useAI && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/50 rounded-lg p-4 mt-4"
                  >
                    <p className="text-muted-foreground">AI is processing your request...</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Map Section - Now First */}
        <div className="glass-card rounded-xl p-4 h-[40vh]">
          <h2 className="text-lg font-semibold mb-3">Emergency Slots Nearby</h2>
          <div className="h-[calc(100%-2rem)]">
            <EmergencyMap />
          </div>
        </div>

        {/* Professionals List - Now Second */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4"
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
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;