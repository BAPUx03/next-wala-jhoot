import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, XCircle } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const responses = [
  "Ek kaam mana kiya tha 😔",
  "Instructions follow karna seekh 😤",
  "Tu wahi hai jo 'Wet Paint' bhi touch karta hai 🎨",
  "Curiosity killed the cat, aur tujhe bhi kuch hoga 🐱",
  "Mummy ne bhi mana kiya hota toh nahi maanta 👩",
  "Button ka dil tod diya tune 💔",
  "Ab dekh kya ukhad liya? 🤷",
  "Congratulations, you played yourself 🤡",
  "Trust issues: +100 📈",
  "Itna rebellious bhi mat ban 😎",
];

const warningMessages = [
  "SERIOUSLY DON'T ❌",
  "Mat kar yaar 😩",
  "Please, I'm begging 🙏",
  "Last warning ⚠️",
  "You're about to make a mistake 😬",
];

interface DontClickButtonProps {
  onBack: () => void;
}

export const DontClickButton = ({ onBack }: DontClickButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [currentWarning, setCurrentWarning] = useState(0);
  const [response, setResponse] = useState('');
  const { playSound } = useSoundEffects();

  const handleHover = () => {
    if (!clicked) {
      setHoverCount(prev => prev + 1);
      setCurrentWarning((prev) => (prev + 1) % warningMessages.length);
      if (hoverCount % 3 === 0) {
        playSound('honk');
      }
    }
  };

  const handleClick = () => {
    if (!clicked) {
      playSound('fail');
      setResponse(responses[Math.floor(Math.random() * responses.length)]);
      setClicked(true);
    }
  };

  const reset = () => {
    setClicked(false);
    setHoverCount(0);
    setResponse('');
    playSound('boing');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
          {!clicked ? (
            <>
              <div className="text-6xl mb-4 animate-shake">⚠️</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {warningMessages[currentWarning]}
              </h2>
              <p className="text-muted-foreground mb-8">
                (Hover count: {hoverCount} 👀)
              </p>

              <button
                onClick={handleClick}
                onMouseEnter={handleHover}
                className="relative w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-8 text-2xl rounded-2xl border-4 border-black shadow-brutal hover:shadow-none transition-all animate-pulse"
              >
                <XCircle className="inline mr-2" size={28} />
                DON'T CLICK ❌
              </button>

              <p className="text-sm text-muted-foreground mt-6">
                Main serious hoon, mat click kar 😤
              </p>
            </>
          ) : (
            <>
              <div className="text-7xl mb-4 animate-bounce">😔</div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Kar diya na click...
              </h2>
              <div className="bg-destructive/20 rounded-2xl p-6 mb-6 border-2 border-black">
                <p className="text-xl font-bold text-foreground">
                  {response}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                You were warned {hoverCount} times 🤦
              </p>
              <Button
                onClick={reset}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 border-4 border-black shadow-brutal"
              >
                Phir Se Galti Kar 🔄
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
