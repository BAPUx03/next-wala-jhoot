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
  { emoji: "🥲", text: "Pain" },
  { emoji: "🤯", text: "Mind = Blown" },
  { emoji: "💅", text: "Slay" },
  { emoji: "🧠", text: "Big brain time" },
  { emoji: "☠️", text: "RIP bozo" },
  { emoji: "😤", text: "Triggered" },
  { emoji: "🦧", text: "Monke" },
  { emoji: "🗿", text: "Bruh moment" },
  { emoji: "✨", text: "Main character energy" },
  { emoji: "🫠", text: "Melt ho gaya" }
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

  const triggerMeme = useCallback(() => {
    const meme = memes[Math.floor(Math.random() * memes.length)];
    const id = Date.now() + Math.random();
    
    // Random position on screen
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 150);

    setPopups(prev => [...prev, { ...meme, id, x, y }]);

    // Remove after animation
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== id));
    }, 2000);
  }, []);

  // Random meme every 30-60 seconds
  useEffect(() => {
    const randomInterval = () => Math.random() * 30000 + 30000;
    let timeout: NodeJS.Timeout;

    const scheduleNext = () => {
      timeout = setTimeout(() => {
        triggerMeme();
        scheduleNext();
      }, randomInterval());
    };

    scheduleNext();
    return () => clearTimeout(timeout);
  }, [triggerMeme]);

  return (
    <MemeContext.Provider value={{ triggerMeme }}>
      {children}
      {/* Meme Popups */}
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="fixed z-[100] pointer-events-none animate-meme-popup"
          style={{ left: popup.x, top: popup.y }}
        >
          <div className="bg-black/90 text-white px-4 py-3 rounded-2xl border-2 border-primary shadow-brutal flex items-center gap-3">
            <span className="text-4xl animate-bounce">{popup.emoji}</span>
            <span className="font-bold text-lg">{popup.text}</span>
          </div>
        </div>
      ))}
    </MemeContext.Provider>
  );
};
