import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, Flame, RefreshCw, Sparkles } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface TruthDareProps {
  onBack: () => void;
}

const truths = [
  "Last baar kab productive feel kiya tha? 🤔",
  "Phone charge 5% ho toh kya pehle karta hai? 📱",
  "Last lie kya bola tha aur kisko? 🤥",
  "Crush ka photo kitni baar dekha aaj? 👀",
  "Gym join karke kitne din gaye? 💪",
  "Last baar kab early uthha tha bina alarm ke? ⏰",
  "Phone mein sabse zyada time kaunsi app pe jaata hai? 📲",
  "Agar free pizza mile toh kitne slices khaoge honestly? 🍕",
  "Last cringe moment yaad hai? Batao 😬",
  "Sabse bekar excuse kya diya hai kaam se bachne ke liye? 🙈",
  "Kitne pending replies hain abhi WhatsApp pe? 💬",
  "Agar kal duniya khatam ho toh aaj kya karoge? 🌍",
  "Bathroom mein phone lekar jaate ho? 🚽",
  "Last baar kab roya/royi secretly? 😢",
  "Dream job kya hai honestly? 💼"
];

const dares = [
  "Apne best friend ko 'kal se gym' likh ke bhej 💪",
  "5 second ke liye phone side mein rakh 📱",
  "Mirror mein dekh ke 'I am the best' bol 🪞",
  "Apni last selfie story pe daal 📸",
  "Kisi ko random 'miss you' message bhej 💕",
  "Ek glass paani pi abhi ke abhi 💧",
  "10 jumping jacks kar le abhi 🏃",
  "Apni crush/partner ko heart emoji bhej ❤️",
  "Phone ka wallpaper change kar 5 min ke liye 🖼️",
  "Kisi family member ko call kar aur 'I love you' bol 📞",
  "Apni photo kheeche with a funny face 🤪",
  "Next 1 ghante tak phone silent pe rakh 🔕",
  "Kisi ko random compliment de 🌟",
  "Apni last WhatsApp status copy karke tweet kar 🐦",
  "Kisi ko voice note mein joke sunao 🎤"
];

const truthReactions = [
  "Answer sun ke website bhi confuse ho gayi 🤡",
  "Honesty level: Suspicious 🧐",
  "Ye toh cap lag raha hai 🧢",
  "Interesting... very interesting 🤔",
  "FBI ko forward kar diya answer 📞",
  "Self-awareness strong hai 💪",
  "Ye toh relatable tha 😂",
  "Website ko bhi guilt feel ho gaya 😬",
  "Truth detected: 47% 📊",
  "Hmm... therapy recommend karti hai website 🛋️"
];

