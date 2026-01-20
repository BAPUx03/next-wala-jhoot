import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const fakeStages = [
  { text: "Loading... 🔄", percent: 15 },
  { text: "Almost there... 😅", percent: 45 },
  { text: "99% Complete 😎", percent: 99 },
  { text: "Bas ek last step 🤞", percent: 99.5 },
  { text: "Promise ye wala last 🙏", percent: 99.9 },
  { text: "Ruk ja bhai 😂", percent: 99.99 },
];

const trollResponses = [
  "Itna bhi bharosa acha nahi hota 😔",
  "Abe ruk na bhai 😂",
  "Itni jaldi kya hai? 🚆",
  "Button bhi panic mein hai 😵",
  "Effort full marks 🏆, result zero",
  "Zinda hai kya? 😴",
];

interface FakeProgressProps {
  onComplete: () => void;
  clickCount: number;
}

export const FakeProgress = ({ onComplete, clickCount }: FakeProgressProps) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [showTroll, setShowTroll] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const currentStage = fakeStages[stageIndex];

  const handleClick = () => {
    setIsShaking(true);
    setShowTroll(trollResponses[Math.floor(Math.random() * trollResponses.length)]);
    
    setTimeout(() => {
      setIsShaking(false);
      setShowTroll('');
      
      if (stageIndex < fakeStages.length - 1) {
        setStageIndex(prev => prev + 1);
      } else if (clickCount > 10) {
        onComplete();
      } else {
        setStageIndex(0);
      }
    }, 1500);
  };

  return (
    <div className={`space-y-6 p-8 ${isShaking ? 'animate-shake' : ''}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">{currentStage.text}</h2>
        <Progress value={currentStage.percent} className="h-6 bg-muted" />
        <p className="text-lg text-muted-foreground">{currentStage.percent}%</p>
      </div>
      
      {showTroll && (
        <div className="text-center">
          <div className="inline-block bg-red-500 text-white px-6 py-3 rounded-xl text-xl font-bold animate-bounce border-4 border-black">
            {showTroll}
          </div>
        </div>
      )}
      
      <div className="text-center">
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold border-4 border-black shadow-brutal hover:scale-105 transition-transform"
        >
          Continue ➡️
        </button>
      </div>
    </div>
  );
};
