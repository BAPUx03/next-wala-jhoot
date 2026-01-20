import { useEffect, useState } from 'react';

interface ConfettiEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
}

interface BirthdayConfettiProps {
  emojiList: string[];
  count?: number;
}

export const BirthdayConfetti = ({ emojiList, count = 30 }: BirthdayConfettiProps) => {
  const [confetti, setConfetti] = useState<ConfettiEmoji[]>([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(newConfetti);
  }, [emojiList, count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute text-4xl animate-float-up"
          style={{
            left: `${item.left}%`,
            bottom: '-50px',
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};
