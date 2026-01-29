import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ShareButtons } from './ShareButtons';

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "Agar Monday off ho jaye toh kya karoge?",
    options: ["So jaunga 😴", "Ghumne jaunga 🚗", "Kuch nahi, boring 😑", "Netflix 🍿"]
  },
  {
    question: "Crush ne seen karke ignore kiya, ab?",
    options: ["Dobara message 📱", "Story lagaunga 😤", "Move on 💔", "Unfollow 🚫"]
  },
  {
    question: "Free ka pizza mil raha hai, kitne slice?",
    options: ["2 slice bas 🍕", "4 slice 🍕🍕", "Poora pizza 😋", "Diet pe hoon ❌"]
  },
  {
    question: "3 AM ko neend nahi aa rahi, kya karte ho?",
    options: ["Phone scroll 📱", "Existential crisis 🌌", "Fridge raid 🍪", "Rote hain 😭"]
  },
  {
    question: "Salary aate hi kya karte ho?",
    options: ["Bills pay 💸", "Shopping 🛍️", "Party 🎉", "EMI 😢"]
  }
];

const results = [
  { title: "Certified Overthinker 🧠", description: "Tu sochta bohot hai, karta kam hai. Classic!", emoji: "🤯" },
  { title: "Professional Procrastinator 🦥", description: "Kal karna tha, aaj bhi kal pe chhod diya. Legend!", emoji: "😴" },
  { title: "Emotional Support Friend 💕", description: "Sabko advice deta hai, khud follow nahi karta!", emoji: "🤡" },
  { title: "Unbothered King/Queen 👑", description: "Duniya jale, tu chill kare. Respect!", emoji: "😎" },
  { title: "Delulu Main Character 🎬", description: "Life tera movie hai, baaki sab extras!", emoji: "✨" },
];

interface FunnyQuizProps {
  onBack: () => void;
}

export const FunnyQuiz = ({ onBack }: FunnyQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(results[0]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setResult(randomResult);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"
      >
        <ArrowLeft size={18} />
        Back
      </Button>

      <div className="max-w-lg mx-auto">
        {!showResult ? (
          <div className="bg-card border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-brutal animate-fade-in">
            {/* Progress */}
            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 sm:h-2 rounded-full transition-colors ${
                    i <= currentQuestion ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <div className="text-center mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-8 text-foreground leading-tight">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-2 sm:space-y-4">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-3 sm:p-4 text-left rounded-lg sm:rounded-xl border-2 border-black bg-card hover:bg-primary/20 hover:border-primary transition-all font-medium text-foreground text-sm sm:text-base active:scale-98"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="bg-card border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-brutal">
              <div className="text-5xl sm:text-8xl mb-3 sm:mb-4">{result.emoji}</div>
              
              <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-foreground">
                {result.title}
              </h2>
              
              <p className="text-base sm:text-xl text-muted-foreground mb-4 sm:mb-6">
                {result.description}
              </p>

              <div className="bg-primary/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-foreground">
                  Confidence zyada hai, logic kam 🤡
                </p>
              </div>

              <ShareButtons 
                text={`Mera result: ${result.title}\n${result.description}`}
                title="Quiz Result"
                className="mb-4"
              />

              <Button
                onClick={resetQuiz}
                variant="outline"
                className="w-full border-2 border-black text-sm sm:text-base py-2 sm:py-3"
              >
                Again 🔄
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
