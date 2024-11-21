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

const SearchBar = ({ searchQuery, setSearchQuery, useAI, setUseAI, handleSearch, handleVoiceResult }) => (
  <div className="glass-card rounded-2xl p-4">
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder={useAI ? "Ask me about finding healthcare providers..." : "Search for healthcare providers..."}
          className="w-full pl-10 pr-4 h-12 text-base rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={useAI} onCheckedChange={setUseAI} size="sm" />
        <VoiceSearch onResult={handleVoiceResult} />
      </div>
    </div>
  </div>
);

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
    <div className="flex justify-around items-center max-w-screen-xl mx-auto">
      <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
        <User className="w-6 h-6" />
        <span className="text-xs">Sign In</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
        <UserPlus className="w-6 h-6" />
        <span className="text-xs">Sign Up</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
        <Users className="w-6 h-6" />
        <span className="text-xs">Professionals</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
        <Building className="w-6 h-6" />
        <span className="text-xs">Clinics</span>
      </Button>
    </div>
  </nav>
);

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
    <div className="min-h-screen bg-gradient-to-b from-primary to-background pb-24">
      <main className="container mx-auto px-4 py-4 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">whereis</h1>
        
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          useAI={useAI}
          setUseAI={setUseAI}
          handleSearch={handleSearch}
          handleVoiceResult={handleVoiceResult}
        />
        
        <div className="glass-card rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3">Emergency Slots Nearby</h2>
          <EmergencyMap />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4"
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
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;