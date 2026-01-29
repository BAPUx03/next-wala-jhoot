import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ShareButtons } from './ShareButtons';

const questions = [
  {
    question: "Coffee ☕ ya Chai 🍵?",
    options: ["Coffee", "Chai", "Dono", "Pani hi sahi"],
  },
  {
    question: "Night Owl 🦉 ya Early Bird 🐦?",
    options: ["Night Owl", "Early Bird", "Sleep Owl (always sleeping)", "Depends on deadline"],
  },
  {
    question: "Instagram 📸 ya Twitter 🐦?",
    options: ["Instagram", "Twitter/X", "LinkedIn (🤡)", "I have a life"],
  },
  {
    question: "Pizza 🍕 ya Biryani 🍗?",
    options: ["Pizza", "Biryani", "Maggi supremacy", "Jo free ho"],
  },
  {
    question: "Monday kaisa lagta hai?",
    options: ["Hate it 😤", "It's okay 😐", "Love Mondays 🤡", "Every day is Monday"],
  },
];

const results = [
  { emoji: "🤡", title: "Confused but Confident", desc: "Pata kuch nahi, lekin attitude full hai. Respect 🫡" },
  { emoji: "🧠", title: "Overthinker Supreme", desc: "Tu woh hai jo 'seen' ke baad 3 din sochta hai kya reply kare 💭" },
  { emoji: "🦥", title: "Professional Procrastinator", desc: "Deadline ke 1 ghante pehle best kaam aata hai tujhse 🏃" },
  { emoji: "😴", title: "Sleep Enthusiast", desc: "Teri superpower: Kahi bhi, kabhi bhi so jana 🛏️" },
  { emoji: "🎭", title: "Main Character Energy", desc: "Tera life actually boring hai, par tu usse exciting banata hai 🌟" },
  { emoji: "🤷", title: "Certified Vella", desc: "Career goal: Survive. Life motto: Dekha jayega 🙃" },
  { emoji: "😈", title: "Chaotic Good", desc: "Kaam galat, niyat sahi. Ya phir dono galat 💀" },
  { emoji: "🥲", title: "Relatable Sad", desc: "Tu happy rehne ka try karta hai, phone battery se zyada 📱" },
];

interface PersonalityTestProps {
  onBack: () => void;
}

export const PersonalityTest = ({ onBack }: PersonalityTestProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(results[0]);
  const { playSound } = useSoundEffects();

  const handleAnswer = (optionIndex: number) => {
    playSound('pop');
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      playSound('drumroll');
      setTimeout(() => {
        setResult(results[Math.floor(Math.random() * results.length)]);
        setShowResult(true);
        playSound('tada');
      }, 1500);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
    playSound('boing');
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <Button variant="ghost" onClick={onBack} className="mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
        <ArrowLeft size={18} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        {!showResult ? (
          <div className="bg-card border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Question {currentQ + 1}/{questions.length}
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mb-3 sm:mb-4">
                <div
                  className="bg-primary h-1.5 sm:h-2 rounded-full transition-all"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-3xl sm:text-5xl">🧪</span>
              <h2 className="text-lg sm:text-2xl font-bold text-foreground mt-3 sm:mt-4">
                {questions[currentQ].question}
              </h2>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {questions[currentQ].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 sm:border-4 border-black font-bold text-sm sm:text-lg transition-all bg-card hover:bg-primary hover:text-primary-foreground active:scale-98"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-card border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-5xl sm:text-8xl mb-3 sm:mb-4 animate-bounce">{result.emoji}</div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">
              Your Personality:
            </h2>
            <h3 className="text-xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
              {result.title}
            </h3>
            <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-black">
              <p className="text-sm sm:text-lg text-foreground">
                {result.desc}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              *Answers were ignored, result was random 🎲
            </p>
            
            <ShareButtons 
              text={`Mera personality type: ${result.emoji} ${result.title}!\n${result.desc}`}
              title="Personality Test Result"
              className="mb-4"
            />
            
            <Button
              onClick={restart}
              variant="outline"
              className="w-full border-2 sm:border-4 border-black font-bold py-3 sm:py-4 text-sm sm:text-base"
            >
              Retry 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
