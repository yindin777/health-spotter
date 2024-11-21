import { useState } from "react";
import { MapPin, Calendar, Search, Mic, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = () => {
    toast({
      title: "Searching nearby providers",
      description: "Finding available appointments in your area...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-background">
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            whereis
          </h1>
          <p className="text-lg text-muted-foreground">
            Find and book healthcare professionals near you, instantly
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
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

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Using your current location</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Available today</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Emergency Slots</h2>
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-warning">New slot available!</p>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - 2:30 PM</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      <Clock className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl overflow-hidden h-[400px] mb-8 glass-card"
          >
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map showing nearby available slots</p>
              {/* Map integration will be added here */}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;