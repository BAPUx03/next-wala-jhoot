import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

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
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        {!showResult ? (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-8">
              <span className="text-6xl">🪞</span>
              <h2 className="text-3xl font-bold text-foreground mt-4">
                Apne aap ko rate karo ⭐
              </h2>
              <p className="text-muted-foreground mt-2">
                (Honest rehna, website judge karegi 😈)
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    size={48}
                    className={`${
                      star <= (hoverRating || rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-center text-2xl font-bold mb-6">
                {rating}/5 ⭐
              </p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
            >
              Dekho Kya Bolta Hai 🔮
            </Button>
          </div>
        ) : (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-7xl mb-4 animate-bounce">
              {rating >= 4 ? '🤡' : rating <= 2 ? '🥺' : '😐'}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Tumne diya: {rating}/5 ⭐
            </h2>
            <div className="bg-primary/20 rounded-2xl p-6 mb-6 border-2 border-black">
              <p className="text-xl font-bold text-foreground">
                {result}
              </p>
            </div>
            <Button
              onClick={resetQuiz}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 border-4 border-black shadow-brutal"
            >
              Phir Se Try Karo 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
