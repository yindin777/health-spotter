import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

const VoiceSearch = ({ onResult }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice Search Unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast({
        title: "Error",
        description: "There was an error with voice recognition. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={startListening}
      className={`transition-colors ${isListening ? 'bg-primary text-primary-foreground' : ''}`}
    >
      {isListening ? <Mic className="h-4 w-4 animate-pulse" /> : <MicOff className="h-4 w-4" />}
    </Button>
  );
};

export default VoiceSearch;