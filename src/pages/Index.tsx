import { useState } from "react";
import { MapPin, Calendar, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import EmergencyMap from "@/components/EmergencyMap";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  
  const handleSearch = () => {
    toast({
      title: "Searching nearby providers",
      description: "Finding available appointments in your area...",
    });
  };

  const handleAuth = () => {
    if (!firstName || !lastName) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your first and last name",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Verification Sent",
      description: "Please check your email or phone for verification code",
    });
  };

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
          <div className="glass-card rounded-2xl p-4">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for doctors, specialists, clinics..."
                  className="w-full pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-success hover:bg-success/90"
              >
                <Search className="w-4 h-4 mr-2" />
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

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-4 flex-shrink-0"
          >
            <h2 className="text-lg font-semibold mb-3">Quick Authentication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="First Name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                placeholder="Last Name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email (Optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="Phone (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button onClick={handleAuth} className="w-full md:w-auto">
              <User className="w-4 h-4 mr-2" />
              Verify Identity
            </Button>
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