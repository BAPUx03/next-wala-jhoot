import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const memes = [
  { emoji: "🤡", text: "Kya kar raha hai bhai?" },
  { emoji: "💀", text: "Ded" },
  { emoji: "😭", text: "Rula diya" },
  { emoji: "🫡", text: "Respect++" },
  { emoji: "🔥", text: "Fire hai bhai" },
  { emoji: "😏", text: "Dekh raha hai na?" },
  { emoji: "🤣", text: "ROFL" },
  { emoji: "👀", text: "Sus detected" },
  { emoji: "🙈", text: "Galti se mistake" },
  { emoji: "😎", text: "Chad move" },
];

interface MemePopupData {
  id: number;
  emoji: string;
  text: string;
  x: number;
  y: number;
}

interface MemeContextType {
  triggerMeme: () => void;
}

const MemeContext = createContext<MemeContextType | null>(null);

export const useMemePopup = () => {
  const context = useContext(MemeContext);
  if (!context) {
    return { triggerMeme: () => {} };
  }
  return context;
};

export const MemePopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [popups, setPopups] = useState<MemePopupData[]>([]);
  const [lastTrigger, setLastTrigger] = useState(0);

  const triggerMeme = useCallback(() => {
    // Rate limit: max 1 meme per 10 seconds
    const now = Date.now();
    if (now - lastTrigger < 10000) return;
    
    // Only 5% chance to actually show
    if (Math.random() > 0.05) return;

    setLastTrigger(now);
    const meme = memes[Math.floor(Math.random() * memes.length)];
    const id = now + Math.random();
    
    // Random position on screen (safe area)
    const x = Math.min(Math.max(50, Math.random() * (window.innerWidth - 250)), window.innerWidth - 250);
    const y = Math.min(Math.max(100, Math.random() * (window.innerHeight - 200)), window.innerHeight - 200);

    setPopups(prev => [...prev, { ...meme, id, x, y }]);

    // Remove after animation
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== id));
    }, 2000);
  }, [lastTrigger]);

  // Very rare random meme (every 2-5 minutes)
  useEffect(() => {
    const randomInterval = () => Math.random() * 180000 + 120000; // 2-5 min
    let timeout: NodeJS.Timeout;

    const scheduleNext = () => {
      timeout = setTimeout(() => {
        // Force show one (bypass rate limit for scheduled ones)
        const meme = memes[Math.floor(Math.random() * memes.length)];
        const id = Date.now() + Math.random();
        const x = Math.min(Math.max(50, Math.random() * (window.innerWidth - 250)), window.innerWidth - 250);
        const y = Math.min(Math.max(100, Math.random() * (window.innerHeight - 200)), window.innerHeight - 200);

        setPopups(prev => [...prev, { ...meme, id, x, y }]);
        setTimeout(() => {
          setPopups(prev => prev.filter(p => p.id !== id));
        }, 2000);
        
        scheduleNext();
      }, randomInterval());
    };

    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <MemeContext.Provider value={{ triggerMeme }}>
      {children}
      {/* Meme Popups - max 1 at a time */}
      {popups.slice(0, 1).map((popup) => (
        <div
          key={popup.id}
          className="fixed z-[100] pointer-events-none animate-meme-popup"
          style={{ left: popup.x, top: popup.y }}
        >
          <div className="bg-black/90 text-white px-4 py-3 rounded-2xl border-2 border-primary shadow-brutal flex items-center gap-3">
            <span className="text-3xl animate-bounce">{popup.emoji}</span>
            <span className="font-bold">{popup.text}</span>
          </div>
        </div>
      ))}
    </MemeContext.Provider>
  );
};
