import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shuffle } from 'lucide-react';

const jokes = [
  "Paisa kamana hai? Pehle neend puri kar 💤",
  "Gym join kiya? Great! Ab 3 mahine baad firse join karna 🏋️",
  "Tera ex tujhse better kisi ke saath hai... shayad 💔",
  "Monday aa raha hai... prepare yourself mentally 😭",
  "Tu special hai... jaise har maa apne bache ko bolta hai 🤡",
  "Kuch bada karne wala hai... bas motivation chahiye jo kabhi nahi aayega 🚀",
  "Diet kal se start karunga - said every desi ever 🍕",
  "Early morning walk? Alarm toh sunega nahi 😴",
  "Relationship goals dekh ke lagta hai single hi theek hai 💀",
  "Tu smart hai... phone mein, real life mein nahi 📱",
];

const emojiRains = ['🎉', '🤡', '💩', '🔥', '💀', '😂', '🙃', '✨', '👻', '🌈'];

const systemAlerts = [
  "⚠️ WARNING: Too much talent detected!",
  "🚨 ALERT: Bakchodi levels critical!",
  "💥 ERROR 404: Motivation not found",
  "🔴 SYSTEM: IQ test required",
  "⚡ NOTICE: Touch grass immediately",
  "🛑 STOP: You've been scrolling for hours",
];

const soundEmojis = ['🔊', '🎵', '🎶', '📢', '🔔', '🎺'];

interface RandomBakchodiProps {
  onBack: () => void;
}

export const RandomBakchodi = ({ onBack }: RandomBakchodiProps) => {
  const [currentAction, setCurrentAction] = useState<'idle' | 'joke' | 'emoji' | 'alert' | 'sound'>('idle');
  const [content, setContent] = useState('');
  const [emojis, setEmojis] = useState<{ id: number; emoji: string; x: number; delay: number }[]>([]);
  const [lastAction, setLastAction] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const triggerRandom = useCallback(() => {
    const actions = ['joke', 'emoji', 'alert', 'sound'];
    let action;
    do {
      action = actions[Math.floor(Math.random() * actions.length)];
    } while (action === lastAction);
    
    setLastAction(action);
    setClickCount(prev => prev + 1);

    switch (action) {
      case 'joke':
        setCurrentAction('joke');
        setContent(jokes[Math.floor(Math.random() * jokes.length)]);
        break;
      
      case 'emoji':
        setCurrentAction('emoji');
        const emojiList = Array.from({ length: 30 }, (_, i) => ({
          id: Date.now() + i,
          emoji: emojiRains[Math.floor(Math.random() * emojiRains.length)],
          x: Math.random() * 100,
          delay: Math.random() * 2,
        }));
        setEmojis(emojiList);
        setTimeout(() => setEmojis([]), 3000);
        break;
      
      case 'alert':
        setCurrentAction('alert');
        setContent(systemAlerts[Math.floor(Math.random() * systemAlerts.length)]);
        break;
      
      case 'sound':
        setCurrentAction('sound');
        const soundEmoji = soundEmojis[Math.floor(Math.random() * soundEmojis.length)];
        setContent(`${soundEmoji} *Imagine loud annoying sound* ${soundEmoji}`);
        break;
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setCurrentAction('idle');
    }, 3000);
  }, [lastAction]);

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Emoji Rain */}
      {emojis.map((e) => (
        <div
          key={e.id}
          className="fixed text-4xl pointer-events-none animate-float-up"
          style={{
            left: `${e.x}%`,
            top: '100%',
            animationDelay: `${e.delay}s`,
            animationDirection: 'reverse',
          }}
        >
          {e.emoji}
        </div>
      ))}

      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back
      </Button>

      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Random Bakchodi 🎲
        </h2>
        <p className="text-muted-foreground mb-8">
          Kya hoga? Kisiko nahi pata 🤷
        </p>

        {/* Main Button */}
        <button
          onClick={triggerRandom}
          disabled={currentAction !== 'idle'}
          className={`relative w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-8 border-black shadow-brutal text-white font-bold text-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${
            currentAction !== 'idle' ? 'animate-wobble' : ''
          }`}
        >
          <Shuffle size={60} className="mx-auto mb-2" />
          <span>{currentAction === 'idle' ? 'CLICK ME!' : '...'}</span>
          
          {/* Click counter badge */}
          <span className="absolute -top-2 -right-2 bg-black text-primary rounded-full w-12 h-12 flex items-center justify-center text-lg">
            {clickCount}
          </span>
        </button>

        {/* Content Display */}
        <div className="mt-8 min-h-32">
          {currentAction === 'joke' && (
            <div className="bg-card border-4 border-black rounded-2xl p-6 shadow-brutal animate-bounce">
              <span className="text-4xl block mb-2">😂</span>
              <p className="text-xl font-bold text-foreground">{content}</p>
            </div>
          )}

          {currentAction === 'alert' && (
            <div className="bg-red-100 border-4 border-red-500 rounded-2xl p-6 animate-shake">
              <p className="text-xl font-bold text-red-600">{content}</p>
            </div>
          )}

          {currentAction === 'sound' && (
            <div className="bg-purple-100 border-4 border-purple-500 rounded-2xl p-6 animate-pulse">
              <p className="text-xl font-bold text-purple-600">{content}</p>
            </div>
          )}

          {currentAction === 'emoji' && (
            <div className="bg-primary/20 border-4 border-primary rounded-2xl p-6">
              <p className="text-xl font-bold text-foreground">Emoji Rain! ☔</p>
            </div>
          )}
        </div>

        <p className="text-muted-foreground mt-8 text-sm">
          {clickCount > 10 ? "Bohot click kar liya, ab padhai kar 📚" : "Aur click karo... kuch toh hoga 🎰"}
        </p>
      </div>
    </div>
  );
};
