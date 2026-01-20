import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const predictions = [
  "Kal bhi wahi routine chalega 😌",
  "Success ayega... lekin OTP late ayega 📩",
  "Aaj nahi toh kal, kal nahi toh parso... basically never 🙃",
  "Gym membership renew hogi, gym nahi jayega 💪",
  "Diet kal se shuru, roz kal se 🍕",
  "Alarm 6 baje ka, uthega 9 baje 😴",
  "Savings plan banayega, Zomato kholega 🍔",
  "Crush reply karegi... galti se 📱",
  "Promotion milegi... next company mein 🏃",
  "Life sorted hogi... next janam mein 🔄",
  "Weekend productive hoga... Netflix dekhne mein 📺",
  "New Year resolution strong rahega... 3 din tak 💪",
  "Appraisal acha ayega... manager ke sapne mein 😂",
  "Lottery lagegi... 10 rupaye ki 🎰",
  "Viral hoga... fever se 🤒",
];

interface FuturePredictorProps {
  onBack: () => void;
}

export const FuturePredictor = ({ onBack }: FuturePredictorProps) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { playSound } = useSoundEffects();

  const handlePredict = () => {
    if (!name.trim()) return;
    
    playSound('suspense');
    setIsLoading(true);

    setTimeout(() => {
      setPrediction(predictions[Math.floor(Math.random() * predictions.length)]);
      setShowResult(true);
      setIsLoading(false);
      playSound('tada');
    }, 2500);
  };

  const reset = () => {
    setName('');
    setAge('');
    setShowResult(false);
    setPrediction('');
    playSound('pop');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        {!showResult && !isLoading ? (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-6">
              <span className="text-6xl">🔮</span>
              <h2 className="text-3xl font-bold text-foreground mt-4">
                Future Predictor
              </h2>
              <p className="text-muted-foreground mt-2">
                (100% accurate, 0% useful 😏)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Tera Naam</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Naam likh..."
                  className="border-4 border-black text-lg py-5"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Umar (optional)</label>
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age..."
                  type="number"
                  className="border-4 border-black text-lg py-5"
                />
              </div>

              <Button
                onClick={handlePredict}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
              >
                <Sparkles className="mr-2" />
                Future Dekho ✨
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-7xl animate-bounce mb-4">🔮</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cosmic forces connect ho rahe hain...
            </h2>
            <div className="space-y-2 text-muted-foreground">
              <p className="animate-pulse">⭐ Stars align ho rahe hain...</p>
              <p className="animate-pulse" style={{ animationDelay: '0.2s' }}>🌙 Moon se permission le rahe hain...</p>
              <p className="animate-pulse" style={{ animationDelay: '0.4s' }}>🌌 Universe se data fetch ho raha hai...</p>
            </div>
          </div>
        ) : (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-6xl mb-4">🔮</div>
            <h2 className="text-xl font-bold text-muted-foreground mb-2">
              {name} ka Future Update:
            </h2>
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6 mb-6 border-2 border-black">
              <p className="text-2xl font-bold text-foreground">
                "{prediction}"
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              *Yeh prediction 100% bakwaas hai 🤡
            </p>
            <Button
              onClick={reset}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 border-4 border-black shadow-brutal"
            >
              Naya Future Dekho 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
