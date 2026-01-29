import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ShareButtons } from './ShareButtons';

const highRatingRoasts = [
  "Self-confidence strong hai, facts thode kam 🤡",
  "Confidence level: Sharma ji ka beta 😏",
  "Itna acha toh koi nahi hota bhai 😂",
  "Mirror bhi itna jhooth nahi bolta 🪞",
  "Humble bhi reh liya kar kabhi 🙏",
  "NASA wale bhi itna confident nahi hote 🚀",
  "Tera aatmvishwas dekh ke mujhe bhi himmat mili 💪",
];

const lowRatingRoasts = [
  "Itna honest bhi nahi hona tha 😭",
  "Arre yaar, thoda toh confidence rakh 🥺",
  "Sach bolne ke liye thanks, par rula diya tune 😢",
  "Impostor syndrome real hai bhai 🫂",
  "Thoda khud pe bharosa rakh yaar 💪",
  "Apne aap ko underestimate mat kar 🌟",
];

const midRatingRoasts = [
  "Average enjoyer spotted 😌",
  "Safe zone mein rehne wala hai tu 🛡️",
  "Na too hot, na too cold - lukewarm personality 🌡️",
  "Diplomatic answer diya tune 🤝",
  "Risk lena seekh beta 🎲",
];

interface RateYourselfProps {
  onBack: () => void;
}

export const RateYourself = ({ onBack }: RateYourselfProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const { playSound } = useSoundEffects();

  const handleRate = (value: number) => {
    playSound('pop');
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    
    playSound('drumroll');
    setTimeout(() => {
      let roasts: string[];
      if (rating >= 4) {
        roasts = highRatingRoasts;
        playSound('fail');
      } else if (rating <= 2) {
        roasts = lowRatingRoasts;
        playSound('sad');
      } else {
        roasts = midRatingRoasts;
        playSound('hehe');
      }
      setResult(roasts[Math.floor(Math.random() * roasts.length)]);
      setShowResult(true);
    }, 1000);
  };

  const resetQuiz = () => {
    setRating(0);
    setShowResult(false);
    setResult('');
    playSound('pop');
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <Button variant="ghost" onClick={onBack} className="mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
        <ArrowLeft size={18} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        {!showResult ? (
          <div className="bg-card border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-4 sm:mb-8">
              <span className="text-4xl sm:text-6xl">🪞</span>
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mt-3 sm:mt-4">
                Apne aap ko rate karo ⭐
              </h2>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
                (Honest rehna, website judge karegi 😈)
              </p>
            </div>

            <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125 active:scale-95 p-1"
                >
                  <Star
                    size={36}
                    className={`sm:w-12 sm:h-12 ${
                      star <= (hoverRating || rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                {rating}/5 ⭐
              </p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 sm:py-6 text-base sm:text-xl border-2 sm:border-4 border-black shadow-brutal"
            >
              Dekho Kya Bolta Hai 🔮
            </Button>
          </div>
        ) : (
          <div className="bg-card border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-5xl sm:text-7xl mb-3 sm:mb-4 animate-bounce">
              {rating >= 4 ? '🤡' : rating <= 2 ? '🥺' : '😐'}
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Tumne diya: {rating}/5 ⭐
            </h2>
            <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-black">
              <p className="text-base sm:text-xl font-bold text-foreground">
                {result}
              </p>
            </div>
            
            <ShareButtons 
              text={`Maine apne aap ko ${rating}/5 diya!\nWebsite ne kaha: ${result}`}
              title="Rate Yourself Result"
              className="mb-4"
            />
            
            <Button
              onClick={resetQuiz}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 sm:py-4 border-2 sm:border-4 border-black shadow-brutal text-sm sm:text-base"
            >
              Phir Se Try Karo 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
