import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const pairs = [
  { expectation: "🏆 Success", reality: "📱 Phone charge 5%" },
  { expectation: "💪 Gym jaana", reality: "🛋️ Sofa se uthna" },
  { expectation: "📚 Padhai", reality: "📺 Netflix marathon" },
  { expectation: "💰 Salary", reality: "💸 EMI + UPI" },
  { expectation: "😴 8 hours sleep", reality: "📱 Reel dekha 3 baje tak" },
  { expectation: "🍎 Healthy diet", reality: "🍕 Cheese burst pizza" },
  { expectation: "👔 Professional meeting", reality: "🩳 Zoom mein bermuda pehna" },
  { expectation: "🏃 Morning jog", reality: "⏰ Alarm snooze 7 baar" },
  { expectation: "📖 1 chapter padhunga", reality: "🎮 BGMI khela 4 ghante" },
  { expectation: "💑 Relationship goals", reality: "🧍 Single since birth" },
  { expectation: "🌴 Beach vacation", reality: "🚿 Bathroom mein gaana gaana" },
  { expectation: "🎯 Life goals clear", reality: "🤷 Aaj ka dinner kya hai?" },
  { expectation: "🧘 Mental peace", reality: "🧠 Overthinking at 2 AM" },
  { expectation: "📝 To-do list complete", reality: "📋 List banana hi to-do hai" },
  { expectation: "🎉 Weekend plans", reality: "😴 Sleep, eat, repeat" },
];

interface ExpectationRealityProps {
  onBack: () => void;
}

export const ExpectationReality = ({ onBack }: ExpectationRealityProps) => {
  const [currentPair, setCurrentPair] = useState(pairs[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReality, setShowReality] = useState(false);
  const { playSound } = useSoundEffects();

  const generate = () => {
    playSound('pop');
    setIsAnimating(true);
    setShowReality(false);
    
    const newPair = pairs[Math.floor(Math.random() * pairs.length)];
    setCurrentPair(newPair);

    setTimeout(() => {
      playSound('tada');
      setShowReality(true);
      setIsAnimating(false);
    }, 1000);

    setTimeout(() => {
      playSound('fail');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
          <div className="text-5xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Expectation vs Reality
          </h2>

          <div className="grid gap-4 mb-8">
            <div className={`bg-secondary/20 rounded-2xl p-6 border-2 border-black transition-all ${isAnimating ? 'animate-shake' : ''}`}>
              <p className="text-sm text-muted-foreground mb-2">Expectation ✨</p>
              <p className="text-2xl font-bold text-secondary-foreground">
                {currentPair.expectation}
              </p>
            </div>

            <div className="text-3xl">⬇️</div>

            <div className={`bg-destructive/20 rounded-2xl p-6 border-2 border-black transition-all ${showReality ? 'animate-fade-in' : 'opacity-50'}`}>
              <p className="text-sm text-muted-foreground mb-2">Reality 😭</p>
              <p className="text-2xl font-bold text-foreground">
                {showReality ? currentPair.reality : "???"}
              </p>
            </div>
          </div>

          <Button
            onClick={generate}
            disabled={isAnimating}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
          >
            <RefreshCw className={`mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
            Generate New 🎲
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            *100% relatable, 100% sad, 100% true 🥲
          </p>
        </div>
      </div>
    </div>
  );
};
