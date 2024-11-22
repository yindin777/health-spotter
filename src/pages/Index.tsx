import { Search, User, UserPlus, Users, Building, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import EmergencyMap from "@/components/EmergencyMap";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import VoiceSearch from "@/components/VoiceSearch";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [useAI, setUseAI] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (useAI) {
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

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text);
    if (useAI) {
      toast({
        title: "Voice Query Received",
        description: "Processing your voice query with AI...",
      });
    }
  };

  const nearbyProfessionals = [
    { name: "Dr. Sarah Johnson", specialty: "Family Medicine", availability: "Today" },
    { name: "Dr. Michael Chen", specialty: "Pediatrics", availability: "Tomorrow" },
    { name: "Dr. Emily Williams", specialty: "Dentistry", availability: "Today" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-background">
      <main className="container mx-auto px-4 py-2">
        <div className="h-[10vh] flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">whereis</h1>
          
          <div className="glass-card rounded-2xl p-4 mb-4 w-[80%] mx-auto">
            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={useAI ? "Ask me about finding healthcare providers..." : "Search for healthcare providers..."}
                  className="pl-10 h-14 text-lg w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <Switch
                    checked={useAI}
                    onCheckedChange={setUseAI}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                <VoiceSearch onResult={handleVoiceResult} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 mb-4 w-[80%] mx-auto">
          <h2 className="text-xl font-semibold mb-3">Emergency Slots Nearby</h2>
          <EmergencyMap />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4 mb-4 w-[80%] mx-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Healthcare Professionals</h2>
          </div>
          <div className="space-y-3">
            {nearbyProfessionals.map((professional, index) => (
              <ProfessionalCard key={index} professional={professional} />
            ))}
          </div>
        </motion.div>

        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t p-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-5 w-5" /> Sign In
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <UserPlus className="h-5 w-5" /> Sign Up
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" /> For Professionals
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Building className="h-5 w-5" /> For Clinics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;