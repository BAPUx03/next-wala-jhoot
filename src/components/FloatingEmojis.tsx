import { useEffect, useState } from 'react';

const emojis = ['😂', '🤡', '😤', '😴', '🔥', '💀', '🫠', '😭', '🤣', '😈'];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export const FloatingEmojis = () => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji: FloatingEmoji = {
        id: Date.now(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      
      setFloatingEmojis(prev => [...prev.slice(-10), newEmoji]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingEmojis.map((item) => (
        <div
          key={item.id}
          className="absolute text-4xl animate-float-up opacity-60"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};
