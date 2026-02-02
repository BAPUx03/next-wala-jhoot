import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "./ShareButtons";

const FORTUNES = [
  // Funny Hinglish fortunes
  "Aaj tere crush ka message aayega... wrong number wala 📱",
  "Salary aane wali hai... lekin bills pehle aa jayenge 💸",
  "Tu bahut successful hoga... apne sapno mein 😴",
  "Tera future bright hai... bijli ka bill bhi 💡",
  "Aaj tera din hai... kal bhi tera hi tha, kuch kiya? 🤔",
  "Love life mein kuch hone wala hai... Netflix subscription renew 💕",
  "Paisa aayega... aur chala bhi jayega 🏃",
  "Tu unique hai... jaise har doosra insaan 😂",
  "Mehnat ka phal milega... diabetes ke saath 🍬",
  "Tera time aa gaya... alarm ka 6 baje ⏰",
  "Success tere kadam choomegi... lekin pehle chai pee le ☕",
  "Aaj kuch unexpected hoga... jaise roz hota hai 🎭",
  "Teri kismat chamkegi... phone screen ki tarah 📱",
  "Tu bohot door jayega... traffic mein stuck 🚗",
  "Life mein twist aayega... Maggi mein 🍜",
  "Tera sapna poora hoga... agar so jaye toh 💤",
  "Aaj koi special milega... delivery boy 📦",
  "Tu diamond hai... abhi polishing chahiye 💎",
  "Tera plan successful hoga... backup plan rakh le 📋",
  "Universe tere saath hai... parking nahi 🅿️",
  "Aaj luck favour karega... Monday ko nahi 📅",
  "Tu star hai... abhi koi dekh nahi raha ⭐",
  "Patience rakh... WiFi connect ho raha hai 📶",
  "Tera wait khatam hone wala hai... queue mein aage badh 🚶",
  "Good things coming... COD mein 📦",
];

const COOKIE_CRACKS = [
  "CRACK! 🥠",
  "SNAP! 💥", 
  "CRUNCH! 🔊",
  "POP! 🎉",
];

const FortuneCookie = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [fortune, setFortune] = useState("");
  const [crackSound, setCrackSound] = useState("");
  const [shakeCookie, setShakeCookie] = useState(false);

  const openCookie = () => {
    if (isOpening || isOpened) return;
    
    // Shake animation
    setShakeCookie(true);
    setTimeout(() => setShakeCookie(false), 500);
    
    setIsOpening(true);
    setCrackSound(COOKIE_CRACKS[Math.floor(Math.random() * COOKIE_CRACKS.length)]);
    
    setTimeout(() => {
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(randomFortune);
      setIsOpened(true);
      setIsOpening(false);
    }, 1000);
  };

  const resetCookie = () => {
    setIsOpened(false);
    setIsOpening(false);
    setFortune("");
    setCrackSound("");
  };

  return (
    <div className="bg-card border-4 border-foreground rounded-2xl p-6 shadow-brutal">
      <h2 className="text-2xl font-bold text-center mb-4">🥠 Fortune Cookie</h2>
      <p className="text-center text-muted-foreground mb-6">
        Click the cookie to reveal your desi fortune!
      </p>

      <div className="flex flex-col items-center">
        {/* Cookie */}
        {!isOpened ? (
          <button
            onClick={openCookie}
            disabled={isOpening}
            className={`
              text-8xl transition-all duration-300 hover:scale-110 cursor-pointer
              ${shakeCookie ? "animate-[shake_0.5s_ease-in-out]" : ""}
              ${isOpening ? "animate-pulse" : ""}
            `}
            style={{
              filter: isOpening ? "brightness(1.2)" : "none",
            }}
          >
            🥠
          </button>
        ) : (
          <div className="flex gap-4 text-6xl animate-in zoom-in-95 duration-300">
            <span className="rotate-[-20deg]">🥠</span>
            <span className="rotate-[20deg] scale-x-[-1]">🥠</span>
          </div>
        )}

        {/* Crack Sound */}
        {isOpening && (
          <p className="text-2xl font-bold mt-4 animate-bounce">{crackSound}</p>
        )}

        {/* Fortune Paper */}
        {isOpened && (
          <div className="mt-6 w-full animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-50 dark:bg-amber-100 border-2 border-amber-300 rounded-lg p-4 shadow-md relative">
              {/* Paper texture effect */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-200 to-transparent rounded-lg" />
              
              <div className="relative">
                <p className="text-center text-amber-900 font-medium text-lg italic">
                  "{fortune}"
                </p>
                
                {/* Lucky numbers */}
                <div className="mt-4 pt-3 border-t border-amber-200">
                  <p className="text-center text-amber-700 text-sm">
                    Lucky Numbers: {" "}
                    <span className="font-bold">
                      {Array.from({length: 6}, () => Math.floor(Math.random() * 49) + 1).join(" - ")}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-4">
              <ShareButtons 
                title="My Fortune Cookie Says:"
                text={fortune}
              />
            </div>

            {/* Try Again Button */}
            <Button
              onClick={resetCookie}
              className="w-full mt-4 shadow-brutal border-2 border-foreground"
              variant="outline"
            >
              🥠 Try Another Cookie
            </Button>
          </div>
        )}

        {/* Instructions */}
        {!isOpened && !isOpening && (
          <p className="mt-4 text-sm text-muted-foreground text-center">
            👆 Cookie pe click kar ke dekh kya likha hai!
          </p>
        )}
      </div>

      {/* Custom keyframes for shake */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-5px) rotate(-5deg); }
          40% { transform: translateX(5px) rotate(5deg); }
          60% { transform: translateX(-5px) rotate(-5deg); }
          80% { transform: translateX(5px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default FortuneCookie;
