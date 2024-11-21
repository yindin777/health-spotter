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

const Header = () => (
  <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
    <h1 className="text-4xl md:text-6xl font-bold text-foreground">whereis</h1>
    <div className="flex gap-3 flex-wrap">
      <Button variant="outline" size="lg" className="gap-2 text-lg py-6">
        <User className="w-6 h-6" />
        Sign In
      </Button>
      <Button variant="outline" size="lg" className="gap-2 text-lg py-6">
        <UserPlus className="w-6 h-6" />
        Sign Up
      </Button>
      <Button variant="outline" size="lg" className="gap-2 text-lg py-6">
        <Users className="w-6 h-6" />
        For Professionals
      </Button>
      <Button variant="outline" size="lg" className="gap-2 text-lg py-6">
        <Building className="w-6 h-6" />
        For Clinics
      </Button>
    </div>
  </div>
);

const SearchBar = ({ searchQuery, setSearchQuery, useAI, setUseAI, handleSearch, handleVoiceResult }) => (
  <div className="glass-card rounded-2xl p-6 mb-8">
    <motion.div className="flex flex-col gap-4" layout>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <span className="text-xl font-medium">AI Assistant</span>
          <Switch checked={useAI} onCheckedChange={setUseAI} className="ml-2" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <Input
            type="text"
            placeholder={useAI ? "Ask me about finding healthcare providers..." : "Search for healthcare providers..."}
            className="w-full pl-12 pr-4 h-14 text-lg rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <VoiceSearch onResult={handleVoiceResult} />
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg">
          Search
        </Button>
      </div>
    </motion.div>
  </div>
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
    <div className="min-h-screen bg-gradient-to-b from-primary to-background">
      <main className="container mx-auto px-4 py-6 flex flex-col">
        <Header />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          useAI={useAI}
          setUseAI={setUseAI}
          handleSearch={handleSearch}
          handleVoiceResult={handleVoiceResult}
        />
        
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Emergency Slots Nearby</h2>
          <EmergencyMap />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Available Healthcare Professionals</h2>
          </div>
          <div className="space-y-4">
            {nearbyProfessionals.map((professional, index) => (
              <ProfessionalCard key={index} professional={professional} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;