import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const roasts = [
  "Mirror kharab hai, par problem wahi hai 🤡",
  "Camera quality low hai, aur bhi acha hai warna... 😏",
  "Bhai tu hai ya tera reflection? Dono mein farak nahi 😂",
  "Filter lagao, thoda kam dikh jayega 📸",
  "Selfie mat le, phone ki feelings bhi hoti hain 📱",
  "Sach batau? Teri photo phone ki storage mein count nahi hoti 🗑️",
  "Tu camera-friendly nahi hai, camera tera dost nahi hai 🙅",
  "Dekh, mujhse jhooth nahi bola jaata... 🪞",
  "Error 404: Good looks not found 🔍",
  "Loading... loading... still loading your best angle 🔄",
];

interface MirrorModeProps {
  onBack: () => void;
}

export const MirrorMode = ({ onBack }: MirrorModeProps) => {
  const [stage, setStage] = useState<'intro' | 'loading' | 'result'>('intro');
  const [loadingText, setLoadingText] = useState('');
  const [roast, setRoast] = useState('');
  const { playSound } = useSoundEffects();

  const loadingTexts = [
    "Camera initializing... 📸",
    "Finding your best angle... 🔍",
    "Applying reality filter... 🎭",
    "Consulting with the mirror... 🪞",
    "Preparing the truth... 😈",
  ];

  const handleStart = () => {
    playSound('pop');
    setStage('loading');
    
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingTexts[index]);
      playSound('pop');
      index++;
      
      if (index >= loadingTexts.length) {
        clearInterval(interval);
        setTimeout(() => {
          setRoast(roasts[Math.floor(Math.random() * roasts.length)]);
          setStage('result');
          playSound('fail');
        }, 500);
      }
    }, 800);
  };

  const reset = () => {
    setStage('intro');
    setRoast('');
    playSound('boing');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        {stage === 'intro' && (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-7xl mb-4">🪞</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Mirror Mode
            </h2>
            <p className="text-muted-foreground mb-8">
              Sach dekhna hai? 😈
              <br />
              <span className="text-sm">(Warning: Feelings hurt ho sakti hain)</span>
            </p>
            
            <Button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-primary to-destructive text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
            >
              <Camera className="mr-2" />
              Sach Dikha! 👁️
            </Button>
          </div>
        )}

        {stage === 'loading' && (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="relative w-48 h-48 mx-auto mb-6 bg-muted rounded-2xl border-4 border-black overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera size={64} className="text-muted-foreground animate-bounce" />
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-destructive text-destructive-foreground text-xs py-1 px-2 rounded font-bold">
                🔴 LIVE
              </div>
            </div>
            <p className="text-xl font-bold text-foreground animate-pulse">
              {loadingText}
            </p>
          </div>
        )}

        {stage === 'result' && (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-7xl mb-4 animate-shake">😱</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Mirror Says:
            </h2>
            <div className="bg-destructive/20 rounded-2xl p-6 mb-6 border-2 border-black">
              <p className="text-xl font-bold text-foreground">
                {roast}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              *No camera was harmed, but your ego might be 💀
            </p>
            <div className="space-y-3">
              <Button
                onClick={reset}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 border-4 border-black shadow-brutal"
              >
                Phir Se Dekho 🔄
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full border-4 border-black font-bold py-4"
              >
                Bahut Ho Gaya 😭
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