export const TruthDare = ({ onBack }: TruthDareProps) => {
  const [mode, setMode] = useState<'entry' | 'truth' | 'dare'>('entry');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentDare, setCurrentDare] = useState('');
  const [answer, setAnswer] = useState('');
  const [reaction, setReaction] = useState('');
  const [showReaction, setShowReaction] = useState(false);
  const [dareCompleted, setDareCompleted] = useState<boolean | null>(null);
  const { playSound } = useSoundEffects();

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const startTruth = () => {
    playSound('suspense');
    setMode('truth');
    setCurrentQuestion(getRandomItem(truths));
    setAnswer('');
    setShowReaction(false);
    setReaction('');
  };

  const startDare = () => {
    playSound('drumroll');
    setMode('dare');
    setCurrentDare(getRandomItem(dares));
    setDareCompleted(null);
  };

  const submitTruth = () => {
    if (!answer.trim()) return;
    playSound('pop');
    setReaction(getRandomItem(truthReactions));
    setShowReaction(true);
  };

  const nextTruth = () => {
    playSound('boing');
    setCurrentQuestion(getRandomItem(truths));
    setAnswer('');
    setShowReaction(false);
    setReaction('');
  };

  const handleDareResponse = (completed: boolean) => {
    if (completed) {
      playSound('tada');
    } else {
      playSound('fail');
    }
    setDareCompleted(completed);
  };

  const nextDare = () => {
    playSound('drumroll');
    setCurrentDare(getRandomItem(dares));
    setDareCompleted(null);
  };

  return (
    <div className="min-h-screen p-4 animate-fade-in bg-gradient-to-b from-background to-purple-900/20">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-2xl mx-auto">
        {/* Entry Screen */}
        {mode === 'entry' && (
          <div className="text-center animate-scale-in">
            <h2 className="text-4xl font-black mb-4">🎭 Truth & Dare</h2>
            <p className="text-2xl mb-8 text-muted-foreground">
              Sach bolega ya himmat dikhayega? 😈
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={startTruth}
                className="text-2xl py-8 px-12 bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <MessageCircle className="mr-2" size={28} />
                Truth 😏
              </Button>
              <Button
                onClick={startDare}
                className="text-2xl py-8 px-12 bg-orange-500 hover:bg-orange-600 border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Flame className="mr-2" size={28} />
                Dare 🔥
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground italic">
              ⚠️ Sab safe hai, koi exposed nahi hoga... shayad 🤡
            </p>
          </div>
        )}

        {/* Truth Mode */}
        {mode === 'truth' && (
          <div className="bg-card rounded-2xl p-8 border-4 border-black shadow-brutal animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MessageCircle className="text-blue-500" size={32} />
              <h3 className="text-2xl font-bold">Truth Time 😏</h3>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6 mb-6 border-2 border-blue-300">
              <p className="text-xl font-medium text-center">{currentQuestion}</p>
            </div>

            {!showReaction ? (
              <>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Sach likh… jhoot bhi chalega 😌"
                  className="w-full p-4 rounded-xl border-2 border-black bg-background text-foreground mb-4 min-h-[100px] resize-none"
                  maxLength={500}
                />
                <Button
                  onClick={submitTruth}
                  disabled={!answer.trim()}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-xl py-6 border-4 border-black shadow-brutal"
                >
                  <Sparkles className="mr-2" /> Submit Truth
                </Button>
              </>
            ) : (
              <div className="animate-scale-in">
                <div className="bg-primary/20 rounded-xl p-6 mb-6 border-2 border-primary text-center">
                  <p className="text-xl font-bold">{reaction}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={nextTruth}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 border-2 border-black"
                  >
                    <RefreshCw className="mr-2" size={18} /> Next Question 🔄
                  </Button>
                  <Button
                    onClick={startDare}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 border-2 border-black"
                  >
                    <Flame className="mr-2" size={18} /> Ab Dare Dikhao 😈
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dare Mode */}
        {mode === 'dare' && (
          <div className="bg-card rounded-2xl p-8 border-4 border-black shadow-brutal animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flame className="text-orange-500" size={32} />
              <h3 className="text-2xl font-bold">Dare Time 🔥</h3>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-6 mb-6 border-2 border-orange-300">
              <p className="text-xl font-medium text-center">{currentDare}</p>
            </div>

            {dareCompleted === null ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleDareResponse(true)}
                  className="flex-1 text-lg py-6 bg-green-500 hover:bg-green-600 border-4 border-black shadow-brutal"
                >
                  Kar diya 😎
                </Button>
                <Button
                  onClick={() => handleDareResponse(false)}
                  className="flex-1 text-lg py-6 bg-red-500 hover:bg-red-600 border-4 border-black shadow-brutal"
                >
                  Nahi kiya 🤡
                </Button>
              </div>
            ) : (
              <div className="animate-scale-in">
                <div className={`rounded-xl p-6 mb-6 border-2 text-center ${
                  dareCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-300' 
                    : 'bg-red-100 dark:bg-red-900/30 border-red-300'
                }`}>
                  <p className="text-2xl font-bold">
                    {dareCompleted ? "Respect 🫡 (temporary)" : "Expected tha 😏"}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {dareCompleted 
                      ? "Himmat hai tujh mein... ya phone hath mein nahi tha 🤔" 
                      : "Koi nahi, next time pakka... (haan haan 🙄)"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={nextDare}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 border-2 border-black"
                  >
                    <RefreshCw className="mr-2" size={18} /> Next Dare 🔄
                  </Button>
                  <Button
                    onClick={startTruth}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 border-2 border-black"
                  >
                    <MessageCircle className="mr-2" size={18} /> Ab Truth Dikhao 😏
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Back to Entry */}
        {mode !== 'entry' && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setMode('entry')}
              className="border-2 border-black"
            >
              🏠 Shuru se khelo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
