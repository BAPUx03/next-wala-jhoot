import { useState, useEffect } from 'react';
import logo from '@/assets/nextwala-logo.png';
import { Sparkles, Zap, Trophy } from 'lucide-react';

const headlines = [
  "Next mil gaya? Achha joke tha 😂",
  "Kal se pakka serious 🤡",
  "Yeh website kaam nahi karti, masti karti hai 😈",
  "Tere paas time hai, hum bhi free hai 🤷",
  "Ab yahan aaya hai toh kuch toh karega 👀",
  "Life mein logic mat dhundh 😏",
  "Padhai karni thi, idhar aa gaya 📚❌",
  "Bored hai? Sahi jagah aaya 🎯",
  "Ye website nahi, therapy hai 🧘",
  "Free wifi ke baad sabse bada gift 🎁",
];

const jokes = [
  "Monday ko off kab milega? 😭",
  "Life mein stability chahiye... WiFi ki 📶",
  "Gym join karna hai... kal se 💪",
  "Alarm band kiya, sapne continue 😴",
  "Paisa double nahi hua toh kya hua, tension double ho gaya 📈",
  "Netflix dekh ke khud ko productive feel karta hoon 🍿",
  "Reply nahi aaya, phone off ho gaya hoga 📱",
  "5 minute mein ready ho jaunga... 2 ghante baad 🕐",
];

const funFacts = [
  "🎯 18+ features hai yahan",
  "🔥 Sabse zyada time waste here",
  "😈 Roasting guaranteed",
  "🎁 Sab free hai bhai",
];

export const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(headlines[0]);
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * headlines.length);
        } while (newIndex === headlineIndex);
        setHeadlineIndex(newIndex);
        setCurrentHeadline(headlines[newIndex]);
        setIsAnimating(false);
      }, 300);
    }, 10000);

    return () => clearInterval(headlineInterval);
  }, [headlineIndex]);

  useEffect(() => {
    const jokeInterval = setInterval(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * jokes.length);
      } while (newIndex === jokeIndex);
      setJokeIndex(newIndex);
      setCurrentJoke(jokes[newIndex]);
    }, 10000);

    return () => clearInterval(jokeInterval);
  }, [jokeIndex]);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(factInterval);
  }, []);

  return (
    <section className="relative py-8 sm:py-12 md:py-16 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6 sm:mb-8 relative">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-pink-500/30 to-purple-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={logo} 
            alt="NextWala" 
            className="w-32 sm:w-40 md:w-48 lg:w-56 hover:scale-110 transition-all duration-300 cursor-pointer relative z-10 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center mb-6 sm:mb-8 px-2">
        <h1 
          className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-foreground transition-all duration-300 leading-tight ${
            isAnimating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {currentHeadline}
        </h1>
      </div>

      {/* Stats & Auto Bakchodi */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
        {/* Fun Fact Rotator */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2">
          <Trophy size={16} className="text-purple-400" />
          <span className="text-xs sm:text-sm font-medium text-purple-300">
            {funFacts[factIndex]}
          </span>
        </div>

        {/* Auto Bakchodi Label */}
        <div className="bg-primary/20 border-2 border-primary rounded-full px-4 sm:px-6 py-2 flex items-center gap-2">
          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-foreground">Auto bakchodi ON</span>
          <Zap size={14} className="text-primary animate-pulse" />
        </div>
      </div>

      {/* Rotating Joke */}
      <div className="text-center px-4">
        <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-2xl px-4 sm:px-6 py-3 max-w-lg mx-auto">
          <Sparkles size={16} className="text-primary shrink-0" />
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground italic">
            "{currentJoke}"
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-8 sm:mt-12 animate-bounce">
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-xs">Scroll karo 👇</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
