import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const funnyLoadingMessages = [
  "Gift wrap ho raha hai... 🎁",
  "Ribbon baandh rahe hain... 🎀",
  "Glitter daal rahe hain... ✨",
  "Confetti ready kar rahe hain... 🎊",
  "Cake ka photo dhundh rahe hain... 🎂",
  "Birthday song tune kar rahe hain... 🎵",
  "Surprise element add ho raha hai... 🤫",
  "Magic chhodh rahe hain... 🪄",
  "Extra special bana rahe hain... 💫",
  "Bas thoda sa aur... 🔥",
];

interface GiftLoadingBarProps {
  onComplete: () => void;
  loadDuration?: number;
}

export const GiftLoadingBar = ({ onComplete, loadDuration = 3000 }: GiftLoadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, loadDuration / 50);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyLoadingMessages.length);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [loadDuration, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-in">
      <div className="bg-card border-4 border-black rounded-2xl p-6 shadow-brutal">
        <div className="text-center mb-4">
          <span className="text-5xl animate-bounce inline-block">🎁</span>
        </div>
        <Progress value={progress} className="h-4 border-2 border-black" />
        <p className="text-center mt-4 font-bold text-foreground text-lg min-h-[28px]">
          {funnyLoadingMessages[messageIndex]}
        </p>
        <p className="text-center text-muted-foreground text-sm mt-2">
          {progress}% complete
        </p>
      </div>
    </div>
  );
};
