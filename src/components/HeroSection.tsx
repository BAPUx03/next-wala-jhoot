import { useState, useEffect } from 'react';
import logo from '@/assets/nextwala-logo.png';

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

export const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(headlines[0]);
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <section className="relative py-16 px-4">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src={logo} 
          alt="NextWala" 
          className="w-48 md:w-64 hover:scale-105 transition-transform cursor-pointer"
        />
      </div>

      {/* Main Headline */}
      <div className="text-center mb-8">
        <h1 
          className={`text-3xl md:text-5xl font-bold text-foreground transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {currentHeadline}
        </h1>
      </div>

      {/* Auto Bakchodi Label */}
      <div className="flex justify-center mb-6">
        <div className="bg-primary/20 border-2 border-primary rounded-full px-6 py-2 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-bold text-foreground">Auto bakchodi ON</span>
        </div>
      </div>

      {/* Rotating Joke */}
      <div className="text-center">
        <p className="text-lg md:text-xl text-muted-foreground italic">
          "{currentJoke}"
        </p>
      </div>
    </section>
  );
};
