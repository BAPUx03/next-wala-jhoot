import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const lowTruthResponses = [
  "Truth detected: 3% 🤡",
  "Jhooth meter: 97% 📊",
  "Bhai, itna jhooth bhi nahi bolna tha 😂",
  "Pinocchio bhi sharma jayega 🤥",
  "Cap detected 🧢",
  "Truth: Not found in your statement 🔍",
];

const mediumTruthResponses = [
  "Half true, half cope 🤷",
  "Partial truth detected 📊",
  "50-50 situation hai 🎲",
  "Kuch sach, kuch timepass 🤔",
];

const highTruthResponses = [
  "Wow, tu actually sach bol raha hai? 😱",
  "Rare honesty detected! 🦄",
  "Exception found: Truth! 🎉",
  "Glitch in the matrix 🤖",
];

interface TruthMeterProps {
  onBack: () => void;
}

export const TruthMeter = ({ onBack }: TruthMeterProps) => {
  const [statement, setStatement] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [truthPercent, setTruthPercent] = useState(0);
  const [response, setResponse] = useState('');
  const { playSound } = useSoundEffects();

  const analyze = () => {
    if (!statement.trim()) return;

    playSound('suspense');
    setIsAnalyzing(true);

    // Always bias toward low truth for comedy
    setTimeout(() => {
      const rand = Math.random();
      let percent: number;
      let responses: string[];

      if (rand < 0.7) {
        // 70% chance of very low truth
        percent = Math.floor(Math.random() * 20);
        responses = lowTruthResponses;
      } else if (rand < 0.95) {
        // 25% chance of medium
        percent = Math.floor(Math.random() * 30) + 30;
        responses = mediumTruthResponses;
      } else {
        // 5% chance of high (rare event!)
        percent = Math.floor(Math.random() * 20) + 80;
        responses = highTruthResponses;
      }

      setTruthPercent(percent);
      setResponse(responses[Math.floor(Math.random() * responses.length)]);
      setShowResult(true);
      setIsAnalyzing(false);
      
      if (percent < 30) {
        playSound('fail');
      } else if (percent < 60) {
        playSound('hehe');
      } else {
        playSound('cheer');
      }
    }, 2500);
  };

  const reset = () => {
    setStatement('');
    setShowResult(false);
    setTruthPercent(0);
    playSound('boing');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
          {!isAnalyzing && !showResult ? (
            <>
              <div className="text-center mb-6">
                <span className="text-6xl">🔍</span>
                <h2 className="text-2xl font-bold text-foreground mt-4">
                  Truth Meter
                </h2>
                <p className="text-muted-foreground mt-2">
                  Kuch bhi likh, sach pata lagayenge 🕵️
                </p>
              </div>

              <Input
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Koi bhi statement likh..."
                className="border-4 border-black text-lg py-5 mb-4"
              />

              <Button
                onClick={analyze}
                disabled={!statement.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
              >
                <Search className="mr-2" />
                Sach Check Karo 🔎
              </Button>
            </>
          ) : isAnalyzing ? (
            <div className="text-center">
              <div className="text-6xl animate-bounce mb-4">🔬</div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Analyzing truth levels...
              </h2>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="animate-pulse">🧪 Running lie detector...</p>
                <p className="animate-pulse" style={{ animationDelay: '0.3s' }}>📊 Calculating cap percentage...</p>
                <p className="animate-pulse" style={{ animationDelay: '0.6s' }}>🤥 Consulting Pinocchio...</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">
                {truthPercent < 30 ? '🤥' : truthPercent < 60 ? '🤔' : '😇'}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                You said: "{statement}"
              </p>

              <div className="my-6">
                <p className="text-lg text-foreground mb-2">Truth Level:</p>
                <div className="text-5xl font-bold text-primary mb-4">
                  {truthPercent}%
                </div>
                <Progress 
                  value={truthPercent} 
                  className={`h-6 ${truthPercent < 30 ? 'bg-destructive/30' : truthPercent < 60 ? 'bg-primary/30' : 'bg-secondary/30'}`}
                />
              </div>

              <div className="bg-primary/20 rounded-2xl p-4 mb-6 border-2 border-black">
                <p className="text-lg font-bold text-foreground">
                  {response}
                </p>
              </div>

              <Button
                onClick={reset}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 border-4 border-black shadow-brutal"
              >
                Check Another Statement 🔄
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
