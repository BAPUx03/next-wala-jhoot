import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const buttonTexts = [
  "Next 😏",
  "Pakad ke dikha 😂",
  "Almost Done 🤡",
  "Final Final Next 🙏",
  "Aaja touch kar 😈",
  "Itna paas? 👀",
  "Try again 🤭",
  "Haha missed! 💨",
];

const trollMessages = [
  "Galti se ho gaya 😅",
  "Mazak tha 😈",
  "Abhi nahi 🙅",
  "Too slow bro 🐢",
];

interface RunningButtonProps {
  onEventualSuccess: () => void;
  attemptCount: number;
  setAttemptCount: (count: number) => void;
}

export const RunningButton = ({ onEventualSuccess, attemptCount, setAttemptCount }: RunningButtonProps) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [buttonText, setButtonText] = useState(buttonTexts[0]);
  const [showTrollMessage, setShowTrollMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const runAway = useCallback(() => {
    const newX = Math.random() * 70 + 15;
    const newY = Math.random() * 60 + 20;
    const newRotation = (Math.random() - 0.5) * 60;
    const newScale = 0.5 + Math.random() * 1;
    
    setPosition({ x: newX, y: newY });
    setRotation(newRotation);
    setScale(newScale);
    setButtonText(buttonTexts[Math.floor(Math.random() * buttonTexts.length)]);
    setAttemptCount(attemptCount + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, [attemptCount, setAttemptCount]);

  const handleClick = useCallback(() => {
    // After many attempts, occasionally allow "success" but troll them
    if (attemptCount > 15 && Math.random() > 0.7) {
      setShowTrollMessage(trollMessages[Math.floor(Math.random() * trollMessages.length)]);
      setTimeout(() => {
        setShowTrollMessage('');
        if (attemptCount > 25) {
          onEventualSuccess();
        }
      }, 1500);
    } else {
      runAway();
    }
  }, [attemptCount, onEventualSuccess, runAway]);

  const handleMouseEnter = useCallback(() => {
    if (Math.random() > 0.3) {
      runAway();
    }
  }, [runAway]);

  useEffect(() => {
    // Random teleportation
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        runAway();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [runAway]);

  return (
    <div className="relative w-full h-96">
      {showTrollMessage && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-2xl font-bold animate-bounce border-4 border-black shadow-brutal">
            {showTrollMessage}
          </div>
        </div>
      )}
      
      <Button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`absolute transition-all duration-300 ease-out px-8 py-6 text-xl font-bold rounded-2xl border-4 border-black shadow-brutal bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white ${isShaking ? 'animate-shake' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        }}
      >
        {buttonText}
      </Button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg font-bold text-muted-foreground">
        Attempts: {attemptCount} 🎯
      </div>
    </div>
  );
};
