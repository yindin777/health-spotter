import { useState } from "react";
import { MapPin, Calendar, Search, Mic } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
            Healthcare, On-Demand
          </h1>
          <p className="text-lg text-muted-foreground">
            Find and book healthcare professionals near you, instantly
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for doctors, specialists, clinics..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Mic className="text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
              <button className="bg-success text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-success/90 transition-colors">
                <Search className="w-4 h-4" />
                Search
              </button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Emergency Slots</h2>
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm font-medium text-warning">New slot available!</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - 2:30 PM</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  "Hey! I can help you find and book appointments. Just ask me anything!"
                </p>
              </div>
              <button className="w-full mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Start Conversation
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;