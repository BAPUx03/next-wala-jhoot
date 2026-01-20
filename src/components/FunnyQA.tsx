import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const qaPairs = [
  { q: "Life ka purpose kya hai?", a: "Weekend ka wait 🛋️" },
  { q: "Success ka secret?", a: "Strong WiFi 📶" },
  { q: "Love kaise milta hai?", a: "Milta nahi, random lag jaata hai 🎲" },
  { q: "Paisa kaise bachaye?", a: "Ghar se bahar mat niklo 🏠" },
  { q: "Motivation kahan se aaye?", a: "Due date se 1 ghanta pehle ⏰" },
  { q: "Best investment kya hai?", a: "Good sleep 😴" },
  { q: "Happiness kahan milegi?", a: "Food delivery ke notification mein 🍕" },
  { q: "Confidence kaise aaye?", a: "Fake it till you forget you're faking 😎" },
  { q: "Future kya hoga?", a: "Pehle present toh sambhal le bhai 🤷" },
  { q: "Friends kaise banaye?", a: "WiFi password share karo 📱" },
  { q: "Job kaise mile?", a: "Lagta hai, lekin kab - nobody knows 🔮" },
  { q: "Crush ko impress kaise kare?", a: "Pehle khud ko impress kar le 🪞" },
  { q: "Monday ko kaise survive kare?", a: "Survive? Bhai, endure karo 💀" },
  { q: "Life mein kya chahiye?", a: "Unlimited data aur no responsibilities 📵" },
  { q: "Tension free kaise rahe?", a: "Expectations zero rakh, phir bhi disappoint hoga 🙃" },
  { q: "Sahi decision kaise le?", a: "Google kar, fir opposite kar 🔄" },
  { q: "Morning routine kya ho?", a: "5 alarm snooze, phir panic 😱" },
  { q: "Relationship advice?", a: "Apna toh single scene hai, dusro ko advice de 💔" },
  { q: "Health tips?", a: "Salad order kar, burger kha 🍔" },
  { q: "Productivity kaise badhe?", a: "Kal se start karunga 📅" },
];

interface FunnyQAProps {
  onBack: () => void;
}

export const FunnyQA = ({ onBack }: FunnyQAProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuestion = () => {
    setIsAnimating(true);
    setShowAnswer(false);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * qaPairs.length);
      } while (newIndex === currentIndex && qaPairs.length > 1);
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300);
  };

  const currentQA = qaPairs[currentIndex];

  return (
    <div className="min-h-screen bg-background p-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back
      </Button>

      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Deep Questions 🤔
          </h2>
          <p className="text-muted-foreground">
            Serious sawaal, desi jawab
          </p>
        </div>

        <div 
          className={`bg-card border-4 border-black rounded-2xl p-8 shadow-brutal transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Question */}
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">❓</span>
            <h3 className="text-2xl font-bold text-foreground">
              {currentQA.q}
            </h3>
          </div>

          {/* Answer */}
          {showAnswer ? (
            <div className="bg-primary/20 rounded-xl p-6 mb-6 animate-fade-in">
              <span className="text-3xl mb-2 block text-center">💡</span>
              <p className="text-xl text-center font-bold text-foreground">
                {currentQA.a}
              </p>
            </div>
          ) : (
            <Button
              onClick={() => setShowAnswer(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 text-lg border-4 border-black shadow-brutal mb-6"
            >
              Jawab Dikhao 👀
            </Button>
          )}

          {/* Next Button */}
          <Button
            onClick={nextQuestion}
            variant="outline"
            className="w-full border-2 border-black py-4"
          >
            <RefreshCw className="mr-2" size={20} />
            Next Question 🔄
          </Button>
        </div>

        {/* Question counter */}
        <p className="text-center text-muted-foreground mt-4">
          Aur bhi hai... scroll karte raho 📜
        </p>
      </div>
    </div>
  );
};
