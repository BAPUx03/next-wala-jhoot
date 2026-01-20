import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, Flame, RefreshCw, Sparkles, Loader2 } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TruthDareProps {
  onBack: () => void;
}

// Fallback truths/dares if AI fails
const fallbackTruths = [
  "Last baar kab productive feel kiya tha? 🤔",
  "Phone charge 5% ho toh kya pehle karta hai? 📱",
  "Kitne pending replies hain abhi WhatsApp pe? 💬",
  "Agar free pizza mile toh kitne slices honestly? 🍕",
  "Last cringe moment yaad hai? 😬",
];

const fallbackDares = [
  "Apne best friend ko 'kal se gym' likh ke bhej 💪",
  "5 second ke liye phone side mein rakh 📱",
  "Mirror mein dekh ke 'I am the best' bol 🪞",
  "Kisi ko random 'miss you' message bhej 💕",
  "Ek glass paani pi abhi ke abhi 💧",
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
  const [isLoading, setIsLoading] = useState(false);
  const { playSound } = useSoundEffects();

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const fetchAIContent = async (type: 'truth' | 'dare'): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('truth-dare', {
        body: { type }
      });

      if (error) throw error;
      if (data?.content) return data.content;
      throw new Error('No content');
    } catch (error) {
      console.error('AI fetch error:', error);
      // Fallback to static content
      return type === 'truth' 
        ? getRandomItem(fallbackTruths) 
        : getRandomItem(fallbackDares);
    }
  };

  const startTruth = async () => {
    playSound('suspense');
    setMode('truth');
    setAnswer('');
    setShowReaction(false);
    setReaction('');
    setIsLoading(true);
    
    const question = await fetchAIContent('truth');
    setCurrentQuestion(question);
    setIsLoading(false);
  };

  const startDare = async () => {
    playSound('drumroll');
    setMode('dare');
    setDareCompleted(null);
    setIsLoading(true);
    
    const dare = await fetchAIContent('dare');
    setCurrentDare(dare);
    setIsLoading(false);
  };

  const submitTruth = () => {
    if (!answer.trim()) return;
    playSound('pop');
    setReaction(getRandomItem(truthReactions));
    setShowReaction(true);
  };

  const nextTruth = async () => {
    playSound('boing');
    setAnswer('');
    setShowReaction(false);
    setReaction('');
    setIsLoading(true);
    
    const question = await fetchAIContent('truth');
    setCurrentQuestion(question);
    setIsLoading(false);
  };

  const handleDareResponse = (completed: boolean) => {
    if (completed) {
      playSound('tada');
    } else {
      playSound('fail');
    }
    setDareCompleted(completed);
  };

  const nextDare = async () => {
    playSound('drumroll');
    setDareCompleted(null);
    setIsLoading(true);
    
    const dare = await fetchAIContent('dare');
    setCurrentDare(dare);
    setIsLoading(false);
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
            <h2 className="text-3xl sm:text-4xl font-black mb-4">🎭 Truth & Dare</h2>
            <p className="text-xl sm:text-2xl mb-8 text-muted-foreground">
              Sach bolega ya himmat dikhayega? 😈
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={startTruth}
                className="text-xl sm:text-2xl py-6 sm:py-8 px-8 sm:px-12 bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <MessageCircle className="mr-2" size={24} />
                Truth 😏
              </Button>
              <Button
                onClick={startDare}
                className="text-xl sm:text-2xl py-6 sm:py-8 px-8 sm:px-12 bg-orange-500 hover:bg-orange-600 border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Flame className="mr-2" size={24} />
                Dare 🔥
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground italic">
              ⚠️ AI-powered! Har baar naya question/dare milega 🤖✨
            </p>
          </div>
        )}

        {/* Truth Mode */}
        {mode === 'truth' && (
          <div className="bg-card rounded-2xl p-6 sm:p-8 border-4 border-black shadow-brutal animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MessageCircle className="text-blue-500" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold">Truth Time 😏</h3>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-muted-foreground">AI soch raha hai... 🤔</p>
              </div>
            ) : (
              <>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4 sm:p-6 mb-6 border-2 border-blue-300">
                  <p className="text-lg sm:text-xl font-medium text-center">{currentQuestion}</p>
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
                      className="w-full bg-blue-500 hover:bg-blue-600 text-lg sm:text-xl py-5 sm:py-6 border-4 border-black shadow-brutal"
                    >
                      <Sparkles className="mr-2" /> Submit Truth
                    </Button>
                  </>
                ) : (
                  <div className="animate-scale-in">
                    <div className="bg-primary/20 rounded-xl p-6 mb-6 border-2 border-primary text-center">
                      <p className="text-lg sm:text-xl font-bold">{reaction}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={nextTruth}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 border-2 border-black"
                      >
                        <RefreshCw className="mr-2" size={18} /> Naya Question 🔄
                      </Button>
                      <Button
                        onClick={startDare}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 border-2 border-black"
                      >
                        <Flame className="mr-2" size={18} /> Ab Dare 😈
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Dare Mode */}
        {mode === 'dare' && (
          <div className="bg-card rounded-2xl p-6 sm:p-8 border-4 border-black shadow-brutal animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flame className="text-orange-500" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold">Dare Time 🔥</h3>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <p className="text-muted-foreground">AI dare soch raha hai... 😈</p>
              </div>
            ) : (
              <>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-4 sm:p-6 mb-6 border-2 border-orange-300">
                  <p className="text-lg sm:text-xl font-medium text-center">{currentDare}</p>
                </div>

                {dareCompleted === null ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => handleDareResponse(true)}
                      className="flex-1 text-base sm:text-lg py-5 sm:py-6 bg-green-500 hover:bg-green-600 border-4 border-black shadow-brutal"
                    >
                      Kar diya 😎
                    </Button>
                    <Button
                      onClick={() => handleDareResponse(false)}
                      className="flex-1 text-base sm:text-lg py-5 sm:py-6 bg-red-500 hover:bg-red-600 border-4 border-black shadow-brutal"
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
                      <p className="text-xl sm:text-2xl font-bold">
                        {dareCompleted ? "Respect 🫡 (temporary)" : "Expected tha 😏"}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base">
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
                        <RefreshCw className="mr-2" size={18} /> Naya Dare 🔄
                      </Button>
                      <Button
                        onClick={startTruth}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 border-2 border-black"
                      >
                        <MessageCircle className="mr-2" size={18} /> Ab Truth 😏
                      </Button>
                    </div>
                  </div>
                )}
              </>
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
